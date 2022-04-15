import { Component, Input } from '@angular/core';
import { Category, SubCategory, WordTranslation } from '../../../services/word/word.model';
import { AdminDataService } from '../../../services/admin/admindata.service';

@Component({
    selector: 'app-deleteconfirm',
    templateUrl: './deleteconfirm.component.html',
    styleUrls: ['./deleteconfirm.component.css']
})

export class DeleteconfirmComponent {

    public categoryData: Category;
    public subCategoryData: SubCategory;
    public wordTranslationData: WordTranslation;
    public confirmdelete: boolean = false;
    public deletedRequestSent: boolean = false;
    public deleteType: string = '';
    public deleteName: string = '';
    public deleteId: number = 0;

    @Input('categoryData') set setcategoryData(value: Category) {
        this.categoryData = value;
        this.initalSettings();
    }
    
    @Input('subCategoryData') set setsubCategoryData(value: SubCategory) {
        this.subCategoryData = value;
        this.initalSettings();
    }
    

    @Input('wordTranslationData') set setwordTranslationData(value: WordTranslation) {
        this.wordTranslationData = value;
        this.initalSettings();
    }

    private initalSettings() {
        this.confirmdelete = false;
        this.deletedRequestSent = false;        
    }

    constructor(private adminDataService: AdminDataService) {
    }

    deleteentry() {
        if (this.categoryData.id > 0) {
            this.deleteType = "Category";
            this.deleteName = this.categoryData.name;
            this.deleteId = this.categoryData.id;
            this.adminDataService.deleteCategoryItem(this.categoryData.id, this.deleteName);
            
        }
        if (this.subCategoryData.id > 0) {
            this.deleteType = "SubCategory";
            this.deleteName = this.subCategoryData.name;
            this.deleteId = this.subCategoryData.id;
            this.adminDataService.deleteSubCategoryItem(this.subCategoryData.id, this.subCategoryData.name);
            
        }
        if (this.wordTranslationData.id > 0) {
            this.deleteType = "Translation";
            this.deleteName = this.wordTranslationData.english;
            this.deleteId = this.wordTranslationData.id;
            this.adminDataService.deleteTranslationItem(this.wordTranslationData.id, this.wordTranslationData.english);
        }
        this.deletedRequestSent = true;
    }
}