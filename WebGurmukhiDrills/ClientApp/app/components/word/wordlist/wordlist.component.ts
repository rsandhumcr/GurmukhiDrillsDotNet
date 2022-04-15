import { Component } from '@angular/core';
import { WordService } from '../../../services/word/word.service';
import { WordResultset } from '../../../services/word/word.model';
import { AudioService } from '../../../services/audio/audio.service';
import { SelectionItem } from '../../../services/word/word.model';
import { ToastrService, MessageType } from '../../../services/toastr/toastr.service';
import { LoggerService, LogLevelType } from '../../../services/logger/logger.service';

@Component({
    selector: 'app-wordlist',
    templateUrl: './wordlist.component.html',
    styleUrls: ['./wordlist.component.css']
})

export class WordlistComponent {

    public wordtranslationData: WordResultset = new WordResultset();
    public categorynane: string = '';
    public subcategorynane: string = '';
    constructor(private wordService: WordService, private audioService: AudioService, private toastrService: ToastrService, private loggerService : LoggerService) {

    }

    onCateogryselected($event: SelectionItem) {

        if ($event && $event.id > 0) {
            this.categorynane = $event.name;
        } else {
            this.categorynane = '';
        }
        this.subcategorynane = '';
        this.wordtranslationData = new WordResultset();
    }

    onSubcateogryselected($event: SelectionItem) {
        if ($event && $event.id > 0) {
            this.subcategorynane = $event.name;
            this.wordService.getWordTranslations($event.id)
                .subscribe(data => {
                    this.wordtranslationData = data;
                },
                error => {
                    this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                    this.toastrService.postMessage(MessageType.Error, error.statusText); 
                });
        } else {
            this.subcategorynane = '';
            this.wordtranslationData = new WordResultset();
        }
    }

    onClickPlayAudio(prefix: string, audiosrc : string) {
        this.audioService.playAudioUrl(prefix +  audiosrc);
    }   
     
}
