import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDTO } from './dto/create-author.dto';
import { Author } from './schemas/author.schema';
import { LogInAuthorDTO } from './dto/login-author.dto';
import { AuthorData } from './author.interface';

@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}
  @Post('create')
  create(@Body() author: CreateAuthorDTO): Promise<Author> {
    return this.authorService.create(author);
  }
  @Get('authors')
  findAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @Post('login')
  login(@Body() author: LogInAuthorDTO): Promise<AuthorData> {
    return this.authorService.login(author);
  }
}
