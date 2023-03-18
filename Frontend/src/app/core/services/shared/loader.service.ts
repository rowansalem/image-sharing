import { EventEmitter, Injectable } from '@angular/core';
import { LoaderModel } from '../../models/general/loader-model';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderModel: LoaderModel;
  loading = new BehaviorSubject<boolean>(true);
  subject = new Subject<string>();
  constructor() {
    this.loaderModel = new LoaderModel();
  }
  showLoader() {
    this.loaderModel.enable = true;
    this.loading.next(true);
  }
  showBtnLoader() {
    this.loaderModel.buttonLoader = true;
  }
  hideLoader() {
    this.loaderModel.enable = false;
    this.loaderModel.buttonLoader = false;
    this.loading.next(false);
  }
  event() {
    return this.subject.asObservable();
  }
  pushEvent(event: any) {
    return this.subject.next(event);
  }

}
