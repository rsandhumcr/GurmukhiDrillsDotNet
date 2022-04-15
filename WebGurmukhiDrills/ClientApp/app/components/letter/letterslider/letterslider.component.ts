import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LetterService } from '../../../services/letter/letter.service';
import { LetterGroupData } from '../../../services/letter/letter.model';
import { AudioService } from '../../../services/audio/audio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-letterslider',
    templateUrl: './letterslider.component.html',
    styleUrls: ['./letterslider.component.css']
})
export class LettersliderComponent implements OnInit {
    data: LetterGroupData;
    selection: number = 1;
    playedFirst: boolean = false;
    isLoadingData: boolean = false;

    public activeSlideIndex: number =0; //from documentation

    constructor(private route: ActivatedRoute,
        private letterComponent: LetterService,
        private audioService: AudioService,
        private cdRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.selection = +params['id'];
            this.letterComponent.getLetterGroup(this.selection)
                .subscribe(result => {
                        this.isLoadingData = true;
                        this.data = result;
                        this.activeSlideIndex = 0;
                        this.cdRef.detectChanges();
                        this.isLoadingData = false;
                        this.playAudio(this.data.audioPrefix, 0);
                    }
                );
        });

    }

    onSlideChanged($event: any) {
        if (this.isLoadingData === false) {
            let itemNo = Number($event);
            this.playAudio(this.data.audioPrefix, itemNo);
        }
    }

    playAudio(prefix: string, letterIndex: number) {
        let letter = this.data.letters[letterIndex];
        if (letter && letter.nameFile) {
            let audio1 = prefix + '/' + letter.nameFile;
            let audio2 = '';
            if (letter.pronouncefile) {
                audio2 = prefix + '/' + letter.pronouncefile;
            }
            this.audioService.playFiles(audio1, audio2);
        }
    }
}
