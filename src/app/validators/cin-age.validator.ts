import { AbstractControl, ValidationErrors } from "@angular/forms";

export const ageCinValidator = (form: AbstractControl): null | ValidationErrors => {
  const cin = +form.get('cin')?.value.substring(0,2);
  const age = +form.get('age')?.value;

  if (!cin || ! age) return null;

  if ((age >= 60 && cin >= 20) || (age <60 && cin < 20)) return { cinAge : "Le cin et l'age ne correspondent pas"};
  return null;
}
