import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const { query } = ctx.getRequest();

    return next.handle().pipe(
      map(([data, total]) => {
        const items = data.map((data) => ({ ...data }));
        const limit = query.limit ? Number(query.limit) : 6;
        const page = query.page ? Number(query.page) : 1;

        return {
          data: items,
          meta: {
            total,
            page,
            lastPage: Math.ceil(total / limit),
          },
        };
      }),
    );
  }
}
