import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './components/product-page/product-page.component';
import {routing} from './products-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SharedModule} from '../shared/shared.module';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {EditorModule} from '@tinymce/tinymce-angular';
import {MatSelectModule} from '@angular/material/select';
import {AngularFileUploaderModule} from 'angular-file-uploader';



@NgModule({
  declarations: [ProductPageComponent],
  imports: [
    CommonModule,
    AngularFileUploaderModule,
    EditorModule,
    routing,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule

  ]
})
export class ProductPageModule { }
