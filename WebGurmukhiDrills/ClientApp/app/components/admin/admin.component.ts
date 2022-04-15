import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService, MessageType } from '../../services/toastr/toastr.service';
import { LoggerService, LogLevelType } from '../../services/logger/logger.service';
import { WordSelectionData } from './wordselection/wordselection.model';
import { SelectionItem, WordResultset } from '../../services/word/word.model';
import { AdminSelectionService } from '../../services/admin/adminselection.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
    
    public categoryData: SelectionItem[] = [new SelectionItem(-100, "Please wait and retry, loading data...")];
    private sub: EventEmitter<SelectionItem[]>;
    constructor(private toastrService: ToastrService, private loggerService: LoggerService, private adminSelectionService: AdminSelectionService) {
    }

    ngOnInit() {

        //if (!this.sub) {
        //    this.sub = this.adminSelectionService.categorySeletionChangeEvent().subscribe((categorydata: SelectionItem[]) => {
        //        if (categorydata) {
        //            this.categoryData = categorydata;
        //        }
        //    });
        //}

    }
}