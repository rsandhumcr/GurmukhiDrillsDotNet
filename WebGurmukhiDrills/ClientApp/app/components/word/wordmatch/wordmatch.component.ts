import { Component } from '@angular/core';
import { WordService } from '../../../services/word/word.service';
import { RandomLetterData, RandomQuestion, TranslationResultSet } from '../../../services/randomletter/randomletter.model';
import { WordResultset, WordTranslation } from '../../../services/word/word.model';
import { SelectionItem } from '../../../services/word/word.model';
import { ToastrService, MessageType } from '../../../services/toastr/toastr.service';
import { LoggerService, LogLevelType } from '../../../services/logger/logger.service';
import { AudioService } from '../../../services/audio/audio.service';

@Component({
    selector: 'app-wordmatch',
    templateUrl: './wordmatch.component.html',
    styleUrls: ['./wordmatch.component.css']
})

export class WordmatchComponent {
    private wordResultset: WordResultset;
    private randomLetterData: RandomLetterData;
    private language: string = 'punjabi';
    public currentIndex: number =0;
    public showQuestions = false;
    public selectedWordTranslation: WordTranslation;
    public selectedRandomQuestion: RandomQuestion;
    public categorynane: string = '';
    public subcategorynane: string = '';

    constructor(private wordService: WordService,private audioService: AudioService,  private toastrService: ToastrService, private loggerService: LoggerService) {
        this.selectedWordTranslation = new WordTranslation();
    }

    onCateogryselected($event: SelectionItem) {

        if ($event && $event.id > 0) {
            this.categorynane = $event.name;
        } else {
            this.categorynane = '';
        }
        this.subcategorynane = '';
        this.randomLetterData = new RandomLetterData();
        this.selectedRandomQuestion = new RandomQuestion();
    }

    onSubcateogryselected($event: SelectionItem) {
        if ($event && $event.id > 0) {
            this.subcategorynane = $event.name;
            this.wordService.getWordTranslationsShuffled($event.id)
                .subscribe(data => {
                        this.wordResultset = data;
                        this.randomLetterData = new RandomLetterData();
                        let lengthOfData = this.wordResultset.listTransation.length;
                        this.randomLetterData.questions = new Array();
                        for (var iloop = 0; iloop < lengthOfData; iloop++) {
                            let translationData =this.convertWordResultsetToTranslationResultSet(this.wordResultset.listTransation[iloop]);
                            this.randomLetterData.questions.push(this.createDefaultQuestions(translationData));
                        }
                        this.onClickIndexselection(0);
                        this.showQuestions = true;
                    },
                    error => {
                        this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                        this.toastrService.postMessage(MessageType.Error, error.statusText);
                    });
        } else {
            this.subcategorynane = '';
            this.wordResultset = new WordResultset();
        }
    }

    onClickIndexselection(event: number) {
        this.selectedWordTranslation = this.wordResultset.listTransation[event];
        this.selectedRandomQuestion = this.randomLetterData.questions[event];
        this.currentIndex = event;
    }

    isPunjabi() {
        return this.language === 'punjabi';
    }

    onClickNextQuestion() {
        let nextQuestionIndex = this.currentIndex + 1;
        if (nextQuestionIndex > (this.wordResultset.listTransation.length - 1)) {
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
            let lastRefenceChar = this.getStringCharAtIndex(this.selectedRandomQuestion, this.isPunjabi(), length - 1);
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

    convertWordResultsetToTranslationResultSet(wordTranslation: WordTranslation) {
        let translationData = new TranslationResultSet();
        translationData.punjabi = wordTranslation.punjabi;
        translationData.english = wordTranslation.character;
        translationData.equivalentEnglish = wordTranslation.equivalent;
        translationData.translation = wordTranslation.character;
        return translationData;
    }

    createDefaultQuestions(translationData: TranslationResultSet ) {
        let randomQuestion = new RandomQuestion();
        randomQuestion.anwsered = false;
        randomQuestion.givenAnwser = '';
        randomQuestion.feedback = new Array();
        randomQuestion.translation = translationData;
        return randomQuestion;
    }

    onClickPlayAudio(prefix: string, audiosrc: string) {
        this.audioService.playAudioUrl(prefix + audiosrc);
    }
}