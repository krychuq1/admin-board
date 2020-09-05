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
import {LoremIpsum} from 'lorem-ipsum';
import {ToastrService} from 'ngx-toastr';

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
              private toastr: ToastrService,
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
  resetSizeAndFashion() {
    this.productForm.patchValue(
      {      sizeAndFashion: '<p dir="ltd"><span>Szerokość</span><span>:&nbsp;</span></p>' +
          '<p dir="ltd"><span>Długość od kołnierza</span><span>:&nbsp;</span></p>' +
          '<p dir="ltd"><span>Krój</span><span>:&nbsp;</span></p>'});
  }
  resetDescription() {
    this.productForm.patchValue(
      {      description: '<p dir="ltd"><span>Stan</span><span>:&nbsp;</span></p>' +
          '<p dir="ltd"><span>Wzór</span><span>:&nbsp;</span></p>' +
          '<p dir="ltd"><span>Materiał</span><span>:&nbsp;</span></p>' +
          '<p dir="ltd"><span>Opis</span><span>:&nbsp;</span></p>'});
  }
  async ngOnInit() {
    this.colors = await this.colorService.getColors();
    this.sizes = await this.sizeService.getSizes();
    this.categories = await this.categoryService.getCategories();
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.product = await this.productService.getProductById(this.activatedRoute.snapshot.paramMap.get('id'));
    } else {
      const lorem = new LoremIpsum({
        wordsPerSentence: {
          max: 9,
          min: 4,
        },
      });
      this.product = {
        amount: 0,
        assets: [],
        category: [],
        color: this.colors.find(x => x.id === 1),
        description: '<p dir="ltd"><span>Stan</span><span>:&nbsp;</span></p>' +
          '<p dir="ltd"><span>Materiał</span><span>:&nbsp;</span></p>' +
          '<p dir="ltd"><span>Opis</span><span>:&nbsp;</span></p>',
        name: lorem.generateWords(2),
        price: this._randomPrice(60, 300),
        size: this.sizes.find(x => x.id === 1),

        sizeAndFashion: '<p dir="ltd"><span>Szerokość</span><span>:&nbsp;</span></p>' +
          '<p dir="ltd"><span>Długość</span><span>:&nbsp;</span></p>' +
          '<p dir="ltd"><span>Krój</span><span>:&nbsp;</span></p>',
        sold: false,
        thumbnail: '',
        title: lorem.generateWords(4),
        vat: 0
      };
    }
    this.productForm.setValue({
      name: this.product.name ? this.product.name : '',
      title: this.product.title ? this.product.title : '',
      price: this.product.price ? this.product.price : '',
      description: this.product.description ? this.product.description : '',
      sizeAndFashion: this.product.sizeAndFashion ? this.product.sizeAndFashion : '',
      color: this.product.color ? this.product.color.id : '',
      size: this.product.size ? this.product.size.id : '',
    });
    this.loading = false;
    console.log(this.product);
  }
  _randomPrice(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  async onSubmit() {
    this.loading = true;
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
      try{
        await this.productService.updateProduct(this.product);
        this.toastr.success('Product updated');
        this.loading = false;
      } catch (e) {
        this.toastr.success('Coś nie pykło mordo -1');
        this.loading = false;
      }
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
    this.product = await this.productService.getProductById(this.product.id);
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
  addVideo() {
    const dialogRef = this.dialog.open(UploadImgGalleryComponent, {
      width: '250px',
      data: {
        productId: this.product.id,
        isVideo: true
      }
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
