import { Component } from '@angular/core';
import { LoggerService,LogLevelType } from '../../../services/logger/logger.service';
import { MultiplechoiceService } from '../../../services/multiplechoice/multiplechoice.service';
import { Questions, Question } from '../../../services/multiplechoice/question.model';
import { ToastrService, MessageType } from '../../../services/toastr/toastr.service';


@Component({
    selector: 'app-lettermultiplechoice',
    templateUrl: './lettermultiplechoice.component.html',
    styleUrls: ['./lettermultiplechoice.component.css']
})

export class LettermultiplechoiceComponent {
    private question: Questions = new Questions();
    private firstQuestion: Question;
    public showQuestions = false;

    constructor(private multiplechoiceService: MultiplechoiceService, private toastrService : ToastrService, private loggerService : LoggerService) {
    }

    onGroupSelection(indexes: number[]) {
        this.multiplechoiceService.getLetterGroupMuliptleChoice(indexes).subscribe(data => {
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
    };

    onClickResetQuestion() {
        this.question = new Questions();
        this.showQuestions = false;
    }

}