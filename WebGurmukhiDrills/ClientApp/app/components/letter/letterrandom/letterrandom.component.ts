import { Component } from '@angular/core';
import { RandomLetterData, RandomQuestion } from '../../../services/randomletter/randomletter.model';
import { RandomletterService } from '../../../services/randomletter/randomletter.service'; 
import { ToastrService, MessageType } from '../../../services/toastr/toastr.service';
import { LoggerService, LogLevelType } from '../../../services/logger/logger.service';

@Component({
    selector: 'app-letterrandom',
    templateUrl: './letterrandom.component.html',
    styleUrls: ['./letterrandom.component.css']
})

export class LetterrandomComponent {
    private letterlength = 5;
    private noofletters = 6;
    private randomData: RandomLetterData;
    private currentIndex: number;
    private language: string = 'english';
    private selectedIndex = 0;
    public showQuestions = false;
    public selectedRandomQuestion: RandomQuestion;

    constructor(private randomletterService: RandomletterService, private toastrService: ToastrService, private loggerService: LoggerService) {
        this.selectedRandomQuestion = new RandomQuestion();
    }

    onGroupSelection(indexes: number[]) {
        this.randomletterService.getRandomLetter(this.noofletters, this.letterlength, indexes).subscribe(
            data => {
                if (data) {
                    this.randomData = data;
                    if (data.questions[0]) {
                        this.onClickIndexselection(0);
                    }
                    this.showQuestions = true;
                }
            },
            error => {
                this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                this.toastrService.postMessage(MessageType.Error, error.statusText);
        });
    };

    onClickIndexselection(event: number) {
        this.selectedIndex = event;
        let question = this.randomData.questions[event];
        if (!question.givenAnwser) {
            question.givenAnwser = '';
        }
        this.selectedRandomQuestion = question;
        this.currentIndex = event;
    }

    isPunjabi() {
        return this.language === 'punjabi';
    }

    onClickNextQuestion() {
        let nextQuestionIndex = this.selectedIndex + 1;
        if (nextQuestionIndex > (this.randomData.questions.length -1)) {
            nextQuestionIndex = 0;
        }
        this.onClickIndexselection(nextQuestionIndex);
    }

    onClickResetQuestion() {
        this.showQuestions = false;
    }

    onClickHint() {
        let length = this.selectedRandomQuestion.givenAnwser.length;
        let correctAnwser = this.isPunjabi() ? this.selectedRandomQuestion.translation.punjabi : this.selectedRandomQuestion.translation.english;

        if (this.selectedRandomQuestion.givenAnwser !== correctAnwser) {
            let lengthCorrectAnwser = correctAnwser.length;
            let lastChar = (length > 0) ? this.selectedRandomQuestion.givenAnwser.substring(length - 1, length) : '';
            let lastRefenceChar = this.getStringCharAtIndex(this.selectedRandomQuestion, this.isPunjabi(), length-1);
            let hintmsg = '';
            if (lastRefenceChar === lastChar) {
                if (length < lengthCorrectAnwser) {
                    hintmsg = this.getStringCharAtIndex(this.selectedRandomQuestion, this.isPunjabi(), length);
                }
                hintmsg = 'The next letter is ' + hintmsg;
            } else {
                hintmsg = 'The correct letter is ' + lastRefenceChar;
            }

            if (hintmsg) {
                this.selectedRandomQuestion.feedback.unshift('HINT: ' + hintmsg);
            }
        }
    }

    onClickShowAnwser() {
        let correctAnwser = this.isPunjabi() ? this.selectedRandomQuestion.translation.punjabi : this.selectedRandomQuestion.translation.english;
        if (this.selectedRandomQuestion.givenAnwser !== correctAnwser) {
            this.selectedRandomQuestion.feedback.unshift('Show Anwser: the correct anwser is ' + correctAnwser);
            this.selectedRandomQuestion.givenAnwser = correctAnwser;
        }
    }


    getStringCharAtIndex(referencestr: RandomQuestion, isPunjabi: boolean, index: number) {
        var referencevalue = (isPunjabi) ? referencestr.translation.punjabi : referencestr.translation.english;
        return referencevalue.substring(index, index + 1);
    }
}