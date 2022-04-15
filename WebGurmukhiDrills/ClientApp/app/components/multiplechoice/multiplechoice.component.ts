import { Component, Input } from '@angular/core';
import { Questions, Question } from "../../services/multiplechoice/question.model";

@Component({
    selector: 'app-multiplechoice',
    templateUrl: './multiplechoice.component.html',
    styleUrls: ['./multiplechoice.component.css']
})

export class MultiplechoiceComponent {
    @Input() questions: Questions = new Questions();
    @Input() audiopath: string = '';
    @Input() imagepath: string = '';
    @Input() selectedQuestion: Question = new Question();

    onSetQuestion(question: Question) {
        this.selectedQuestion = question;
    }

    onClickNextQuestion() {
        let lastQ = this.selectedQuestion.index;
        if (this.questions && this.questions.listQuestion) {
            if (lastQ >= (this.questions.listQuestion.length - 1)) {
                lastQ = -1;
            }
            this.selectedQuestion = this.questions.listQuestion[lastQ + 1];
        }
    }
}