import { Injectable } from '@nestjs/common';
import { CreateNotionDto } from './dto/create-notion.dto';
import { UpdateNotionDto } from './dto/update-notion.dto';

@Injectable()
export class NotionService {
  create(createNotionDto: CreateNotionDto) {
    return 'This action adds a new notion';
  }

  findAll() {
    return `This action returns all notion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notion`;
  }

  update(id: number, updateNotionDto: UpdateNotionDto) {
    return `This action updates a #${id} notion`;
  }

  remove(id: number) {
    return `This action removes a #${id} notion`;
  }
}
