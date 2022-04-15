import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Category } from "../../../services/word/word.model";
import { AdminDataService } from '../../../services/admin/admindata.service';
import { AdminSelectionService } from '../../../services/admin/adminselection.service';

@Component({
    selector: 'app-categoryedit',
    templateUrl: './categoryedit.component.html',
    styleUrls: ['./categoryedit.component.css'],
})

export class CategoryeditComponent implements OnInit {

    public newMode: boolean = false;
    @Input('newMode')
    set setNewMode(value: boolean) {
        this.newMode = value;
        if (this.newMode && this.categoryForm) {
            this.categoryForm.reset(new Category());
        }
        this.requestSent = false;
    }

    private data: Category = new Category();

    @Input('data') set setdata(value: Category) {
        this.data = value;
    }
    public categoryForm: FormGroup;
    public categoryName: FormControl;
    public categoryId : FormControl;
    public modifiedBy: FormControl;
    public modifiedOn: FormControl;
    public requestSent: boolean= false;
    
    constructor(private formbuilder: FormBuilder, private adminDataService: AdminDataService, private adminSelectionService: AdminSelectionService) {
        
    }

    ngOnInit() {
        this.initalControls();
    }

    initalControls() {
        this.categoryName = new FormControl(this.data.name,
            [Validators.required,
                Validators.minLength(3),
                Validators.maxLength(250)]);

        this.categoryId = new FormControl({ value: this.data.id, disabled: true });
        this.modifiedBy = new FormControl({ value: this.data.modifiedBy, disabled: true });
        this.modifiedOn = new FormControl({ value: this.data.modifiedOn, disabled: true });

        this.categoryForm = this.formbuilder.group({

            categoryName: this.categoryName,
            categoryId: this.categoryId,
            modifiedBy: this.modifiedBy,
            modifiedOn: this.modifiedOn
        });

    }

    validateCategoryName(): boolean {
        return this.categoryName.invalid || this.categoryName.touched;
    }

    onCreateCategory() {
        var dto = new Category();
        dto.name = this.categoryName.value;
        dto.id = 0;
        this.adminDataService.createCategoryItem(dto);
        this.requestSent = true;
    }

    onUpdateCategory() {
        var dto = new Category();
        dto.name = this.categoryName.value;
        dto.id = this.categoryId.value;
        dto.modifiedBy = this.modifiedBy.value;
        dto.modifiedOn = this.modifiedOn.value;
        this.adminDataService.updateCategoryItem(dto);
        this.requestSent = true;
    }
}
