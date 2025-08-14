import { Component, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  takeWhile,
  scan,
} from 'rxjs';
import { Product } from './dto/product.dto';
import { ProductService } from './services/product.service';
import { Settings } from './dto/product-settings.dto';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
    imports: [NgIf, NgFor, AsyncPipe]
})
export class ProductsComponent {
  setting: Settings = { limit: 12, skip: 0 };
  settings$ = new BehaviorSubject<Settings>(this.setting);
  getMoreButtonDisabled = false;
  productService = inject(ProductService);
  /* Todo : Faire le nécessaire pour créer le flux des produits à afficher */
  /* Tips : vous pouvez voir les différents imports non utilisés et vous en inspirer */
  products$: Observable<Product[]> = this.settings$.pipe(
    // {12, 0}, {12, 12}, {12, 24} .....
    concatMap((settings) => this.productService.getProducts(settings)),
    // APiResponse1, ApiResponse2, ....
    map((apiReponse) => apiReponse.products),
    // products1, products2, ...
    takeWhile((products) => {
      if (products.length <= 0) {
        this.getMoreButtonDisabled = true;
        return false;
      } else {
        return true;
      }
    }),
    scan((oldProducts, newProduts) => [...oldProducts, ...newProduts])
    // [nlem les produits lokol]
  );
  more() {
    this.setting = {
      ...this.setting,
      skip: this.setting.skip + this.setting.limit,
    };
    this.settings$.next(this.setting);
  }
}
