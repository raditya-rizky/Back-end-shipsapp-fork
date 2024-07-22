import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ongkir {
  private biayaPerKg: number = 4500;

  // Menghitung volume
  private calculateVolume(length: number, width: number, height: number, quantity: number): number {
    return length * width * height * quantity;
  }

  // Menghitung berat volumetrik
  private calculateVolumetricWeight(volume: number): number {
    return volume / 4000;
  }

  // Pembulatan ke atas
  private roundUp(value: number): number {
    return Math.ceil(value);
  }

  // Menghitung biaya pengiriman
  private calculateShippingCost(weight: number): number {
    return weight * this.biayaPerKg;
  }

  // Memformat biaya pengiriman dalam format rupiah
  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  }

  // Fungsi utama untuk menghitung biaya pengiriman
  getShippingCost(length: number, width: number, height: number, quantity: number): string {
    const volume = this.calculateVolume(length, width, height, quantity);
    const volumetricWeight = this.calculateVolumetricWeight(volume);
    const roundedWeight = this.roundUp(volumetricWeight);
    const shippingCost = this.calculateShippingCost(roundedWeight);
    return this.formatCurrency(shippingCost);
  }
}

@Injectable()
export class DeliveryService {
  private companies: any[];
  private readonly weight = 0.4; 

  constructor() {
    this.companies = [];
  }

  async fetchCompanies(): Promise<void> {
    try {
      const response = await axios.get('http://localhost:1337/api/vendors?populate=deep');
      this.companies = response.data.data;

    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  }

  selectDeliveryCompany(criteria: any): any {
    // Filter perusahaan berdasarkan kriteria
    const filteredCompanies = this.companies.map(company => {
      const matchingShipments = company.list_pengiriman.filter(shipment =>
        shipment.lokasi_awal.provinsi.trim() === criteria.lokasi_awal.trim() &&
        shipment.lokasi_akhir.provinsi.trim() === criteria.lokasi_akhir.trim()
      );
      if (matchingShipments.length > 0) {
        return {
          ...company,
          list_pengiriman: matchingShipments
        };
      }
      return null;
    }).filter(company => company !== null);

    if (filteredCompanies.length === 0) {
      return null;
    }

    const scoredCompanies = filteredCompanies.map(company => {
      const minTarifPerKg = Math.min(...company.list_pengiriman.map(shipment => shipment.tarif_per_kg));
      const estimasi_tercepat = company.list_pengiriman.map(shipment => shipment.estimasi_waktu.estimasi_tercepat);
      const waktu =company.list_pengiriman.map(shipment => shipment.estimasi_waktu.satuan_waktu)
      let time;
      if (waktu == 'jam') {
        time =  [estimasi_tercepat]
      }
      else if (waktu == 'hari') {
        time =  [estimasi_tercepat * 24]
      }
      else if (waktu == 'bulan') {
        time =  [estimasi_tercepat * 30 * 24]
      }
      else if (waktu == 'tahun') {
        time =  [estimasi_tercepat * 365 * 24]
      }

      const totalHoursArray = time;
      const minTotalHours = Math.min(...totalHoursArray); 
      const score = this.calculateScore(minTotalHours, minTarifPerKg);
      const maxscore = Math.max(...score)

      return {
        company: company,
        minTarifPerKg: minTarifPerKg,
        totalHours: minTotalHours,
        score: score,
        maxscore:maxscore,
      };
    });
    
    scoredCompanies.sort((a, b) => {
      if (b.maxscore > a.maxscore) return 1;
      if (b.maxscore < a.maxscore) return -1;
    
      if (a.totalHours < b.totalHours) return -1;
      if (a.totalHours > b.totalHours) return 1;
    
      if (a.minTarifPerKg < b.minTarifPerKg) return -1;
      if (a.minTarifPerKg > b.minTarifPerKg) return 1;
    
      return 0;
    });
    return scoredCompanies.map(scoredCompany => scoredCompany);
  }

  private lowCostMembership(cost: number): number {
    if (cost <= 2) return 1; // Cost <= Rp 2,000
    if (cost <= 5) return (5 - cost) / 3; // Cost between Rp 2,000 and Rp 5,000
    return 0; // Cost > Rp 5,000
}

private mediumCostMembership(cost: number): number {
    if (cost <= 5 || cost >= 15) return 0; // Cost < Rp 5,000 or Cost > Rp 15,000
    if (cost <= 6) return (cost - 5) / 1; // Cost between Rp 5,000 and Rp 6,000
    if (cost <= 15) return 1; // Cost between Rp 6,000 and Rp 15,000
    return (15 - cost) / 1; // Cost between Rp 15,000 and Rp 16,000 (adjust as needed)
}

private highCostMembership(cost: number): number {
    if (cost <= 15) return 0; // Cost <= Rp 15,000
    if (cost <= 16) return (cost - 15) / 1; // Cost between Rp 15,000 and Rp 16,000 (adjust as needed)
    return 1; // Cost > Rp 16,000
}

  // Fuzzy membership functions for time
  private shortTimeMembership(hours: number): number {
    if (hours <= 1) return 0; // Waktu < 1 jam
    if (hours <= 24) return 1; // Waktu antara 1 hingga 24 jam
    return 0; // Waktu > 24 jam
}

private mediumTimeMembership(hours: number): number {
    if (hours <= 24 || hours > 8760) return 0; // Waktu < 25 jam atau > 8760 jam
    if (hours <= 25) return (hours - 24) / 1; // Waktu antara 24 hingga 25 jam
    return (8760 - hours) / (8760 - 25); // Waktu antara 25 hingga 8760 jam
}

private longTimeMembership(hours: number): number {
    if (hours <= 8760) return 0; // Waktu <= 8760 jam
    return 1; // Waktu > 8760 jam
}
  private calculateFuzzyScore(hours: number, cost: number): number {
    const costScore = (0.6 * (this.lowCostMembership(cost) * 1 +
                              this.mediumCostMembership(cost) * 0.5 +
                              this.highCostMembership(cost) * 0)) +
                      (0.4 * (this.shortTimeMembership(hours) * 1 +
                              this.mediumTimeMembership(hours) * 0.5 +
                              this.longTimeMembership(hours) * 0));
    return costScore;
  }
  private calculateScore(totalHours: number , cost: number): number[] {
    if (Array.isArray(totalHours)) {
      return totalHours.map(hours => this.calculateFuzzyScore(hours, cost));
    } else {
      return [this.calculateFuzzyScore(totalHours, cost)];
    }
    
  }

  // Calculate volume based on dimensions and quantity
  private calculateVolume(length: number, width: number, height: number, quantity: number): number {
    return length * width * height * quantity;
  }

  // Calculate volumetric weight based on volume
  private calculateVolumetricWeight(volume: number): number {
    return volume / 4000; // Assuming divisor for volumetric weight calculation
  }

  // Round up a number
  private roundUp(value: number): number {
    return Math.ceil(value);
  }

  // Format currency in Indonesian Rupiah (IDR)
  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  }


  // Get shipping cost formatted as currency
  getShippingCost(length: number, width: number, height: number, quantity: number, criteria: any): any {
    try {
      const volume = this.calculateVolume(length, width, height, quantity);
      const volumetricWeight = this.calculateVolumetricWeight(volume);
      const roundedWeight = this.roundUp(volumetricWeight);
      const selectedCompany = this.selectDeliveryCompany(criteria)[0].company.list_pengiriman;
      if (selectedCompany) {
        const tarifPerKg = selectedCompany[0].tarif_per_kg;
        const shippingCost = roundedWeight * tarifPerKg;
        return this.formatCurrency(shippingCost); // Return the numeric value directly
      } else {
        throw new Error('Company not found or criteria not met.');
      }
    } catch (error) {
      console.error('Error getting shipping cost:', error);
      throw new Error('Error calculating shipping cost.');
    }
  }

}
