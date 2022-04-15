import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { LetterService } from '../../../services/letter/letter.service';
import { LetterGroupType } from '../../../services/letter/letter.model';
import { ToastrService, MessageType } from '../../../services/toastr/toastr.service';
import { LoggerService, LogLevelType } from '../../../services/logger/logger.service';

@Component({
    selector: 'app-lettergroupselectionlist',
    templateUrl: './lettergroupselectionlist.component.html',
    styleUrls: ['./lettergroupselectionlist.component.css']
})

export class LettergroupselectionlistComponent implements OnInit {

    groupseletion: LetterGroupType[];
    groupseleted: LetterGroupType[];

    @Input() titlehead = ""; 
    @Input() buttonlabel = "Show selection"; 
    @Output() processselection = new EventEmitter<number[]>();

    constructor(private letterService: LetterService, private toastrService: ToastrService, private loggerService: LoggerService){

    }

    ngOnInit() {
        this.letterService.getLetterGroupTypes().subscribe(
            data => {
                this.groupseletion = data;
            },
            error => {
                this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                this.toastrService.postMessage(MessageType.Error, error.statusText);
            });
    }

    handleChange(val: string, index: number, value : any) {
        let selected = this.groupseletion.filter(itm => itm.groupType === index)[0];
        selected.selected = value;
    }

    onShowSelected() {
        let selected = this.groupseletion.filter(itm => itm.selected);
        this.groupseleted = selected;
        let indexes = selected.map(letter => letter.groupType);
        this.processselection.emit(indexes);
    }
}