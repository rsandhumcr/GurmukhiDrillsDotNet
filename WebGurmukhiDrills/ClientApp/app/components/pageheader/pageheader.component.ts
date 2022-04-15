import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-pageheader',
    templateUrl: './pageheader.component.html',
    styleUrls: ['./pageheader.component.css']
})

export class PageheaderComponent {
    @Input() showheader = true;
    constructor() {

    }
}