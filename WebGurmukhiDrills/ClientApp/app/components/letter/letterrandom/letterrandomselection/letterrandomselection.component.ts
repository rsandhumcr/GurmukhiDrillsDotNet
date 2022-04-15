import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RandomQuestion } from '../../../../services/randomletter/randomletter.model';

@Component({
    selector: 'app-letterrandomselection',
    templateUrl: './letterrandomselection.component.html',
    styleUrls: ['./letterrandomselection.component.css']
})
export class LetterrandomselectionComponent implements OnInit {
    @Input() questions: RandomQuestion[];
    @Output() indexselection = new EventEmitter<number>();
    public questionsArray : number[];
    onIndexClick(index: number) {
        this.indexselection.emit(index);
    }

    ngOnInit() {
        
    }
}