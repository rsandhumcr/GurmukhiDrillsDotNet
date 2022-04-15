/// <reference path="../../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';

import { LetterrandomenglishComponent } from './letterrandomenglish.component';
import { RandomQuestion } from '../../../../services/randomletter/randomletter.model';
import { RandomletterService } from '../../../../services/randomletter/randomletter.service'; //RandomletterService
import { ToastrService, MessageType   } from '../../../../services/toastr/toastr.service';
import { CreateRandomLetterTestData } from '../common/letterrandom.testdata';
import { LetterrandomerrorComponent } from '../../../../components/letter/letterrandom/letterrandomerror/letterrandomerror.component';

let component: LetterrandomenglishComponent,
    fixture: ComponentFixture<LetterrandomenglishComponent>,
    randomQuestionMockData: RandomQuestion[],
    randomletterServicemock: any,
    mockToastrService: any,
    element: HTMLElement;

describe('Letter random english component', () => {
    beforeEach(async(() => {

        mockToastrService = {};
        mockToastrService = jasmine.createSpyObj('mockToastrService', ['postMessage', 'clearMessages']);

        randomletterServicemock = {}
        randomletterServicemock = jasmine.createSpyObj('mockToastrService', ['compareString']);

        let randomLetterTestData = new CreateRandomLetterTestData();
        randomQuestionMockData = randomLetterTestData.generateRandomLetterMockData().questions;

        TestBed.configureTestingModule({
            declarations: [
                LetterrandomenglishComponent,
                LetterrandomerrorComponent],
            imports: [BrowserModule, FormsModule],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true },
                { provide: RandomletterService, useValue: randomletterServicemock },
                { provide: ToastrService, useValue: mockToastrService}
            ]
        });
        fixture = TestBed.createComponent(LetterrandomenglishComponent);
        component = fixture.componentInstance;
        component.randomQuestion = randomQuestionMockData[0];
        element = fixture.nativeElement;
    }));

    it('should add to feedback when input does not match anwser', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            randomletterServicemock.compareString.and.returnValue([1, 2]);
            let currentfeedlength = component.randomQuestion.feedback.length;
            component.onTextChange("test");
            let newfeedlength = component.randomQuestion.feedback.length;
            expect(newfeedlength).toBe(currentfeedlength + 1);
            expect(component.randomQuestion.feedback[0]).toBe('test incorrect at index 1,2');
        });
    });

    it('should not change feedback when input does not match anwser', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            randomletterServicemock.compareString.and.returnValue([]);
            let currentfeedlength = component.randomQuestion.feedback.length;
            component.onTextChange("xxxx");
            let newfeedlength = component.randomQuestion.feedback.length;
            expect(newfeedlength).toBe(currentfeedlength);
        });
    });

    it('should add match feedback when input matches anwser', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            randomletterServicemock.compareString.and.returnValue([]);
            let currentfeedlength = component.randomQuestion.feedback.length;
            component.onTextChange("english1");
            let newfeedlength = component.randomQuestion.feedback.length;
            expect(newfeedlength).toBe(currentfeedlength + 1);
            expect(component.randomQuestion.feedback[0]).toBe('Matched english1');
        });
    });

    it('should call toaster when input matches anwser', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            randomletterServicemock.compareString.and.returnValue([]);
            component.onTextChange("english1");
            expect(mockToastrService.postMessage).toHaveBeenCalledWith(MessageType.Success, "Matched english1");
        });
    });

    it('should show punjabi section only when input matches anwser', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            let punjabianwsersection = element.querySelector('.englishanwser');
            expect(punjabianwsersection).toBeFalsy();
            randomletterServicemock.compareString.and.returnValue([]);
            component.onTextChange("english1");
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let punjabianwsersection = element.querySelector('.englishanwser');
                expect(punjabianwsersection).toBeTruthy();
            });
        });
    });

    //it('should have emit the correct event when onClickResetQuestion is called', (done) => {
    //    fixture.detectChanges();
    //    fixture.whenStable().then(() => {
    //        component.resetquestions.subscribe(() => {
    //            expect(true).toEqual(true);
    //            done();
    //        });
    //        component.onClickResetQuestion();
    //    });
    //});
});