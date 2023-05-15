import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './schemas/author.schema';
import mongoose from 'mongoose';
import { CreateAuthorDTO } from './dto/create-author.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { LogInAuthorDTO } from './dto/login-author.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { AuthorData } from './author.interface';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name)
    private authorModel: mongoose.Model<Author>,
  ) {}
  async create(author: CreateAuthorDTO): Promise<Author> {
    const rs = await this.authorModel.create(author);
    return rs;
  }
  async findAll(): Promise<Author[]> {
    const rs = await this.authorModel.find().populate('books');
    return rs;
  }
  async findById(_id: string): Promise<Author> {
    const rs = await this.authorModel.findById(_id).populate('books');
    return rs;
  }
  async login(author: LogInAuthorDTO): Promise<AuthorData> {
    const _author = await this.authorModel.findOne({
      username: author.username,
    });
    if (!_author)
      throw new HttpException(
        this.throwError(404, 'Author not found', 'Fail', 'username'),
        404,
      );
    const validPassword = bcrypt.compareSync(author.password, _author.password);
    if (validPassword === false)
      throw new HttpException(
        this.throwError(401, 'Password Error', 'Fail', 'password'),
        401,
      );
    const token = this.generateJWT(_author);
    const authorAfter: any = {};
    authorAfter['token'] = token;
    authorAfter['author'] = _author;
    return authorAfter;
  }
  public generateJWT(author: any) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        _id: author._id,
        username: author.username,
      },
      process.env.TOKEN_SECRET,
    );
  }
  public throwError(
    statusCode: number,
    message: string,
    kind: string,
    type: string,
  ) {
    const errors_password = {
      statusCode,
      errors: {},
    };
    errors_password.errors[type] = {
      message,
      kind,
    };
    return errors_password;
  }
}
