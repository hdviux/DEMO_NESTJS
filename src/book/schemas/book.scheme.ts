import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Book {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
  author: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  category: Category;
}

export enum Category {
  ADVENTURE = 'Adventure',
  CALSSICS = 'Classics',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
}

export const BookSchema = SchemaFactory.createForClass(Book);
