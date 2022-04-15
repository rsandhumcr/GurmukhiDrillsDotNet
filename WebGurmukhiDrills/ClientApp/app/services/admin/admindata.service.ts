import { Injectable, EventEmitter } from "@angular/core";
import { ToastrService, MessageType } from "../toastr/toastr.service";
import { LoggerService, LogLevelType } from "../logger/logger.service";
import { Category, SubCategory, WordTranslation } from "../word/word.model";
import { WordService } from "../../services/word/word.service";

@Injectable()
export class AdminDataService {
    private categoryData: Category;
    private subcategoryData: SubCategory;
    private transtionData: WordTranslation;

    private emitCategoryChange = new EventEmitter<Category>();
    private emitSubCategoryChange = new EventEmitter<SubCategory>();
    private emitTranlationChange = new EventEmitter<WordTranslation>();

    private emitCategoryDelete = new EventEmitter<number>();
    private emitSubCategoryDelete = new EventEmitter<number>();
    private emitTranlationDelete = new EventEmitter<number>();

    constructor(private wordService: WordService, private toastrService: ToastrService, private loggerService: LoggerService) {
    }

    // Data
    categoryChangeEvent() {
        return this.emitCategoryChange;
    };

    subCategoryChangeEvent() {
        return this.emitSubCategoryChange;
    };

    translationChangeEvent() {
        return this.emitTranlationChange;
    };

    categoryDeleteEvent() {
        return this.emitCategoryDelete;
    };

    subcategoryDeleteEvent() {
        return this.emitSubCategoryDelete;
    };

    translationDeleteEvent() {
        return this.emitTranlationDelete;
    };

    // Category
    getCategoryItem(categoryId: number) {

        this.wordService.getWordCategory(categoryId)
            .subscribe(
            result => {
                this.categoryData = result;
                this.emitCategoryChange.emit(this.categoryData);
            },
            error => {
                this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                this.toastrService.postMessage(MessageType.Error, error.statusText);
            });
    }

    createCategoryItem(category: Category) {
        this.wordService.createWordCategory(category)
            .subscribe(
                result => {
                    this.categoryData = result;
                    this.emitCategoryChange.emit(this.categoryData);
                    this.toastrService.postMessage(MessageType.Success, "Created category '" + category.name + "'");
                },
                error => {
                    this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                    this.toastrService.postMessage(MessageType.Error, error.statusText);
                });        
    }

    updateCategoryItem(category: Category) {
        this.wordService.updateWordCategory(category)
            .subscribe(
                result => {
                    this.categoryData = result;
                    this.emitCategoryChange.emit(this.categoryData);
                    this.toastrService.postMessage(MessageType.Success, "Updated category '" + category.name + "'");
                },
                error => {
                    this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                    this.toastrService.postMessage(MessageType.Error, error.statusText);
                });
    }

    deleteCategoryItem(categoryId: number, name: string) {

        this.wordService.deleteWordCategory(categoryId)
            .subscribe(
                result => {
                    this.categoryData = new Category();
                    this.emitCategoryDelete.emit(categoryId);
                    this.toastrService.postMessage(MessageType.Info, "Deleted category '" + name + "'");
                },
                error => {
                    this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                    this.toastrService.postMessage(MessageType.Error, error.statusText);
                });
    }

    // SubCategory
    getSubCategoryItem(subcategoryId: number) {

        this.wordService.getWordSubCategory(subcategoryId)
            .subscribe(
            result => {
                this.subcategoryData = result;
                this.emitSubCategoryChange.emit(this.subcategoryData);
            },
            error => {
                this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                this.toastrService.postMessage(MessageType.Error, error.statusText);
            });
    }

    createSubCategoryItem(subcategory: SubCategory) {
        this.wordService.createWordSubCategory(subcategory)
            .subscribe(
                result => {
                    this.subcategoryData = result;
                    this.toastrService.postMessage(MessageType.Success, "Create subcategory '" + this.subcategoryData.name + "'");
                    this.emitSubCategoryChange.emit(this.subcategoryData);
                },
                error => {
                    this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                    this.toastrService.postMessage(MessageType.Error, error.statusText);
                });
    }

    updateSubCategoryItem(subcategory: SubCategory) {
        this.wordService.updateWordSubCategory(subcategory)
            .subscribe(
                result => {
                    this.subcategoryData = result;
                    this.toastrService.postMessage(MessageType.Success, "Updated subcategory '" + this.subcategoryData.name + "'");
                    this.emitSubCategoryChange.emit(this.subcategoryData);
                },
                error => {
                    this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                    this.toastrService.postMessage(MessageType.Error, error.statusText);
                });
    }

    deleteSubCategoryItem(subcategoryId: number, name: string) {

        this.wordService.deleteWordSubCategory(subcategoryId)
            .subscribe(
                result => {
                    this.subcategoryData = new SubCategory();
                    this.toastrService.postMessage(MessageType.Info, "Deleted subcategory '" + name + "'");
                    this.emitSubCategoryDelete.emit(subcategoryId);
                },
                error => {
                    this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                    this.toastrService.postMessage(MessageType.Error, error.statusText);
                });
    }

    // Translation
    getTranslationItem(translationId: number) {

        this.wordService.getWordTranslation(translationId)
            .subscribe(
            result => {
                this.transtionData = result;
                this.emitTranlationChange.emit(this.transtionData);
            },
            error => {
                this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                this.toastrService.postMessage(MessageType.Error, error.statusText);
            });
    }

    createTranslationItem(wordTranslation: WordTranslation) {
        this.wordService.createWordTranslation(wordTranslation)
            .subscribe(
                result => {
                    this.transtionData = result;
                    this.toastrService.postMessage(MessageType.Success, "Create wordTranslation '" + this.transtionData.english + "'");
                    this.emitTranlationChange.emit(this.transtionData);
                },
                error => {
                    this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                    this.toastrService.postMessage(MessageType.Error, error.statusText);
                });
    }

    updateTranslationItem(wordTranslation: WordTranslation) {
        this.wordService.updateWordTranslation(wordTranslation)
            .subscribe(
                result => {
                    this.transtionData = result;
                    this.toastrService.postMessage(MessageType.Success, "Updated wordTranslation '" + this.transtionData.english + "'");
                    this.emitTranlationChange.emit(this.transtionData);
                },
                error => {
                    this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                    this.toastrService.postMessage(MessageType.Error, error.statusText);
                });
    }

    deleteTranslationItem(translationId: number, name: string) {

        this.wordService.deleteWordTranslation(translationId)
            .subscribe(
                result => {
                    this.transtionData = new WordTranslation();
                    this.toastrService.postMessage(MessageType.Info, "Deleted translation '" + name + "'");
                    this.emitTranlationDelete.emit(translationId);
                },
                error => {
                    this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                    this.toastrService.postMessage(MessageType.Error, error.statusText);
                });
    }
}