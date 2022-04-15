import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-gurmkhikeyboard',
    templateUrl: './gurmkhikeyboard.component.html',
    styleUrls: ['./gurmkhikeyboard.component.css']
})
/** gurmkhikeyboard component*/
export class GurmkhikeyboardComponent implements OnInit {
    /** gurmkhikeyboard ctor */
    private currentText: string;

    @Input() inputmode: boolean = true;
    @Input('disabled') disabledkybr: boolean = false;
    @Input('currentText')
    set currentTextInput(value: string) {
        if (!value) {
            value = '';
        }
        this.currentText = value;
        this.caretPos = this.currentText.length;
    }

    @Input() floatkeyboard : boolean =false;
    @Input() showKeyboard = false;
    @Input() showKeyboardButton = true;
    @Output() textChange = new EventEmitter<KeyboardData>();
    @Input() buttontext:string ='';
    @Output() buttonresponse = new EventEmitter();

    private caretPos: number = 0;
    private keyboard: string[][][] =
        [
           [['\u0A02'], ['\u0A3C'], ['\u0A3E'], ['\u0A3F'], ['\u0A40'], ['\u0A47'],['\u0A48'], ['\u0A4B'], ['\u0A4C'], ['\u0A41'], ['\u0A42'], ['\u0964'], ['\u0965'] ],
           [['\u0A70'], ['\u0A73'], ['\u0A05'], ['\u0A72'], ['\u0A38'], ['\u0A39'], ['\u0A15'], ['\u0A16'], ['\u0A17'], ['\u0A18'], ['\u0A19'], ['\u0A09'], ['\u0A0A'] ],
           [['\u0A71'], ['\u0A1A'], ['\u0A1B'], ['\u0A1C'], ['\u0A1D'], ['\u0A1E'], ['\u0A1F'], ['\u0A20'], ['\u0A21'], ['\u0A22'], ['\u0A23'], ['\u0A13'], ['\u0A05'] ],
           [['\u0A4D\u0A30'], ['\u0A24'], ['\u0A25'], ['\u0A26'], ['\u0A27'], ['\u0A28'], ['\u0A2A'], ['\u0A2B'], ['\u0A2C'], ['\u0A2D'], ['\u0A2E'], ['\u0A06'],['\u0A10'] ],
           [['\u0A4D\u0A39'], ['\u0A2F'], ['\u0A30'], ['\u0A32'], ['\u0A35'], ['\u0A5C'], ['\u0A36'], ['\u0A59'], ['\u0A5A'], ['\u0A5B'], ['\u0A5E'], ['\u0A14'], ['\u0A0F'] ], 
           [['\u0A4D\u0A35'], ['\u0A4D'], ['Space'], ['Bksp'], ['\u0A33'], ['\u0A07'], ['\u0A08']] 
       ];

    ngOnInit() {
        if (!this.currentText) {
            this.currentText = "";
        }
        this.caretPos = this.currentText.length;
        if (!this.showKeyboardButton) {
            this.showKeyboard = true;
            this.floatkeyboard = false;
        }
    }

    onButtonClick(key: string, inputtext: HTMLInputElement)
    {
        if (this.caretPos < 0) {
            this.caretPos =0;
        }

        if (key == "Bksp") {
            if (this.caretPos > 0) {
                this.currentText = this.isCursorAtEndOfText() ?
                    this.currentText.substring(0, this.currentText.length - 1) :
                    this.splitText(this.currentText, this.caretPos - 1, this.caretPos, '');
                this.caretPos--;
            }
        } else {
            let char = key;
            if (key == "Space") {
                char = " ";
            }
            this.currentText = this.isCursorAtEndOfText() ?
                this.currentText + char :
                this.splitText(this.currentText, this.caretPos, this.caretPos, char);
            this.caretPos++;
        }

        if (this.caretPos > (this.currentText.length)) {
            this.caretPos = this.currentText.length;
        }
        let data = new KeyboardData();
        data.text = this.currentText;
        data.key = key[0];
        data.caretPos = this.caretPos;
        this.textChange.emit(data);
    }

    isCursorAtEndOfText() {
        return this.caretPos === this.currentText.length;
    }

    splitText(fulltext : string, startindex: number, endindex : number, newchar : string) {
        return [fulltext.slice(0, startindex), newchar, fulltext.slice(endindex)].join('');
    }


    

    getCaretPos(oField: HTMLInputElement) {
        if (oField.selectionStart || oField.selectionStart === 0) {
            this.caretPos = oField.selectionStart;
        }
        let data = new KeyboardData();
        data.text = this.currentText;
        data.key = 'select';
        data.caretPos = this.caretPos;
        this.textChange.emit(data);
    }

    convertUniCodeToString(unicode : string) {
        return String.fromCharCode(parseInt(unicode, 16));
    }

    setbtnclass() {
        return "btn btn-xs minikybrd";
    }

    setkeyboardbkclass() {
        if (this.floatkeyboard) {
            if (this.inputmode) {
                return "keyboardbkfloat";
            } else {
                return "keyboardbkfloattextarea";
            }
            
        }
        return "keyboardbk";
    }

    onToggerKeyboard() {
        this.showKeyboard = !this.showKeyboard;
    }

    onInputChange() {
        let data = new KeyboardData();
        data.text = this.currentText;
        data.key = 'change';
        data.caretPos = this.caretPos;
        this.textChange.emit(data);
    }

    currentIndex() {
        let position = String(this.caretPos);
        if (this.isCursorAtEndOfText()) {
            position = 'end';
        }
        if (this.caretPos === 0) {
            position = 'start';
        }
        return position;
    }

    onClickButtonresponse() {
        this.buttonresponse.emit();
    }
}

export class KeyboardData {
    public text: string;
    public key: string;
    public caretPos : number;
}