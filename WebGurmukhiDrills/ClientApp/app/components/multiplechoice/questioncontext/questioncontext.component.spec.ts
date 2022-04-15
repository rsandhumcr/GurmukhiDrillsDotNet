/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { QuestioncontextComponent } from './questioncontext.component';
import { Questions, Question } from "../../../services/multiplechoice/question.model";
import { MutiltpleChoiceTestData } from '../common/multiplechocie.testdata';
import { AudioService } from '../../../services/audio/audio.service';

describe('Mulitple Choice question context component', () => {
    let fixture: ComponentFixture<QuestioncontextComponent>,
        component: QuestioncontextComponent,
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
                QuestioncontextComponent
            ],
            imports: [BrowserModule, FormsModule],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true },
                { provide: AudioService, useValue: mockAudioservice}
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        fixture = TestBed.createComponent(QuestioncontextComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        component.layoutContexts = mockQuestionData.listQuestion[0].listAnwsers[0].listLayout;
        component.audiopath = 'audiopath';
        component.imagepath = 'imagepath';
    }));

    describe('initial display', () => {

        it('should show content text layout label correctly', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let context1label = <HTMLDivElement>element.querySelector('.context1label');
                expect(context1label.textContent).toEqual('labelone1');
            });
        });

        it('should show content text layout text correctly', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let context1text = <HTMLDivElement>element.querySelector('.context1text');
                expect(context1text.textContent).toEqual('contentone1');
            });
        });

        it('should show set content image source correctly', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let context3image = <HTMLImageElement>element.querySelector('.context3image');
                expect(context3image.src).toContain('imagepath/contentthree3');
            });
        });

        it('should show set content image source correctly', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let context4image = <HTMLImageElement>element.querySelector('.context4image');
                expect(context4image.src).toContain('imagepath/contentfour4');
            });
        });

        it('should show set large text source label correctly', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let context5label = <HTMLDivElement>element.querySelector('.context5label');
                expect(context5label.textContent).toContain('labelfive5');
            });
        });

        it('should show set large text source text correctly', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let context5text = <HTMLDivElement>element.querySelector('.context5text');
                expect(context5text.textContent).toContain('contentfive5');
            });
        });

        it('should show set default text source label correctly', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let contextdefaultlabel = <HTMLDivElement>element.querySelector('.contextdefaultlabel');
                expect(contextdefaultlabel.textContent).toContain('labelsix6');
            });
        });

        it('should show set default text source text correctly', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let contextdefaulttext = <HTMLDivElement>element.querySelector('.contextdefaulttext');
                expect(contextdefaulttext.textContent).toContain('contentsix6');
            });
        });

        it('should call the audio service when audio buttons are clicked', () => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                let playbutton = <HTMLButtonElement>element.querySelector('.playbtn');
                playbutton.click();
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(mockAudioservice.playAudioUrl).toHaveBeenCalledWith('audiopath/contenttwo2');
                });
            });
        });

    });
});