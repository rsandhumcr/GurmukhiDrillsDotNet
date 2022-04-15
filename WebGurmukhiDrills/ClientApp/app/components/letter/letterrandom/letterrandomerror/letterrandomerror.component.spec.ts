/// <reference path="../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';

import { LetterrandomerrorComponent } from './letterrandomerror.component';

let component: LetterrandomerrorComponent,
    fixture: ComponentFixture<LetterrandomerrorComponent>,
    element: HTMLElement;

describe('Letter random punjabi component', () => {
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [LetterrandomerrorComponent],
            imports: [BrowserModule, FormsModule],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(LetterrandomerrorComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        
    }));

    it('should show feedback with all correct and no errors when correct', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            component.currentTextInput = ['t', 'e', 's', 't'];
            component.wrongindex = [];
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let corretElements = element.querySelectorAll('.correcttext');
                let wrongElements = element.querySelectorAll('.wrongtext');
                expect(corretElements.length).toEqual(4);
                expect(wrongElements.length).toEqual(0);
            });
        });
    });

    it('should show feedback with some correct and some errors when two mismatch', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            component.currentTextInput = ['t', 'e', 's', 't'];
            component.wrongindex = [1,2];
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let corretElements = element.querySelectorAll('.correcttext');
                let wrongElements = element.querySelectorAll('.wrongtext');
                expect(corretElements.length).toEqual(2);
                expect(wrongElements.length).toEqual(2);
            });
        });
    });

    it('should show feedback with all errors when no mismatch', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            component.currentTextInput = ['t', 'e', 's', 't'];
            component.wrongindex = [0, 1, 2, 3];
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let corretElements = element.querySelectorAll('.correcttext');
                let wrongElements = element.querySelectorAll('.wrongtext');
                expect(corretElements.length).toEqual(0);
                expect(wrongElements.length).toEqual(4);
            });
        });
    });

});