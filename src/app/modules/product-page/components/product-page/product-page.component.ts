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
import {MatDialog} from '@angular/material/dialog';
import {UploadImgGalleryComponent} from '../../../../dialog/upload-img-gallery/upload-img-gallery.component';
import {CategoriesComponent} from '../../../../dialog/categories/categories.component';
import {UploadImgThumbnailComponent} from '../../../../dialog/upload-img-thumbnail/upload-img-thumbnail.component';

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
  public loading = true;

  constructor(private productService: ProductsService,
              private colorService: ColorsService,
              public dialog: MatDialog,
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
    });
  }

  async ngOnInit() {
    this.colors = await this.colorService.getColors();
    this.sizes = await this.sizeService.getSizes();
    this.categories = await this.categoryService.getCategories();
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.product = await this.productService.getProductById(this.activatedRoute.snapshot.paramMap.get('id'));
      this.productForm.setValue({
        name: this.product.name,
        title: this.product.title,
        price: this.product.price,
        description: this.product.description,
        sizeAndFashion: this.product.sizeAndFashion,
        color: this.product.color.id,
        size: this.product.size.id,
      });
    } else {
      this.product = {
        amount: 0,
        assets: [],
        category: [],
        color: undefined,
        description: '',
        name: '',
        price: 0,
        size: undefined,
        sizeAndFashion: '',
        sold: false,
        thumbnail: '',
        title: '',
        vat: 0
      };
    }
    this.loading = false;
    console.log(this.product);
  }
  async onSubmit() {
    this.loading = true;
    console.log('here');
    const values = this.productForm.getRawValue();
    this.product.price = parseFloat(values.price);
    this.product.name = values.name;
    this.product.title = values.title;
    this.product.color = values.color;
    this.product.description = values.description;
    this.product.size = this.sizes.find(x => x.id === values.size);
    this.product.sizeAndFashion = values.sizeAndFashion;
    this.product.color = this.colors.find(x => x.id === values.color);
    if (this.product.id) {
      this.productService.updateProduct(this.product);
    } else {

      this.product = await this.productService.addProduct(this.product);
      this.loading = false;


      // console.log('going to add product');
    }

  }
  changeThumbnail() {
    const dialogRef = this.dialog.open(UploadImgThumbnailComponent, {
      width: '250px',
      data: this.product.id
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.loading = true;
      this.product = await this.productService.getProductById(this.product.id);
      this.loading = false;
    });
  }
  async removeImg(img) {
    this.loading = true;
    await this.productService.removeFile(img, this.product.id);
    this.loading = false;

  }
  addGalleryImg() {
    const dialogRef = this.dialog.open(UploadImgGalleryComponent, {
      width: '250px',
      data: this.product.id
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.product = await this.productService.getProductById(this.product.id);
      console.log('The dialog was closed', result, '<--');
    });
  }
  addCategory() {
    const dialogRef = this.dialog.open(CategoriesComponent, {
      width: '250px',
      data: this.categories
    });

    dialogRef.afterClosed().subscribe(result => {
      this.product.category.push(result);
      console.log('The dialog was closed ', result);
    });
  }
}
