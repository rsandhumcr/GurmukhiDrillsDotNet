import { Component, EventEmitter } from '@angular/core';
import { WordSelectionData, SelectionType, ActionType } from '../wordselection/wordselection.model';
import { AdminSelectionService } from '../../../services/admin/adminselection.service';
import { AdminDataService } from '../../../services/admin/admindata.service';
import { Category, SubCategory, WordTranslation } from '../../../services/word/word.model';
import { ToastrService, MessageType } from "../../../services/toastr/toastr.service";
import { LoggerService, LogLevelType } from "../../../services/logger/logger.service";


@Component({
    selector: 'app-editselector',
    templateUrl: './editselector.component.html',
    styleUrls: ['./editselector.component.css']
})

export class EditselectorComponent {
    public selectionType: number = 0;
    public actionType: number = 0;
    public isLoading: boolean = false;

    public categoryData: Category;
    public subCategoryData: SubCategory;
    public wordTranslationData: WordTranslation;
    public isNew: boolean = false;
    public isDelete: boolean = false;
    private emitCategoryChange : EventEmitter<Category>;
    private emitSubCategoryChange: EventEmitter<SubCategory>;
    private emitTranlationChange : EventEmitter<WordTranslation>;

    constructor(private adminSelectionService: AdminSelectionService, private adminDataService: AdminDataService, private loggerService: LoggerService, private toastrService: ToastrService) {
        this.initlizeSub();
    }

    initlizeSub() {
        if (this.emitCategoryChange == null) {
            this.emitCategoryChange = this.adminDataService.categoryChangeEvent()
                .subscribe((dataCategory: Category) => {
                    console.log('dataCategory', dataCategory);
                    this.categoryData = dataCategory;
                    this.subCategoryData = new SubCategory();
                    this.wordTranslationData = new WordTranslation();
                    this.isLoading = false;
                });
        }
        if (this.emitSubCategoryChange == null) {
            this.emitSubCategoryChange = this.adminDataService.subCategoryChangeEvent()
                .subscribe((dataSubCategory: SubCategory) => {
                    console.log('subCategoryData', dataSubCategory);
                    if (dataSubCategory) {
                        this.subCategoryData = dataSubCategory;
                        this.categoryData = new Category();
                        this.wordTranslationData = new WordTranslation();
                        this.isLoading = false;
                    }
            });
        }
        if (this.emitTranlationChange == null) {
            this.emitTranlationChange = this.adminDataService.translationChangeEvent()
                .subscribe((dataWordTranslation: WordTranslation) => {
                    console.log('wordTranslationData', dataWordTranslation);
                    this.wordTranslationData = dataWordTranslation;
                    this.categoryData = new Category();
                    this.subCategoryData = new SubCategory();
                    this.isLoading = false;
                });
        }
    }

    onSelectionData($event: WordSelectionData) {
        if ($event.actionType !== ActionType.Select) {
            this.selectionType = $event.selectionType;
            this.actionType = $event.actionType;
            this.isLoading = true;

            if ($event.actionType === ActionType.Add) {
                this.processAddEvents($event);
            }
            if ($event.actionType === ActionType.Edit) {
                this.processEditEvents($event);
            }
            if ($event.actionType === ActionType.Delete) {
                this.processDeleteEvents($event);
            }
        }
    }

    processAddEvents($event: WordSelectionData) {
        this.isNew = true;
        this.isLoading = false;
        this.isDelete = false;
        switch ($event.selectionType) {
            case SelectionType.Category:
                this.categoryData = new Category();
                this.categoryData.id = -1;
                this.subCategoryData = new SubCategory();
                this.wordTranslationData = new WordTranslation();
                break;
            case SelectionType.SubCategory:
                this.subCategoryData = new SubCategory();
                this.subCategoryData.id = -1;
                this.subCategoryData.categoryId = $event.selectedCategoryId;
                this.categoryData = new Category();
                this.wordTranslationData = new WordTranslation();
                break;
            case SelectionType.Translation:
                this.wordTranslationData = new WordTranslation();
                this.wordTranslationData.id = -1;
                this.wordTranslationData.subCategoryId = $event.selectedSubCategoryId;
                this.categoryData = new Category();
                this.subCategoryData = new SubCategory();
                break;
            default:
                break;
        }
        
    }

    processEditEvents($event: WordSelectionData) {
        this.isNew = false;
        this.isDelete = false;
        switch ($event.selectionType) {
        case SelectionType.Category:
            this.adminDataService.getCategoryItem($event.selectedCategoryId);
            break;
        case SelectionType.SubCategory:
            this.adminDataService.getSubCategoryItem($event.selectedSubCategoryId);
            break;
        case SelectionType.Translation:
            this.adminDataService.getTranslationItem($event.selectedTransId);
            break;
        default:
            break;
        }
    }

    processDeleteEvents($event: WordSelectionData) {
        this.isNew = false;
        this.isLoading = false;
        this.isDelete = true;
        switch ($event.selectionType) {
        case SelectionType.Category:
            this.adminDataService.getCategoryItem($event.selectedCategoryId);
            break;
        case SelectionType.SubCategory:
            this.adminDataService.getSubCategoryItem($event.selectedSubCategoryId);
            break;
        case SelectionType.Translation:
            this.adminDataService.getTranslationItem($event.selectedTransId);
            break;
        default:
            break;
        }

    }
}