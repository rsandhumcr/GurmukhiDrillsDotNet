import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/find';
import { WordService } from '../../../../services/word/word.service';
import { SelectionItem, SubCategory } from '../../../../services/word/word.model';
import { ToastrService, MessageType } from '../../../../services/toastr/toastr.service';
import { LoggerService,LogLevelType } from '../../../../services/logger/logger.service';
@Component({
    selector: 'app-categoryselect',
    templateUrl: './categoryselect.component.html',
    styleUrls: ['./categoryselect.component.css']
})

export class CategoryselectComponent implements OnInit {
    private defaultSelect = new SelectionItem(0, 'Please select');
    private firstload : boolean = true;
    @Input() showButtons = false;
    @Input() inEdit = false;
    @Output() cateogryselected = new EventEmitter<SelectionItem>();
    @Output() subcateogryselected = new EventEmitter<SelectionItem>();

    public categoryData: SelectionItem[] = [new SelectionItem(-100, "Please wait and retry, loading data...")];
    public subcategoryData: SelectionItem[] = [new SelectionItem(-100, "Select category first") ];
    @Input() selectedCategoryId: number = 0;
    @Input() selectedSubCategoryId: number = 0;

    constructor(private wordService: WordService, private toastrService: ToastrService, private loggerService: LoggerService) {
        
    }

    ngOnInit() {
        this.getCategoryItems();
    }

    onCategoryChange($event: any) {
        this.getSubCategoryItems();
        this.selectedSubCategoryId = 0;
        if (this.selectedCategoryId == 0) {
            this.cateogryselected.emit(new SelectionItem(0, ''));
        } else {
            this.cateogryselected.emit(this.getSelectedItem(this.selectedCategoryId, this.categoryData));
        }
        
    }
    onSubCategoryChange($event: any) {
        if (this.selectedSubCategoryId == 0) {
            this.subcateogryselected.emit(new SelectionItem(0, ''));
        } else {
            this.subcateogryselected.emit(this.getSelectedItem(this.selectedSubCategoryId, this.subcategoryData));
        }
        
    }

    getCategoryItems() {
        this.wordService.getWordCategorySelection()
            .subscribe(result => {
                this.categoryData = <SelectionItem[]>result;
                    if (this.firstload) {
                        if (this.selectedCategoryId !== 0 && this.selectedSubCategoryId !== 0) {
                            this.firstload = false;
                            this.getSubCategoryItems();
                        }
                        if (this.selectedCategoryId === 0 && this.selectedSubCategoryId !== 0) {
                            this.wordService.getWordSubCategory(this.selectedSubCategoryId)
                                .subscribe((subcategory: SubCategory) => {
                                    this.selectedCategoryId = subcategory.categoryId;
                                    this.firstload = false;
                                    this.getSubCategoryItems();
                                });
                        }
                    }
            },
            error => {
                this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                this.toastrService.postMessage(MessageType.Error, error.statusText); 
            });

    }

    getSubCategoryItems() {
        this.wordService.getWordSubCategorySelection(this.selectedCategoryId)
            .subscribe(result => {
                this.subcategoryData = <SelectionItem[]>result;
            },
                error => {
                    this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                    this.toastrService.postMessage(MessageType.Error, error.statusText);  
                });
    }

    getSelectedItem(index: number, selection: SelectionItem[]) {
        let found = selection.find(itm => itm.id === index);
        return found;
    }

    getLabelClass() {
        if (this.inEdit)
            return 'col-sm-2 hidden-xs';
        return 'col-sm-4 hidden-xs';
    }

    getControlClass() {
        if (this.inEdit)
            return 'col-sm-8 hidden-xs';
        return 'col-sm-7 col-xs-10';
    }
}