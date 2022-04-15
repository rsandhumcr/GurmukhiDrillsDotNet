import { Component, Input } from '@angular/core';
import { LayoutContent } from "../../../services/multiplechoice/question.model";
import { AudioService } from '../../../services/audio/audio.service';

@Component({
    selector: 'app-questioncontext',
    templateUrl: './questioncontext.component.html',
    styleUrls: ['./questioncontext.component.css']
})

export class QuestioncontextComponent {
    @Input() layoutContexts: LayoutContent[];
    @Input() audiopath: string;
    @Input() imagepath: string;
    @Input() contextclass: string = '';
    constructor(private audioService: AudioService) {

    }

    onPlayAudio(prefix: string, audiosrc: string) {
        this.audioService.playAudioUrl(prefix + '/' + audiosrc);
    }

    applycontextclass() {
        return this.contextclass;
    }
}