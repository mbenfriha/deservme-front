import { Component, OnInit } from '@angular/core';
import {MetafrenzyService} from 'ngx-metafrenzy';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(private readonly metafrenzyService: MetafrenzyService) {

      this.metafrenzyService.setAllTitleTags('MyQuizzy - Conditions Générales Utilisations');
      this.metafrenzyService.setAllDescriptionTags('Les conditions de MyQuizzy');

  }

  ngOnInit() {
  }

}
