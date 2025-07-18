import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  create(createCommentDto: CreateCommentDto) {
    return 'This action adds a new comment';
  }

async findAll(): Promise<Comment[]> {
  return [
    { id: 1, content: 'Nice post!' } as unknown as Comment,
  ];
}


  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
