import mongoose from 'mongoose';
import { Category } from '../schemas/book.scheme';

export class CreateBookDTO {
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly author: mongoose.Schema.Types.ObjectId;
  readonly category: Category;
}
