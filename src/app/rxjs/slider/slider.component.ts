import { HttpClient } from "@angular/common/http";
import { Component, inject, Input } from "@angular/core";
import { Observable, combineLatest, map, startWith, timer } from "rxjs";
import { API } from "src/config/api.config";

export interface ImageApi {
  _id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  @Input() timer = 1500;
  @Input() imagePaths = [
    'as.jpg',
    'cv.png',
    'rotating_card_profile.png',
    'rotating_card_profile2.png',
    'rotating_card_profile3.png',
  ];
  http = inject(HttpClient);
  imagesApi$ = this.http.get<ImageApi[]>(API.images2);
  /* Todo : Créer le flux permettant de générer les images à afficher dans le slider */
  paths$: Observable<string> = combineLatest([
    this.imagesApi$,
    timer(0, this.timer),
  ]).pipe(
    map(([images, index]) => images[index % images.length].url)
  );

  // = timer(0, this.timer).pipe(
  //   // 0 1 2 3 4 5
  //   map(index => this.imagePaths[index % this.imagePaths.length]),
  //   startWith(this.imagePaths[0]),
  //   // path0 path1 .....
  // );
}
