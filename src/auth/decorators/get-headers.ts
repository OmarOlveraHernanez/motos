import { createParamDecorator, ExecutionContext } from '@nestjs/common';




export const HttpHeaders = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const headers = request.headers;
    const fechaActual = new Date();
    fechaActual.setHours(fechaActual.getHours() + 8);
    const log = {
      xFordwarderFor:headers['x-forwarded-for'],
      aceptLanguage: headers['accept-language'],
      userAgent: headers['user-agent'],
      timeVigency: fechaActual
    };
    return log;
  },
);