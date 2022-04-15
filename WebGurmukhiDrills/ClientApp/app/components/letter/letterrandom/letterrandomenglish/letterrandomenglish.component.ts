import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RandomQuestion } from '../../../../services/randomletter/randomletter.model';
import { RandomletterService } from '../../../../services/randomletter/randomletter.service'; 
import { ToastrService, MessageType } from '../../../../services/toastr/toastr.service';

@Component({
    selector: 'app-letterrandomenglish',
    templateUrl: './letterrandomenglish.component.html',
    styleUrls: ['./letterrandomenglish.component.css']
})

export class LetterrandomenglishComponent {
    @Input() randomQuestion: RandomQuestion;
    @Output() resetquestions = new EventEmitter();
    private givenanwserlocal: string;
    private lastAnwser: string;
    private wrongIndex: number[];

    constructor(private randomletterService: RandomletterService, private toastrService: ToastrService) {
        this.givenanwserlocal = '';
        this.lastAnwser = '';
        this.randomQuestion = new RandomQuestion();
        this.randomQuestion.givenAnwser = "";
        this.randomQuestion.feedback = [];
    }

    onTextChange($event: string) {
        if (this.lastAnwser !== $event) {
            this.lastAnwser = this.randomQuestion.givenAnwser;
            this.randomQuestion.givenAnwser = $event;
            this.wrongIndex = this.randomletterService.compareString(this.randomQuestion.givenAnwser, this.randomQuestion.translation.english);
        }
        if (this.randomQuestion.givenAnwser == this.randomQuestion.translation.english) {
            this.randomQuestion.anwsered = true;
            this.randomQuestion.feedback.unshift("Matched " + this.randomQuestion.givenAnwser);
            this.toastrService.postMessage(MessageType.Success, "Matched " + this.randomQuestion.givenAnwser);
        }
        if (this.wrongIndex && this.wrongIndex.length > 0) {
            this.randomQuestion.feedback.unshift(this.randomQuestion.givenAnwser + " incorrect at index " + this.wrongIndex.join(","));
        }
    }

    onClickResetQuestion() {
        this.resetquestions.emit();
    };
}