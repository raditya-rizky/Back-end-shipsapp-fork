import { Test, TestingModule } from '@nestjs/testing';
import { ongkir } from './fuzzy.service';

describe('FuzzyService', () => {
  let service: ongkir;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ongkir],
    }).compile();

    service = module.get<ongkir>(ongkir);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
