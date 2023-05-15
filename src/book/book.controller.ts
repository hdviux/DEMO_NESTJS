import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.scheme';
import { CreateBookDTO } from './dto/create-book.dto';
import { AuthorDecorator } from 'src/author/author.decorator';
import { AuthorData } from 'src/author/author.interface';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('books')
  findAll(@AuthorDecorator('id') author: AuthorData): Promise<Book[]> {
    return this.bookService.findAll(author);
  }
  @Get('find')
  find(@Param() id: string): Promise<Book> {
    return this.bookService.find(id);
  }
  @Post('create')
  create(@Body() book: CreateBookDTO): Promise<Book> {
    return this.bookService.create(book);
  }
  @Put('update')
  update(@Param() id: string, @Body() book: CreateBookDTO): Promise<Book> {
    return this.bookService.update(id, book);
  }
}
