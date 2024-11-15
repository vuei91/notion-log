import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  async create(index: string, id: string, document: any) {
    return this.elasticsearchService.index({
      index,
      id,
      document,
    });
  }

  async read(index: string, id: string) {
    return this.elasticsearchService.get({
      index,
      id,
    });
  }

  async update(index: string, id: string, document: any) {
    return this.elasticsearchService.update({
      index,
      id,
      doc: document,
    });
  }

  async delete(index: string, id: string) {
    return this.elasticsearchService.delete({
      index,
      id,
    });
  }

  async search(index: string, query: any) {
    return this.elasticsearchService.search({
      index,
      body: query,
    });
  }
}
