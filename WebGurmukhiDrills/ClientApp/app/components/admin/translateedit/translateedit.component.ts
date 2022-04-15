import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { WordTranslation } from "../../../services/word/word.model";
import { AdminDataService } from '../../../services/admin/admindata.service';
import { KeyboardData } from "../../../components/gurmkhikeyboard/gurmkhikeyboard.component";
import { SelectionItem } from '../../../services/word/word.model';
import { CustomValidators } from "../../word/common/CustomValidators/CustomValidators";
import { WordService } from '../../../services/word/word.service';
import { ToastrService, MessageType } from "../../../services/toastr/toastr.service";
import { LoggerService, LogLevelType } from "../../../services/logger/logger.service";

@Component({
    selector: 'app-translateedit',
    templateUrl: './translateedit.component.html',
    styleUrls: ['./translateedit.component.css']
})

export class TranslateeditComponent implements OnInit {

    public newMode: boolean = false;
    @Input('newMode')
    set setNewMode(value: boolean) {
        this.newMode = value;
        if (this.newMode && this.translationForm) {
            let newTranslation = new WordTranslation();
            newTranslation.orderNumber = 0;
            this.translationForm.reset(newTranslation);
        }
        this.requestSent = false;
    }

    public data: WordTranslation = new WordTranslation();
    @Input('data') set setdata(value: WordTranslation) {
        console.log('data has been set', value);
        this.data = value;
        this.requestSent = !(this.lastSent === undefined || this.data.english !== this.lastSent.english);
    }

    public translationForm: FormGroup;
    public translationId: FormControl;
    public subcategoryId: FormControl;

    public english: FormControl;
    public punjabi: FormControl;
    public character: FormControl;
    public equivalent: FormControl;
    public description: FormControl;

    public ordernumber: FormControl;
    public audioFileName: FormControl;
    public imageFileName: FormControl;
    public modifiedBy: FormControl;
    public modifiedOn: FormControl;
    public requestSent: boolean = false;
    private lastSent: WordTranslation;
    constructor(private formbuilder: FormBuilder, private adminDataService: AdminDataService,
        private wordService: WordService, private toastrService: ToastrService,
        private loggerService: LoggerService) {
        
    }

    ngOnInit() {
        this.initalControls();
    }

    initalControls() {
        this.english = new FormControl(this.data.english,
            [Validators.required,
            Validators.maxLength(250)]);

        this.punjabi = new FormControl(this.data.punjabi,
            [Validators.required,
                Validators.maxLength(250)]);

        this.character = new FormControl(this.data.character,
            [Validators.required,
                Validators.maxLength(250)]);

        this.equivalent = new FormControl(this.data.equivalent,
            [Validators.required,
                Validators.maxLength(250)]);

        this.description = new FormControl(this.data.description,
            [Validators.maxLength(250)]);

        this.ordernumber = new FormControl(this.data.orderNumber,
            [Validators.pattern(/\d+$/)]);

        this.imageFileName = new FormControl(this.data.imageFileName,
            [Validators.maxLength(250)]);

        this.audioFileName = new FormControl(this.data.audioFileName,
            [Validators.maxLength(250)]);

        this.subcategoryId = new FormControl(this.data.subCategoryId, [CustomValidators.selectionrequired]);

        this.translationId = new FormControl({ value: this.data.id, disabled: true });
        this.modifiedBy = new FormControl({ value: this.data.modifiedBy, disabled: true });
        this.modifiedOn = new FormControl({ value: this.data.modifiedOn, disabled: true });

        this.translationForm = this.formbuilder.group({
            translationId: this.translationId,
            subcategoryId: this.subcategoryId,
            english: this.english,
            punjabi: this.punjabi,
            character: this.character,
            equivalent: this.equivalent,
            description: this.description,
            ordernumber: this.ordernumber,
            audioFileName: this.audioFileName,
            imageFileName: this.imageFileName,
            modifiedBy: this.modifiedBy,
            modifiedOn: this.modifiedOn
        });

    }

    validateEnglishName(): boolean {
        return this.english.invalid || this.english.touched;
    }

    validatePunjabiName(): boolean {
        return this.punjabi.invalid || this.punjabi.touched;
    }

    validateCharacter(): boolean {
        return this.character.invalid || this.character.touched;
    }

    validateEquivalent(): boolean {
        return this.equivalent.invalid || this.equivalent.touched;
    }

    validateDescription(): boolean {
        return this.description.invalid || this.description.touched;
    }

    validateOrderNumber(): boolean {
        return this.ordernumber.invalid || this.ordernumber.touched;
    }

    validateAudioFilename(): boolean {
        return this.audioFileName.invalid || this.audioFileName.touched;
    }

    validateImageFileName(): boolean {
        return this.imageFileName.invalid || this.imageFileName.touched;
    }

    onTranslationCreate() {
        this.lastSent = this.createTranslationDto();
        this.lastSent.id = 0;
        this.adminDataService.createTranslationItem(this.lastSent);
        this.requestSent = true;
    }
    onTranslationUpdate() {
        this.lastSent = this.createTranslationDto();
        this.adminDataService.updateTranslationItem(this.lastSent);
        this.requestSent = true;
    }

    createTranslationDto() {
        let translation = new WordTranslation();
        translation.id = this.translationId.value;
        translation.subCategoryId = this.subcategoryId.value;
        translation.english = this.english.value;
        translation.punjabi = this.punjabi.value;
        translation.character = this.character.value;
        translation.equivalent = this.equivalent.value;
        translation.description = this.description.value;
        translation.orderNumber = this.ordernumber.value;
        translation.audioFileName = this.audioFileName.value;
        translation.imageFileName = this.imageFileName.value;
        if (!translation.orderNumber) {
            translation.orderNumber = 0;
        }
        return translation;
    }

    onPunjabiTextChange($event: KeyboardData) {
        this.punjabi.setValue($event.text);
    }

    onDescriptionTextChange($event: KeyboardData) {
        this.description.setValue($event.text);
    }

    onCateogryselected($event: SelectionItem) {
    }

    onSubcateogryselected($event: SelectionItem) {
        console.log('onSubcateogryselected $event', $event);
        this.subcategoryId.setValue($event.id);
    }

    onClickTranslation() {
        this.wordService.getWordTranslated(this.punjabi.value)
            .subscribe(
            result => {
                this.character.setValue(result.character) ;
                this.equivalent.setValue(result.equivalent);
            },
                error => {
                    this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                    this.toastrService.postMessage(MessageType.Error, error.statusText);
                });
    }
}
