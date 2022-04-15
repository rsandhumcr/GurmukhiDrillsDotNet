import { Component, ChangeDetectorRef } from '@angular/core';
import { WordService } from '../../../services/word/word.service';
import { WordResultset } from '../../../services/word/word.model';
import { AudioService } from '../../../services/audio/audio.service';
import { SelectionItem } from '../../../services/word/word.model';
import { ToastrService, MessageType } from '../../../services/toastr/toastr.service';
import { LoggerService, LogLevelType } from '../../../services/logger/logger.service';

@Component({
    selector: 'app-wordslide',
    templateUrl: './wordslide.component.html',
    styleUrls: ['./wordslide.component.css']
})

export class WordslideComponent {
    public wordtranslationData: WordResultset = new WordResultset();
    public categorynane: string = '';
    public subcategorynane: string = '';
    private isLoaded = false;
    private activeSlideIndex: number;

    constructor(private wordService: WordService, private audioService: AudioService, private toastrService: ToastrService, private loggerService: LoggerService, private cdRef: ChangeDetectorRef) {

    }

    onCateogryselected($event: SelectionItem) {

        this.categorynane = ($event && $event.id > 0) ?$event.name : '';
        this.subcategorynane = '';
        this.wordtranslationData = new WordResultset();
        this.isLoaded = false;
    }

    onSubcateogryselected($event: SelectionItem) {
        if ($event && $event.id > 0) {
            this.subcategorynane = $event.name;
            this.wordService.getWordTranslations($event.id)
                .subscribe(
                data => {
                    this.wordtranslationData = data;
                    this.cdRef.detectChanges();
                    this.isLoaded = true;
                    this.playAudio(this.wordtranslationData.audioPrefix, 0);
                },
                error => {
                        this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                        this.toastrService.postMessage(MessageType.Error, error.statusText); 
                    });
        } else {
            this.subcategorynane = '';
            this.wordtranslationData = new WordResultset();
            this.isLoaded = false;
        }
    }

    onSlideChanged($event: any) {
        if (this.showSlide()) {
            let itemNo = Number($event);
            this.playAudio(this.wordtranslationData.audioPrefix, itemNo);
        }
    }

    playAudio(prefix: string, letterIndex: number) {
        if (this.isLoaded) {
            let letter = this.wordtranslationData.listTransation[letterIndex];
            if (letter && letter.audioFileName) {
                let audio1 = prefix + '/' + letter.audioFileName;
                this.audioService.playAudioUrl(audio1);
            }
        }
    }

    showSlide() {
        return (this.wordtranslationData && this.wordtranslationData.listTransation && this.wordtranslationData.listTransation.length > 0 );
    }
}