import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IProduct} from '../../interfaces/IProduct';
import {ICategory} from '../../interfaces/ICategory';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, AfterViewInit{
  searchtext = '';
  isFocus = false;
  products: IProduct[];
  categories: ICategory[];
  @ViewChild('search') search: ElementRef;

  constructor(private searchService: SearchService) { }

  ngAfterViewInit(): void {
    fromEvent(this.search.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(200),
      distinctUntilChanged()).subscribe(async (text: string) => {
      this.searchtext = text;
      if (text.length) {
        await this.searchFun(text);
      } else {
        this.products = [];
        this.categories = [];
      }
    });
  }
  async searchFun(text: string) {
    this.products =  await this.searchService.searchForProduct(text, '5');
    this.categories = await this.searchService.searchForCategory(text);
  }

  ngOnInit(): void {
  }
  boldString(str) {
    const strRegExp = new RegExp(this.searchtext, 'gi');
    return  str.replace(strRegExp, '<b>' + this.searchtext + '</b>');
  }
  onBlur() {
    this.searchtext = '';
    this.search.nativeElement.value = '';
    this.isFocus = false;
    this.products = [];
    this.categories = [];
  }
  clear() {
    if (this.searchtext.length) {
      this.searchtext = '';
      this.search.nativeElement.value = '';
      this.products = [];
      this.categories = [];
    } else {
      this.isFocus = false;
    }
  }
}
