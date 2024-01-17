import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable, map } from 'rxjs';

export class TransformInterceptor<T, R> implements NestInterceptor<T, R> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<R> {
    return next.handle().pipe(
      map((data) => {
        const http = context.switchToHttp();
        const req = http.getRequest<Request>();
        if (Array.isArray(data)) {
          return {
            page: Number(req.query['page'] || 1),
            size: Number(req.query['size'] || 20),
            items: data,
          };
        } else {
          return data;
        }
      }),
    );
  }
}
