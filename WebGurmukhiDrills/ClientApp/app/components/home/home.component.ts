import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls : ['./home.component.css']
})
export class HomeComponent {

    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    onClickScrollToBottom() {
        this.scrollToBottom(); 
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }
}
