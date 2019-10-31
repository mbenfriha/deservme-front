import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-quizz',
  templateUrl: './new-quizz.component.html',
  styleUrls: ['./new-quizz.component.scss']
})
export class NewQuizzComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
  }

  checkQuizzCreate(quizz) {
    if (quizz) {
      this.toastr.success('Quizz créée avec succès');

    } else {
      this.toastr.error('Une erreur est survenue');
    }
  }
}
