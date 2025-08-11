import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  hello(name: string) {
    console.log(`hello ${name}`);
  }
}
