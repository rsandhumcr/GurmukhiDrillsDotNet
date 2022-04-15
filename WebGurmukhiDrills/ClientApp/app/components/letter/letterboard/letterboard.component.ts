import { Component, OnInit } from '@angular/core';
import { LetterService } from '../../../services/letter/letter.service';
import { LetterGroupData } from '../../../services/letter/letter.model';
import { AudioService } from '../../../services/audio/audio.service';
import { ToastrService, MessageType } from '../../../services/toastr/toastr.service';
import { LoggerService, LogLevelType } from '../../../services/logger/logger.service';

@Component({
    selector: 'letter-board',
    templateUrl: './letterboard.component.html',
    styleUrls: ['./letterboard.component.css']
})

export class LetterBoardComponent implements OnInit
{
    data: LetterGroupData;
    baseUrlSent: any;
    selection: number =1;
    constructor(private letterComponent: LetterService, private audioService: AudioService,private toastrService : ToastrService, private loggerService: LoggerService)
    {
    
    }
   

    ngOnInit(): void {
        this.letterComponent.getLetterGroup(this.selection)
            .subscribe(
            result => {
                    this.data = result;
            },
            error => {
                    this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                    this.toastrService.postMessage(MessageType.Error, error.statusText);
            });
            
    }

    onSelection(selection: number) {
        this.letterComponent.getLetterGroup(selection)
            .subscribe(result =>
                this.data = result
            );        
    }

    onPlayAudio(prefix : string, audiosrc : string) {
        this.audioService.playAudioUrl(prefix + '/' + audiosrc);
    }
}