import { Component, inject } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { CvService } from "../services/cv.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { APP_ROUTES } from "src/config/routes.config";
import { Cv } from "../model/cv";
import { filter } from "rxjs";
import { CONSTANTES } from "src/config/const.config";
import { uniqueCinValidator } from "src/app/validators/unique-cin.validator";

@Component({
  selector: "app-add-cv",
  templateUrl: "./add-cv.component.html",
  styleUrls: ["./add-cv.component.css"],
})
export class AddCvComponent {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);
  router = inject(Router);
  toastr = inject(ToastrService);
  form = this.formBuilder.group(
    {
      name: ["", Validators.required],
      firstname: ["", Validators.required],
      path: [""],
      job: ["", Validators.required],
      cin: [
        "",
        {
          // validators: [Validators.required, Validators.pattern("[0-9]{8}")],
          asyncValidators: [uniqueCinValidator(this.cvService)],
          updateOn: 'blur'
        },
      ],
      age: [
        0,
        {
          validators: [Validators.required],
          updateOn: 'blur'
        },
      ],
    },
    {
      validators: [],
      asyncValidators: [],
    }
  );
  ngOnInit(): void {
    const savedForm = localStorage.getItem(CONSTANTES.savedForm);
    if (savedForm) {
      this.form.patchValue(JSON.parse(savedForm));
    }
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.age.valueChanges.subscribe({
      next: age => {
        if (age < 18) {
          this.path?.disable({onlySelf: true});
        } else {
          this.path?.enable({ onlySelf: true });
        }
      }
    });
    this.form.statusChanges.pipe(
      filter(() => this.form.valid)
    ).subscribe({
      next: () => {
        const savedForm = JSON.stringify(this.form.getRawValue());
        localStorage.setItem(CONSTANTES.savedForm, savedForm);
      }
    })
  }

  addCv() {
    this.cvService.addCv(this.form.getRawValue() as Cv).subscribe({
      next: () => {
        this.toastr.success(`Le cv a été ajouté avec succès`);
        this.router.navigate([APP_ROUTES.cv]);
        this.form.reset();
        localStorage.removeItem(CONSTANTES.savedForm);
      },
      error: (erreur) => {
        console.log(erreur);
        this.toastr.error(
          `Problème avec le serveur veuillez contacter l'admin`
        );
      },
    });
  }

  get name(): AbstractControl {
    return this.form.get("name")!;
  }
  get firstname() {
    return this.form.get("firstname");
  }
  get age(): AbstractControl {
    return this.form.get("age")!;
  }
  get job() {
    return this.form.get("job");
  }
  get path() {
    return this.form.get("path");
  }
  get cin(): AbstractControl {
    return this.form.get("cin")!;
  }
}
