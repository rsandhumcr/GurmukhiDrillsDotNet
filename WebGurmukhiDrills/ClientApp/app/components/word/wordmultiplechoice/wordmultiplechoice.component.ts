import { Component } from '@angular/core';
import { SelectionItem } from '../../../services/word/word.model';
import { MultiplechoiceService } from '../../../services/multiplechoice/multiplechoice.service';
import { Questions, Question } from '../../../services/multiplechoice/question.model';
import { LoggerService, LogLevelType } from '../../../services/logger/logger.service';
import { ToastrService, MessageType } from '../../../services/toastr/toastr.service';

@Component({
    selector: 'app-wordmultiplechoice',
    templateUrl: './wordmultiplechoice.component.html',
    styleUrls: ['./wordmultiplechoice.component.css']
})

export class WordmultiplechoiceComponent {
    private categorynane: string = '';
    private subcategorynane: string = '';
    public question: Questions = new Questions();
    public firstQuestion: Question;
    public showQuestions = false;
    private language: string = 'punjabi';
    private difficulty: number = 1;
    private showImage: boolean = true;

    constructor(private multiplechoiceService: MultiplechoiceService, private toastrService: ToastrService, private loggerService: LoggerService) {

    }

    onCateogryselected($event: SelectionItem) {
        this.categorynane = ($event && $event.id > 0)? $event.name : '';
        this.subcategorynane = '';
    }

    onSubcateogryselected($event: SelectionItem) {
        if ($event && $event.id > 0) {
            this.subcategorynane = $event.name;
            this.multiplechoiceService.getWordMultipleChoiceQuestion($event.id, this.difficulty, (this.language === 'punjabi'), this.showImage).subscribe(
                data => {
                    if (data) {
                        this.question = data;
                        this.firstQuestion = data.listQuestion[0];
                        this.showQuestions = true;
                    }
                },
                error => {
                    this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                    this.toastrService.postMessage(MessageType.Error, error.statusText);
                });
        } else {
            this.subcategorynane = '';
        }
    }

    onClickResetQuestion() {
        this.showQuestions = false;
        this.question = new Questions();
    }
}