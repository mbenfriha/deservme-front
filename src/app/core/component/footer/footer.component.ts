import { Component, OnInit } from '@angular/core';
import { faFacebookF, faTwitter} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    faFacebookF = faFacebookF;
    faTwitter = faTwitter;

  constructor() {

  }

  ngOnInit() {
  }


}
