import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class LoaderService {

  private _load: BehaviorSubject<boolean> = new BehaviorSubject(null);
  constructor() { }

  public get load() {
    return this._load;
  }
}
