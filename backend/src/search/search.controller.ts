import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('elasticsearch')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post(':index/:id')
  async create(
    @Param('index') index: string,
    @Param('id') id: string,
    @Body() document: any,
  ) {
    return this.searchService.create(index, id, document);
  }

  @Get(':index/:id')
  async read(@Param('index') index: string, @Param('id') id: string) {
    return this.searchService.read(index, id);
  }

  @Patch(':index/:id')
  async update(
    @Param('index') index: string,
    @Param('id') id: string,
    @Body() document: any,
  ) {
    return this.searchService.update(index, id, document);
  }

  @Delete(':index/:id')
  async delete(@Param('index') index: string, @Param('id') id: string) {
    return this.searchService.delete(index, id);
  }

  @Post('search/:index')
  async search(@Param('index') index: string, @Body() query: any) {
    return this.searchService.search(index, query);
  }
}
