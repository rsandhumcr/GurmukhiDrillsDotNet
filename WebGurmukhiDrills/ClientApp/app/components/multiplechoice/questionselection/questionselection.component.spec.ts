/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { QuestionselectionComponent } from './questionselection.component';
import { Questions, Question } from "../../../services/multiplechoice/question.model";
import { MutiltpleChoiceTestData } from '../common/multiplechocie.testdata';

describe('Mulitple Choice selection component', () => {
    let fixture: ComponentFixture<QuestionselectionComponent>,
        component: QuestionselectionComponent,
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
                QuestionselectionComponent
            ],
            imports: [BrowserModule, FormsModule],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        fixture = TestBed.createComponent(QuestionselectionComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        component.questions = mockQuestionData;
    }));

    describe('initial display', () => {

        it('should show four buttons for each question', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let questionselectbtn = element.querySelectorAll('.questionselectbtn');
                expect(questionselectbtn.length).toEqual(4);
            });
        });

        it('should show one correct button class', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let questionselectbtn = element.querySelectorAll('.questionselectbtn.btn-success');
                expect(questionselectbtn.length).toEqual(1);
            });
        });

        it('should show one incorrect button class', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let questionselectbtn = element.querySelectorAll('.questionselectbtn.btn-danger');
                expect(questionselectbtn.length).toEqual(1);
            });
        });

        it('should show two unanwsered quesitons', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let questionselectbtn = element.querySelectorAll('.questionselectbtn.btn-primary');
                expect(questionselectbtn.length).toEqual(2);
            });
        });

        it('should have emit the correct event when onSetQuestion is called', (done) => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                component.setquestion.subscribe((q: Question) => {
                    expect(q).toEqual(mockQuestionData.listQuestion[1]);
                    done();
                });
                component.onSetQuestion(mockQuestionData.listQuestion[1], 1 );
            });
        });
    });
});