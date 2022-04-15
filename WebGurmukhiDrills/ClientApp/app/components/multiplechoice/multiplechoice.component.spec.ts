/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { MultiplechoiceComponent } from './multiplechoice.component';
import { QuestionComponent } from './question/question.component';
import { QuestioncontextComponent } from './questioncontext/questioncontext.component';
import { QuestionselectionComponent } from './questionselection/questionselection.component';
import { Questions } from "../../services/multiplechoice/question.model";
import { ToastrService } from '../../services/toastr/toastr.service';
import { AudioService } from '../../services/audio/audio.service';
import { MutiltpleChoiceTestData } from './common/multiplechocie.testdata';

describe('Mulitple Choice component', () => {
    let fixture: ComponentFixture<MultiplechoiceComponent>,
        component: MultiplechoiceComponent,
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
                QuestionselectionComponent,
                MultiplechoiceComponent
            ],
            imports: [BrowserModule, FormsModule],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true },
                { provide: ToastrService, useValue: mockToastrService },
                { provide: AudioService, useValue: mockAudioservice }
                
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        fixture = TestBed.createComponent(MultiplechoiceComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        component.audiopath = mockQuestionData.audioPrefix;
        component.imagepath = mockQuestionData.imagePrefix;
        component.questions = mockQuestionData;
    }));

    describe('display', () => {

        it('should show header with question description', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let questiondescription =<HTMLHeadElement>element.querySelector('.questiondescription');
                expect(questiondescription.textContent).toContain('question description');
            });
        });

        it('should set current question via the onSetQuestion method', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                component.onSetQuestion(mockQuestionData.listQuestion[0]);
                expect(component.selectedQuestion.index).toEqual(0);
            });
        });

        it('should select next question via the onClickNextQuestion method', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                component.onSetQuestion(mockQuestionData.listQuestion[1]);
                component.onClickNextQuestion();
                expect(component.selectedQuestion.index).toEqual(2);
            });
        });
    });
});