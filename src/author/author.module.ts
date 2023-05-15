import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from './schemas/author.schema';
import { AuthorMiddleware } from './author.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
  ],
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: [AuthorService],
})
export class AuthorModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorMiddleware).forRoutes({
      path: 'author/authors',
      method: RequestMethod.GET,
    });
  }
}
