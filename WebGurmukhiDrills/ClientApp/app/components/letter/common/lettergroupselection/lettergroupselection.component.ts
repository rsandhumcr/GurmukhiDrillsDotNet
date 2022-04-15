import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'lettergroup-selection',
    templateUrl: './lettergroupselection.component.html',
    styleUrls: ['./lettergroupselection.component.css']
})
export class LettergroupselectionComponent implements OnInit
{
    @Input() selection: number;
    @Output() onSelected = new EventEmitter<number>();
    ngOnInit(): void {
    }

    onSelection(selection: number) {
        this.onSelected.emit(selection);
    }
}