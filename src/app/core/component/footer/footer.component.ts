import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private readonly translate: TranslateService) {
      this.translate.setDefaultLang('en');
      this.translate.use(this.translate.getBrowserLang());
  }

  ngOnInit() {
  }

  changeLanguage(lang) {
      this.translate.use(lang);
  }

}
