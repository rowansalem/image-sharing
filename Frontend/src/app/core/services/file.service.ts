import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Image } from '../models/images/image';
import { Observable } from 'rxjs';
import { PaginationResult } from '../models/general/paginationResult';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  uploadFile(formData: FormData) {
    return this.http.post(environment.baseUrl+'/upload', formData);
  }
  getPaginatedFiles(page: number, limit: number): Observable<PaginationResult<Image[]>> {
    const params = { page: page.toString(), limit: limit.toString() };
    return this.http.get<PaginationResult<Image[]>>(environment.baseUrl+'/files', { params });
  }
}
