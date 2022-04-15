import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AnswerData, Question } from "../../../services/multiplechoice/question.model";
import { ToastrService, MessageType } from '../../../services/toastr/toastr.service';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
})

export class QuestionComponent {
    @Input() questionindex : number =0;
    @Input() question: Question = new Question();
    @Input() audiopath: string = '';
    @Input() imagepath: string = '';
    @Output() nextQuestion = new EventEmitter();
    constructor(private toastrService: ToastrService) {

    }

    onAnwserClick(answerData: AnswerData) {
        answerData.isSelected = true;
        this.question.anwsered = true;
        this.question.correct = (this.question.correctAnwser === answerData.optionLabel);
        if (this.question.correct) {
            this.toastrService.postMessage(MessageType.Success, "Correct answer " + this.question.correctAnwser);
        } else {
            this.toastrService.postMessage(MessageType.Warning, "Wrong, the answer was " + this.question.correctAnwser);
        }
    }

    setBtnClass(answerData: AnswerData) {
        let classbtn = "";
        if (this.question.anwsered) {
            if (answerData.correctOption) {
                classbtn = "btn-success";
            } else {
                classbtn = "btn-danger";
            }
        } else {
            classbtn = "btn-info";
        }
        return classbtn;
    }

    onClickNextQuestion() {
        this.nextQuestion.emit();
    }
}