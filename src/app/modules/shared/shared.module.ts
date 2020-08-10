import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {LoaderComponent} from '../shared-components/loader/loader.component';



@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
  ],
  exports: [
    LoaderComponent,
    TranslateModule,
  ]
})
export class SharedModule { }
