import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import {MetafrenzyService} from 'ngx-metafrenzy';

@Component({
  selector: 'app-new-quizz',
  templateUrl: './new-quizz.component.html',
  styleUrls: ['./new-quizz.component.scss']
})
export class NewQuizzComponent implements OnInit {

  constructor(private toastr: ToastrService,
              private router: Router,
              private readonly metafrenzyService: MetafrenzyService) {
      this.metafrenzyService.setTitle('MyQuizzy - Créer un quizz');
  }

  ngOnInit() {
  }

  checkQuizzCreate(quizz) {
    if (quizz) {
      this.toastr.success('Quizz créée avec succès');
      this.router.navigate(['/quizz/' + quizz._id]);


    } else {
      this.toastr.error('Une erreur est survenue');
    }
  }
}
