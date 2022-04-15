import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/find';
import { ToastrService, MessageType } from '../../../services/toastr/toastr.service';
import { LoggerService, LogLevelType } from '../../../services/logger/logger.service';
import { WordService } from '../../../services/word/word.service';
import { SelectionItem, WordResultset } from '../../../services/word/word.model';
import { WordSelectionData, ActionType, SelectionType } from './wordselection.model';
import { AdminSelectionService } from '../../../services/admin/adminselection.service';

@Component({
    selector: 'app-wordselection',
    templateUrl: './wordselection.component.html',
    styleUrls: ['./wordselection.component.css']
})
/** wordselection component*/
export class WordselectionComponent implements OnInit {
    @Output() selectionData = new EventEmitter <WordSelectionData>();
    @Input() selectedCategoryId: number = 0;
    @Input() selectedSubCategoryId: number = 0;
    @Input() selectedTransId: number = 0;

    public categoryData: SelectionItem[] = [new SelectionItem(-100, "Please wait and retry, loading data...")];
    public subcategoryData: SelectionItem[] = [new SelectionItem(-100, "Select category first")];
    public wordtranslationData: WordResultset = new WordResultset();

    private subscibedCat: EventEmitter<SelectionItem[]>;
    private subscibedSubCat: EventEmitter<SelectionItem[]>;
    private subscibedTranslation: EventEmitter<WordResultset>;

    private defaultSelect = new SelectionItem(0, 'Please select');
    public categorynane: string = '';
    public subcategorynane: string = '';
    
    constructor(private wordService: WordService, private toastrService: ToastrService, private loggerService: LoggerService, private adminSelectionService: AdminSelectionService)
    {
        this.adminSelectionService.getCategorySelectionItems();
    }

    ngOnInit() {
        this.subscribeevents();
    }

    subscribeevents() {
        if (!this.subscibedCat) {
            this.subscibedCat = this.adminSelectionService.categorySeletionChangeEvent()
                .subscribe((categorydata: SelectionItem[]) => {
                    console.log('subscibedCat subcategorydata', categorydata);
                this.categoryData = categorydata;
            });
        }

        if (!this.subscibedSubCat) {
            this.subscibedSubCat = this.adminSelectionService.subCategorySeletionChangeEvent()
                .subscribe((subcategorydata: SelectionItem[]) => {
                    console.log('subscibedSubCat subcategorydata', subcategorydata);
                        this.subcategoryData = subcategorydata;
            });
        }

        if (!this.subscibedTranslation) {
            this.subscibedTranslation = this.adminSelectionService.translationSeletionChangeEvent()
                .subscribe((transdata: WordResultset) => {
                    console.log('subscibedTranslation transdata', transdata);
                this.wordtranslationData = transdata;
            });
        }
    }

    onCategoryChange($event: any) {
        this.adminSelectionService.getSubCategorySelectionItems(this.selectedCategoryId);
        this.selectedSubCategoryId = 0;
        this.selectedTransId = 0;

        let wordselect = new WordSelectionData(this.selectedCategoryId,
            this.selectedSubCategoryId,
            this.selectedTransId,
            SelectionType.Category,
            ActionType.Select);
        this.selectionData.emit(wordselect);
    }
    onSubCategoryChange($event: any) {
        this.adminSelectionService.getTranslationItems(this.selectedSubCategoryId);
        this.selectedTransId = 0;
        this.selectionData.emit(new WordSelectionData(this.selectedCategoryId, this.selectedSubCategoryId, this.selectedTransId, SelectionType.SubCategory, ActionType.Select));
    }

    onCateogryselected($event: SelectionItem) {

        if ($event && $event.id > 0) {
            this.categorynane = $event.name;
        } else {
            this.categorynane = '';
        }
        this.subcategorynane = '';
    }

    onTranslationChange($event: any) {
        this.selectionData.emit(new WordSelectionData(this.selectedCategoryId, this.selectedSubCategoryId, this.selectedTransId, SelectionType.Translation, ActionType.Select));
    }

    getSelectedItem(index: number, selection: SelectionItem[]) {
        let found = selection.find(itm => itm.id === index);
        return found;
    }

    onCatAdd() {
        this.selectionData.emit(new WordSelectionData(this.selectedCategoryId, this.selectedSubCategoryId, this.selectedTransId, SelectionType.Category, ActionType.Add));
    }

    onCatEdit() {
        this.selectionData.emit(new WordSelectionData(this.selectedCategoryId, this.selectedSubCategoryId, this.selectedTransId, SelectionType.Category, ActionType.Edit));
    }

    onCatDelete() {
        this.selectionData.emit(new WordSelectionData(this.selectedCategoryId, this.selectedSubCategoryId, this.selectedTransId, SelectionType.Category, ActionType.Delete));
    }

    onSubCatAdd() {
        this.selectionData.emit(new WordSelectionData(this.selectedCategoryId, this.selectedSubCategoryId, this.selectedTransId, SelectionType.SubCategory, ActionType.Add));
    }

    onSubCatEdit() {
        this.selectionData.emit(new WordSelectionData(this.selectedCategoryId, this.selectedSubCategoryId, this.selectedTransId, SelectionType.SubCategory, ActionType.Edit));
    }

    onSubCatDelete() {
        this.selectionData.emit(new WordSelectionData(this.selectedCategoryId, this.selectedSubCategoryId, this.selectedTransId, SelectionType.SubCategory, ActionType.Delete));
    }

    onTranAdd() {
        this.selectionData.emit(new WordSelectionData(this.selectedCategoryId, this.selectedSubCategoryId, this.selectedTransId, SelectionType.Translation, ActionType.Add));
    }

    onTranEdit() {
        this.selectionData.emit(new WordSelectionData(this.selectedCategoryId, this.selectedSubCategoryId, this.selectedTransId, SelectionType.Translation, ActionType.Edit));
    }

    onTranDelete() {
        this.selectionData.emit(new WordSelectionData(this.selectedCategoryId, this.selectedSubCategoryId, this.selectedTransId, SelectionType.Translation, ActionType.Delete));
    }

    canDeleteCat() {
        if (this.selectedCategoryId < 1)
            return true;
        return !(this.subcategoryData.length === 0);
    }
    canDeleteSubCat() {
        if (this.selectedSubCategoryId < 1)
            return true;
        return !(this.wordtranslationData.listTransation && this.wordtranslationData.listTransation.length === 0);
    }
}