import { InjectionToken } from "@angular/core";
import { provide7aja } from "../factories/custom.factory";

export const myCustomToken = new InjectionToken<string>('My_Injection_Token')

export const myCustomProvider = {
  provide: myCustomToken,
  useFactory: provide7aja,
};
