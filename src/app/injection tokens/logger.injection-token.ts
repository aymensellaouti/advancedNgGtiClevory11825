import { InjectionToken } from "@angular/core";
import { AbstractLoggerService } from "./abstract-logger.service";

export const LoggersInjectionToken = new InjectionToken<AbstractLoggerService[]>('LoggersInjectionToken');
