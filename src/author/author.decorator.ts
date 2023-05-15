import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthorDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.author;
  },
);
