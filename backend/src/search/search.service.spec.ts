import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchService],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('should create', async () => {
    const result = await service.create('test', '1', {
      title: 'test',
    });
    // console.log(result);
    // expect(result).toBeDefined();
  });

  // it('should search', async () => {
  //   const result = await service.search('test', {
  //     query: {
  //       match: {
  //         title: 'test',
  //       },
  //     },
  //   });
  //   console.log(result);
  //   expect(result).toBeDefined();
  // });

  // it('should read', async () => {
  //   const result = await service.read('test', '1');
  //   expect(result).toBeDefined();
  // });

  // it('should update', async () => {
  //   const result = await service.update('test', '1', {
  //     title: 'test',
  //   });
  //   expect(result).toBeDefined();
  // });

  // it('should delete', async () => {
  //   const result = await service.delete('test', '1');
  //   expect(result).toBeDefined();
  // });
});
