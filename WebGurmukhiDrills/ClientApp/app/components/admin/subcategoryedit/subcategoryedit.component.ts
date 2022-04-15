import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SubCategory, SelectionItem } from "../../../services/word/word.model";
import { AdminSelectionService  } from '../../../services/admin/adminselection.service';
import { AdminDataService } from '../../../services/admin/admindata.service';
import { CustomValidators } from "../../word/common/CustomValidators/CustomValidators";

@Component({
    selector: 'app-subcategoryedit',
    templateUrl: './subcategoryedit.component.html',
    styleUrls: ['./subcategoryedit.component.css']
})

export class SubcategoryeditComponent implements OnInit {
    public newMode: boolean = false;
    @Input('newMode')
    set setNewMode(value: boolean) {
        this.newMode = value;
    }
    public data: SubCategory = new SubCategory();

    @Input('data') set setData(value: SubCategory) {
        console.log('set data', value);
        this.data = value;
    }

    public subcategoryForm: FormGroup;
    public categoryId: FormControl;
    public subcategoryId: FormControl;
    public subcategoryname: FormControl;
    public ordernumber: FormControl;
    public urlpath: FormControl;
    public modifiedBy: FormControl;
    public modifiedOn: FormControl;
    public requestSent: boolean = false;
    public categorySelection: SelectionItem[];

    constructor(private formbuilder: FormBuilder, private adminDataService: AdminDataService, private adminSelectionService: AdminSelectionService) {
        this.initalControls();
    }

    ngOnInit() {
        this.categorySelection = this.adminSelectionService.getCategorySelection();
        console.log('this.categorySelection', this.categorySelection);
        this.initalControls();
    }

    initalControls() {
        console.log('this.data', this.data);
        console.log('this.data.categoryId', this.data.categoryId);
        this.subcategoryname = new FormControl(this.data.name,
            [Validators.required,
                Validators.minLength(3),
                Validators.maxLength(250)]);

        this.ordernumber = new FormControl(this.data.orderNumber,
                [Validators.required,
                Validators.pattern(/\d+$/)
            ]);

        this.urlpath = new FormControl(this.data.url,
            [Validators.required,
                Validators.minLength(3),
                Validators.maxLength(250)]);

        this.categoryId = new FormControl(
            this.data.categoryId,
            [CustomValidators.selectionrequired]
        );

        this.subcategoryId = new FormControl({ value: this.data.id, disabled: true });

        this.modifiedBy = new FormControl({ value: this.data.modifiedBy, disabled: true });

        this.modifiedOn = new FormControl({ value: this.data.modifiedOn, disabled: true });

        this.subcategoryForm = this.formbuilder.group({
            categoryId: this.categoryId,
            subcategoryId: this.subcategoryId,
            subcategoryname: this.subcategoryname,
            ordernumber: this.ordernumber,
            urlpath: this.urlpath,
            modifiedby: this.modifiedBy,
            modifiedon: this.modifiedOn
        });

    }

    validateSubCategoryName(): boolean {
        return this.subcategoryname.invalid || this.subcategoryname.touched;
    }

    validateOrderNumber(): boolean {
        return this.ordernumber.invalid || this.ordernumber.touched;
    }

    validateUrl(): boolean {
        return this.urlpath.invalid || this.urlpath.touched;
    }

    onSubCategoryCreate() {
        var local = this.getUpdateData();
        local.id = 0;
        this.requestSent = true;
        this.adminDataService.createSubCategoryItem(local);
    }

    onSubCategoryUpdate() {
        var local = this.getUpdateData();
        this.requestSent = true;
        this.adminDataService.updateSubCategoryItem(local);
    }

    getUpdateData() {
        var localdata = new SubCategory();
        localdata.id = this.subcategoryId.value;
        localdata.categoryId = this.categoryId.value;
        localdata.name = this.subcategoryname.value;
        localdata.orderNumber = this.ordernumber.value;
        localdata.url = this.urlpath.value;
        return localdata;
    }
}
