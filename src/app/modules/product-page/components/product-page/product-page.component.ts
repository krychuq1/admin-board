import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../../../services/products.service';
import {IProduct} from '../../../../interfaces/IProduct';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IColor} from '../../../../interfaces/IColor';
import {ColorsService} from '../../../../services/colors.service';
import {ISize} from '../../../../interfaces/ISize';
import {SizeService} from '../../../../services/sizes.service';
import {ICategory} from '../../../../interfaces/ICategory';
import {CategoriesService} from '../../../../services/categories.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  public product: IProduct;
  public colors: IColor[];
  public sizes: ISize[];
  public categories: ICategory[];
  public productForm: FormGroup;
  afuConfig = {
    uploadAPI: {
      url:"https://example-file-upload-api"
    }
  };
  constructor(private productService: ProductsService,
              private colorService: ColorsService,
              private sizeService: SizeService,
              private categoryService: CategoriesService,
              private activatedRoute: ActivatedRoute) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      sizeAndFashion: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required])
    });
  }

  async ngOnInit() {
    this.product = await this.productService.getProductById(this.activatedRoute.snapshot.paramMap.get('id'));
    this.colors = await this.colorService.getColors();
    this.sizes = await this.sizeService.getSizes();
    this.categories = await this.categoryService.getCategories();
    this.productForm.setValue({
      name: this.product.name,
      title: this.product.title,
      price: this.product.price,
      description: this.product.description,
      sizeAndFashion: this.product.sizeAndFashion,
      color: this.product.color.id,
      size: this.product.size.id,
      category: this.product.category[0].id
    });
    console.log(this.product);
  }
  onSubmit() {
    const values = this.productForm.getRawValue();
    this.product.price = parseFloat(values.price);
    this.product.name = values.name;
    this.product.title = values.title;
    this.product.color = values.color;
    this.product.description = values.description;
    this.product.size = values.size;
    this.product.sizeAndFashion = values.sizeAndFashion;
    this.product.color = values.color;
    this.productService.updateProduct(this.product);
  }

}
