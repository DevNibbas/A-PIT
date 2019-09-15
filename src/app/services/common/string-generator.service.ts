import { Injectable } from '@angular/core';
import * as RandExp from 'randexp';

@Injectable({
  providedIn: 'root'
})
export class StringGeneratorService {

  constructor() { }

  createString(regex: string): string {
    return new RandExp(new RegExp(regex)).gen();
  }

}
