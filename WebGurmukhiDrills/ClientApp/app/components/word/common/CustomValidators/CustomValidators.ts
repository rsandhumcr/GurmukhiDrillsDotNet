import { FormControl, Validators } from '@angular/forms';

export class CustomValidators extends Validators {

    static selectionrequired(control: FormControl) {
        if (Number(control.value) < 1) {
            return { selectionrequired: true };
        } else {
            return null;
        }
    }
}