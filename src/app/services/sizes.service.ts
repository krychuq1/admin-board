import { Injectable } from '@angular/core';
import { ISize } from '../interfaces/ISize';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  public url = environment.baUrl + 'size';

  constructor(private http: HttpClient) {}
  async getSizes() {
    return await this.http.get(this.url).toPromise() as ISize[];
  }
}
