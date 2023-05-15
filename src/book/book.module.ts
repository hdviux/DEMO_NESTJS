import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schemas/book.scheme';
import { AuthorSchema } from 'src/author/schemas/author.schema';
import { AuthorMiddleware } from 'src/author/author.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Book', schema: BookSchema },
      { name: 'Author', schema: AuthorSchema },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
