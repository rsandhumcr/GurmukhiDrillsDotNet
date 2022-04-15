/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { QuestionComponent } from './question.component';
import { QuestioncontextComponent } from '../questioncontext/questioncontext.component';
import { QuestionselectionComponent } from '../questionselection/questionselection.component';

import { Questions } from "../../../services/multiplechoice/question.model";
import { MutiltpleChoiceTestData } from '../common/multiplechocie.testdata';
import { ToastrService, MessageType } from '../../../services/toastr/toastr.service';
import { AudioService } from '../../../services/audio/audio.service';

describe('Mulitple choice question component', () => {
    let fixture: ComponentFixture<QuestionComponent>,
        component: QuestionComponent,
        element: HTMLElement,
        mockQuestionData: Questions,
        mockToastrService: any,
        mockAudioservice: any;

    beforeEach(async(() => {

        mockToastrService = {};
        mockToastrService = jasmine.createSpyObj('mockToastrService', ['postMessage', 'clearMessages']);

        mockAudioservice = {};
        mockAudioservice = jasmine.createSpyObj('mockAudioservice', ['playAudioUrl', 'playFiles']);

        // Create question data.
        let mockdata = new MutiltpleChoiceTestData();
        mockQuestionData = mockdata.generateQuestionsTestData();

        TestBed.configureTestingModule({
            declarations: [
                QuestionComponent,
                QuestioncontextComponent,
                QuestionselectionComponent
            ],
            imports: [BrowserModule, FormsModule],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true },
                { provide: ToastrService, useValue: mockToastrService },
                { provide: AudioService, useValue: mockAudioservice} 
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        fixture = TestBed.createComponent(QuestionComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        component.question = mockQuestionData.listQuestion[1];
        component.questionindex = 2;
    }));

    describe('initial display', () => {

        it('should show the correct question number', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let multiquestionlabel = <HTMLDivElement> element.querySelector('.multiquestionlabel');
                expect(multiquestionlabel.textContent).toContain('Question 2');
            });
        });

        it('should show the correct number of anwser buttons', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let multiquestionlabel = element.querySelectorAll('.optionbtn');
                expect(multiquestionlabel.length).toEqual(mockQuestionData.listQuestion[1].listAnwsers.length);
            });
        });

        it('should have emit the correct event when onSetQuestion is called', (done) => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let nextquestbtn = <HTMLButtonElement>element.querySelector('.nextquestbtn');
                component.nextQuestion.subscribe( () => {
                    expect(true).toEqual(true);
                    done();
                });
                nextquestbtn.click();
            });
        });

        it('should have emit the correct event when correct via onSetQuestion is called', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let optionbtn = element.querySelectorAll('.optionbtn');
                let firstbtn = <HTMLButtonElement>optionbtn[0];
                firstbtn.click();
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(mockToastrService.postMessage).toHaveBeenCalledWith(MessageType.Success, "Correct answer one1");
                });
            });
        });

        it('should have emit the correct event when wrong question via onSetQuestion is called', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let optionbtn = element.querySelectorAll('.optionbtn');
                let firstbtn = <HTMLButtonElement>optionbtn[1];
                firstbtn.click();
                expect(mockToastrService.postMessage).toHaveBeenCalledWith(MessageType.Warning, "Wrong, the answer was one1");
            });
        });

    });
});