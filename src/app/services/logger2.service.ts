import { inject, Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { AbstractLoggerService } from '../injection tokens/abstract-logger.service';

@Injectable()
export class Logger2Service extends AbstractLoggerService {
  utilsService =  inject(UtilsService);
  logger(something: any) {
    console.log('From Logger 2 Service :');
    this.utilsService.hello('GTI');
    console.log(something);
  }
}
