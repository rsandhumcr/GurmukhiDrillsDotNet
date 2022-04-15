import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RandomQuestion } from '../../../../services/randomletter/randomletter.model';
import { RandomletterService } from '../../../../services/randomletter/randomletter.service';
import { ToastrService, MessageType } from '../../../../services/toastr/toastr.service';

@Component({
    selector: 'app-letterrandompunjabi',
    templateUrl: './letterrandompunjabi.component.html',
    styleUrls: ['./letterrandompunjabi.component.css']
})

export class LetterrandompunjabiComponent {
    @Input() randomQuestion: RandomQuestion;
    @Output() resetquestions = new EventEmitter();
    private givenanwser: string;
    private lastAnwser: string = '';
    private wrongIndex: number[];

    constructor(private randomletterService: RandomletterService, private toastrService: ToastrService) {
    }

    onTextChange($event: any) {
        if (this.lastAnwser !== $event.text) {
            this.lastAnwser = this.randomQuestion.givenAnwser;
            this.randomQuestion.givenAnwser = $event.text;
            this.wrongIndex = this.randomletterService.compareString(this.randomQuestion.givenAnwser, this.randomQuestion.translation.punjabi);
        }
        if (this.randomQuestion.givenAnwser == this.randomQuestion.translation.punjabi) {
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
