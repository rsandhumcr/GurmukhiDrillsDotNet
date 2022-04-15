import { Component, OnInit } from '@angular/core';
import { ToastrService, MessageType } from '../../services/toastr/toastr.service';
import { LoggerService, LogLevelType } from '../../services/logger/logger.service';
import { MultiplechoiceService } from '../../services/multiplechoice/multiplechoice.service';
import { Questions, Question } from '../../services/multiplechoice/question.model';

@Component({
    selector: 'app-testbed',
    templateUrl: './testbed.component.html',
    styleUrls: ['./testbed.component.css']
})
/** testbed component*/
export class TestbedComponent implements OnInit {
    /** testbed ctor */
    public question: Questions;
    public firstQuestion: Question;
    constructor(private toastrService: ToastrService, private logger: LoggerService, private multiplechoiceService: MultiplechoiceService) {
    }

    /** Called by Angular after testbed component initialized */
    ngOnInit(): void {
        this.question = new Questions();
    }

    popToast() {
        this.toastrService.postMessage(MessageType.Info, "body", "title", true);
        this.toastrService.postMessage(MessageType.Error, "body e", "title e", false);
        this.toastrService.postMessage(MessageType.Warning, "body w");
        this.toastrService.postMessage(MessageType.Success, "body s", "s title", false);
    }

    onGroupSelection(indexes: number[]) {
        this.multiplechoiceService.getLetterGroupMuliptleChoice(indexes).subscribe(data => {
            this.question = data;
            let firstQ = data.listQuestion[0];
            this.firstQuestion = firstQ;
        });
    };

    onTextChange(text: string) {
        console.log(text);
    }

    onClickbuttonresponse() {
        console.log('button click');
    }
}