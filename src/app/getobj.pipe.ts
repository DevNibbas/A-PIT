import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getobj'
})
export class GetobjPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    const obj = {};
    value.forEach(e => {
      obj[e.key] = e.value;
    });
    return obj;
  }

}
