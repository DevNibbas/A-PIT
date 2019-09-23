import { Pipe, PipeTransform } from '@angular/core';
import { EnvService } from 'src/app/services/api/env.service';

@Pipe({
  name: 'envparse'
})
export class EnvparsePipe implements PipeTransform {

  constructor(private env: EnvService) {

  }

  async transform(value: any, ...args: any[]) {

    if (!value) {
      return value;
    }
    const y: any[] = value.match(/\{[a-zA-Z]+[a-zA-Z0-9]*\}/g);

    if (!y) {
      return value;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let e = 0; e < y.length; e++) {
      const key = y[e].replace(/[\{|\}]/g, '');
      const val = await this.env.parseEnv(key);
      value = value.replace(y[e], val);
    }
    return value;

  }

}
