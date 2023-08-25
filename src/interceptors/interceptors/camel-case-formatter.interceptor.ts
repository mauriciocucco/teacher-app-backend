import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { isArray } from 'class-validator';
import { Observable, map } from 'rxjs';

@Injectable()
export class CamelCaseFormatterInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        if (isArray(response)) {
          return this.returnCamelCaseArray(response);
        }

        return this.snakeToCamel(response);
      }),
    );
  }

  private snakeToCamel(updatedEntity) {
    const camelCaseObj = {};

    for (const key in updatedEntity) {
      const newKey = key.replace(/_([a-z])/g, function (m, w) {
        return w.toUpperCase();
      });
      camelCaseObj[newKey] = updatedEntity[key];
    }
    return camelCaseObj;
  }

  private returnCamelCaseArray(responseArray: any[]) {
    const camelCaseArray = [];

    for (const element of responseArray) {
      camelCaseArray.push(this.snakeToCamel(element));
    }

    return camelCaseArray;
  }
}
