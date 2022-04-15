import { Injectable, EventEmitter } from "@angular/core";
import { ToastrService, MessageType } from "../toastr/toastr.service";
import { LoggerService, LogLevelType } from "../logger/logger.service";
import { SelectionItem, WordResultset, Category, SubCategory, WordTranslation } from "../word/word.model";
import { WordService } from "../../services/word/word.service";
import { AdminDataService } from './admindata.service';

@Injectable()
export class AdminSelectionService {
    private categoryDataSeletion: SelectionItem[] = [new SelectionItem(-100, "Select category first")];
    private subcategorySelection: SelectionItem[] = [new SelectionItem(-100, "Select category first")];
    private wordtranslationData = new WordResultset();

    private emitCategorySelectChange = new EventEmitter<SelectionItem[]>();
    private emitSubCategorySelectChange = new EventEmitter<SelectionItem[]>();
    private emitTranlationSelectChange = new EventEmitter<WordResultset>();

    private emitCategoryChange : EventEmitter<Category>;
    private emitSubCategoryChange : EventEmitter<SubCategory>;
    private emitTranlationChange: EventEmitter<WordTranslation>;

    private emitCategoryDelete: EventEmitter<number>;
    private emitSubCategoryDelete: EventEmitter<number>;
    private emitTranlationDelete : EventEmitter<number>;

    constructor(private wordService: WordService, private toastrService: ToastrService, private loggerService: LoggerService, private adminDataService: AdminDataService) {
        this.initlizeDataEvents();
    }

    // Selections
    categorySeletionChangeEvent() {
        return this.emitCategorySelectChange;
    };

    subCategorySeletionChangeEvent() {
        return this.emitSubCategorySelectChange;
    };

    translationSeletionChangeEvent() {
        return this.emitTranlationSelectChange;
    };

    // Selections
    getCategorySelectionItems() {

        this.wordService.getWordCategorySelection()
                .subscribe(
                    result => {
                        this.categoryDataSeletion = result;
                        this.emitCategorySelectChange.emit(this.categoryDataSeletion);
                    },
                    error => {
                        this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                        this.toastrService.postMessage(MessageType.Error, error.statusText);
                    });
    }

    getSubCategorySelectionItems(selectedCategoryId: number) {
        if (selectedCategoryId) {
            this.wordService.getWordSubCategorySelection(selectedCategoryId)
                .subscribe(
                result => {
                    this.subcategorySelection = result;
                    this.emitSubCategorySelectChange.emit(this.subcategorySelection);
                    },
                    error => {
                        this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                        this.toastrService.postMessage(MessageType.Error, error.statusText);
                    });
        }
    }

    getTranslationItems(selectedSubCategoryId: number) {
        if (selectedSubCategoryId > 0) {
            this.wordService.getWordTranslations(selectedSubCategoryId)
                .subscribe(
                    data => {
                        this.wordtranslationData = data;
                        this.emitTranlationSelectChange.emit(this.wordtranslationData);
                    },
                    error => {
                        this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                        this.toastrService.postMessage(MessageType.Error, error.statusText);
                    });
        }
    }

    // data events
    initlizeDataEvents() {

        // update category selection.
        if (!this.emitCategoryChange) {
            this.emitCategoryChange = this.adminDataService.categoryChangeEvent().subscribe(( category: Category) => {
                let foundCategory = this.categoryDataSeletion.find(itm => itm.id === category.id);
                if (foundCategory) {
                    if (foundCategory.name !== category.name) {
                        foundCategory.name = category.name;
                    }
                } else {
                    this.categoryDataSeletion.push(new SelectionItem(category.id, category.name) );
                }
                this.emitCategorySelectChange.emit(this.categoryDataSeletion);
            });
        }

        if (!this.emitSubCategoryChange) {
            this.emitSubCategoryChange = this.adminDataService.subCategoryChangeEvent().subscribe((subcategory: SubCategory) => {
                let foundsubCategory = this.subcategorySelection.find(itm => itm.id === subcategory.id);
                if (foundsubCategory) {
                    if (foundsubCategory.name !== subcategory.name) {
                        foundsubCategory.name = subcategory.name;
                    }
                } else {
                    this.subcategorySelection.push(new SelectionItem(subcategory.id, subcategory.name));
                }
                this.emitSubCategorySelectChange.emit(this.subcategorySelection);
            });
        }

        if (!this.emitTranlationChange) {
            this.emitTranlationChange = this.adminDataService.translationChangeEvent().subscribe((wordTranslation: WordTranslation) => {
                let foundtranslation = this.wordtranslationData.listTransation.find(itm => itm.id === wordTranslation.id);
                if (foundtranslation) {
                    if (foundtranslation.english !== wordTranslation.english) {
                        foundtranslation.english = wordTranslation.english;
                    }
                } else {
                    this.wordtranslationData.listTransation.push(wordTranslation);
                }
                this.emitTranlationSelectChange.emit(this.wordtranslationData);
            });
        }

        if (!this.emitCategoryDelete) {
            this.emitCategoryDelete = this.adminDataService.categoryDeleteEvent()
                .subscribe((categoryid: number) => {
                    let foundCategoryIndex = this.categoryDataSeletion.findIndex(itm => itm.id === categoryid);
                    if (foundCategoryIndex > -1) {
                        this.categoryDataSeletion.splice(foundCategoryIndex, 1);
                        this.emitCategorySelectChange.emit(this.categoryDataSeletion);
                    } 
            });
        }

        if (!this.emitSubCategoryDelete) {
            this.emitSubCategoryDelete = this.adminDataService.subcategoryDeleteEvent()
                .subscribe((subcategoryid: number) => {
                    let foundsubCategoryIndex = this.subcategorySelection.findIndex(itm => itm.id === subcategoryid);
                    if (foundsubCategoryIndex > -1) {
                        this.subcategorySelection.splice(foundsubCategoryIndex, 1);
                        this.emitSubCategorySelectChange.emit(this.subcategorySelection);
                    } 
                });
        }

        if (!this.emitTranlationDelete) {
            this.emitTranlationDelete = this.adminDataService.translationDeleteEvent()
                .subscribe((translationid: number) => {
                    let foundTransIndex = this.wordtranslationData.listTransation.findIndex(itm => itm.id === translationid);
                    if (foundTransIndex > -1) {
                        this.wordtranslationData.listTransation.splice(foundTransIndex, 1);
                        this.emitTranlationSelectChange.emit(this.wordtranslationData);
                    }
                });
        }
    }

    getCategorySelection() {
        return this.categoryDataSeletion;
    }

    getSubCategorySelection() {
        return this.subcategorySelection;
    }
} 