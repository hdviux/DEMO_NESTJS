import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.scheme';
import mongoose from 'mongoose';
import { CreateBookDTO } from './dto/create-book.dto';
import { Author } from 'src/author/schemas/author.schema';
import { AuthorData } from 'src/author/author.interface';
@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: mongoose.Model<Book>,
    @InjectModel(Author.name)
    private readonly authorModel: mongoose.Model<Author>,
  ) {}
  async findAll(query: AuthorData): Promise<Book[]> {
    console.log(query);
    const books = await this.bookModel.find().populate('author');
    return books;
  }
  async find(id: string): Promise<Book> {
    const rs = await this.bookModel.findById(id);
    return rs;
  }
  async create(book: CreateBookDTO): Promise<Book> {
    const rs = await this.bookModel.create(book);
    await this.authorModel.findByIdAndUpdate(rs.author, {
      $push: { books: rs._id },
    });
    return rs;
  }
  async update(id: string, book: Book): Promise<Book> {
    const rs = await this.bookModel.findByIdAndUpdate(id, book);
    return rs;
  }
  async delete(id: string): Promise<Book> {
    const rs = await this.bookModel.findByIdAndDelete(id);
    return rs;
  }
}
