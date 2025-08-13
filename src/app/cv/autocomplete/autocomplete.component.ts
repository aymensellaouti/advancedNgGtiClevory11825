import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, AbstractControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged, Observable, switchMap, tap } from "rxjs";
import { CvService } from "../services/cv.service";
import { Cv } from "../model/cv";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);
  cvs$!: Observable<Cv[]>;
  form = this.formBuilder.group({ search: [''] });
  get search(): AbstractControl {
    return this.form.get('search')!;
  }
  ngOnInit(): void {
    this.cvs$ = this.search.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((name) => this.cvService.selectByName(name))
    );
  }
}
