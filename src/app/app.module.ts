import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CookieService} from 'ngx-cookie-service';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {from, Observable} from 'rxjs';
import {ToastrModule} from 'ngx-toastr';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ProductsComponent } from './components/products/products.component';
import {SharedModule} from './modules/shared/shared.module';
import { ProductComponent } from './components/products/product/product.component';
import { HeaderComponent } from './components/header/header.component';
import { UploadImgGalleryComponent } from './dialog/upload-img-gallery/upload-img-gallery.component';
import {MatButtonModule} from '@angular/material/button';
import { CategoriesComponent } from './dialog/categories/categories.component';
import { UploadImgThumbnailComponent } from './dialog/upload-img-thumbnail/upload-img-thumbnail.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import {MatInputModule} from '@angular/material/input';

export class CustomTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return from(import(`../assets/i18n/${lang}.json`));
  }
}
@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    SideNavComponent,
    ProductsComponent,
    ProductComponent,
    HeaderComponent,
    SearchBarComponent,

  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(), // ToastrModule added
    AppRoutingModule,
    MatButtonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    SharedModule,
    MatInputModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
