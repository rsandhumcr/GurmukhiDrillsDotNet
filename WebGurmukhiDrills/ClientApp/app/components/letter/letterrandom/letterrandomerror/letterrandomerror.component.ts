import { Component , Input} from '@angular/core';

@Component({
    selector: 'app-letterrandomerror',
    templateUrl: './letterrandomerror.component.html',
    styleUrls: ['./letterrandomerror.component.css']
})

export class LetterrandomerrorComponent {

    public inputletter : string[];
    @Input() wrongindex: number[];
    @Input('inputletter')

    set currentTextInput(value: string[]) {
        this.inputletter = value;
        if (this.inputletter && this.inputletter.length ==0) {
            this.inputletter = ['(', 'N', 'o', ' ', ' ', 't', 'e', 'x', 't', ')'];
        }
    }

    getAnwserClass(index: number) {
        let classvalue = "correcttext";
        if (this.wrongindex) {
            let foundWrong = this.wrongindex.filter(itm => itm === index);
            if (foundWrong && foundWrong.length > 0) {
                classvalue = "wrongtext";
            }
        }
        return classvalue;
    }
}