import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from 'src/book/schemas/book.scheme';
import * as bcrypt from 'bcryptjs';

@Schema({ timestamps: true })
export class Author {
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop({
    default: [],
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  })
  books: Book[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);

AuthorSchema.pre('save', async function (next: any) {
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
