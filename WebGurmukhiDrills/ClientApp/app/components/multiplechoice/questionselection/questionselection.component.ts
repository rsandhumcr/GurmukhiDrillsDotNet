import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Questions, Question } from "../../../services/multiplechoice/question.model";

@Component({
    selector: 'app-questionselection',
    templateUrl: './questionselection.component.html',
    styleUrls: ['./questionselection.component.css']
})

export class QuestionselectionComponent {
    @Input() questions: Questions = new Questions();
    @Output() setquestion = new EventEmitter<Question>();

    onSetQuestion(question: Question, index: number) {
        this.setquestion.emit(question);
    }

    setBtnClass(question: Question) {
        let btnclass = "";
        if (question && question.anwsered) {
            if (question.correct) {
                btnclass = " btn-success";
            } else {
                btnclass = "btn-danger";
            }
        } else {
            btnclass = "btn-primary";
        }
        return btnclass;
    }
}