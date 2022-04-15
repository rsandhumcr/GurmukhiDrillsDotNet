import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ToasterModule } from 'angular2-toaster';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { UtilityService} from './services/utility/utility.service';
import { AudioService } from './services/audio/audio.service';
import { LoggerService } from './services/logger/logger.service';
import { ToastrService } from './services/toastr/toastr.service';

import { WordService } from './services/word/word.service';
import { AdminSelectionService } from './services/admin/adminselection.service';
import { AdminDataService } from './services/admin/admindata.service';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';

import { LetterBoardComponent } from './components/letter/letterboard/letterboard.component';
import { LetterService } from './services/letter/letter.service';
import { LettersliderComponent } from './components/letter/letterslider/letterslider.component';
import { LetterSliderMenuComponent } from './components/letter/letterslider/letterslidermenu.component';
import { LettergroupselectionComponent } from './components/letter/common/lettergroupselection/lettergroupselection.component';
import { LettergroupselectionlistComponent } from './components/letter/lettergroupselectionlist/lettergroupselectionlist.component';
import { LoggerviewerComponent } from './services/logger/loggerviewer/loggerviewer.Component';
import { TestbedComponent } from './components/testbed/testbed.component';
import { MultiplechoiceService } from './services/multiplechoice/multiplechoice.service';
import { MultiplechoiceComponent } from './components/multiplechoice/multiplechoice.component';
import { QuestionselectionComponent } from './components/multiplechoice/questionselection/questionselection.component';
import { QuestionComponent } from './components/multiplechoice/question/question.component';
import { QuestioncontextComponent } from './components/multiplechoice/questioncontext/questioncontext.component';

import { GurmkhikeyboardComponent } from './components/gurmkhikeyboard/gurmkhikeyboard.component';
import { LettermultiplechoiceComponent } from './components/letter/lettermultiplechoice/lettermultiplechoice.component';
import { LetterrandomComponent } from './components/letter/letterrandom/letterrandom.component';
import { RandomletterService } from './services/randomletter/randomletter.service';
import { LetterrandomselectionComponent } from './components/letter/letterrandom/letterrandomselection/letterrandomselection.component';
import { LetterrandompunjabiComponent } from './components/letter/letterrandom/letterrandompunjabi/letterrandompunjabi.component';
import { LetterrandomerrorComponent } from './components/letter/letterrandom/letterrandomerror/letterrandomerror.component';
import { LetterrandomenglishComponent } from './components/letter/letterrandom/letterrandomenglish/letterrandomenglish.component';

import { CategoryselectComponent} from './components/word/common/categoryselect/categoryselect.component';
import { WordlistComponent } from './components/word/wordlist/wordlist.component';
import { WordslideComponent } from './components/word/wordslide/wordslide.component';
import { WordmultiplechoiceComponent } from './components/word/wordmultiplechoice/wordmultiplechoice.component';
import { UserlogComponent } from './components/userlog/userlog.component';
import { WordmatchComponent } from './components/word/wordmatch/wordmatch.component';
import { AdminComponent } from './components/admin/admin.component';
import { WordselectionComponent } from './components/admin/wordselection/wordselection.component';
import { PageheaderComponent } from './components/pageheader/pageheader.component';
import { CategoryeditComponent } from './components/admin/categoryedit/categoryedit.component';
import { SubcategoryeditComponent } from './components/admin/subcategoryedit/subcategoryedit.component';
import { TranslateeditComponent } from './components/admin/translateedit/translateedit.component';
import { EditselectorComponent } from './components/admin/editselector/editselector.component';
import { DeleteconfirmComponent } from './components/admin/deleteconfirm/deleteconfirm.component';
import { UsersecurityService } from './services/usersecurity/usersecurity.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        LettergroupselectionComponent,
        LetterBoardComponent,
        LetterSliderMenuComponent,
        LettersliderComponent,
        LettergroupselectionlistComponent,
        LoggerviewerComponent,
        TestbedComponent,
        MultiplechoiceComponent,
        QuestionselectionComponent,
        QuestionComponent,
        QuestioncontextComponent,
        GurmkhikeyboardComponent,
        LettermultiplechoiceComponent,
        LetterrandomComponent,
        LetterrandomselectionComponent,
        LetterrandompunjabiComponent,
        LetterrandomerrorComponent,
        LetterrandomenglishComponent,
        WordlistComponent,
        WordslideComponent,
        CategoryselectComponent,
        WordmultiplechoiceComponent,
        UserlogComponent,
        WordmatchComponent,
        AdminComponent,
        WordselectionComponent,
        PageheaderComponent,
        CategoryeditComponent,
        SubcategoryeditComponent,
        TranslateeditComponent,
        EditselectorComponent,
        DeleteconfirmComponent
    ],
    providers: [UtilityService,
        LetterService,
        MultiplechoiceService,
        RandomletterService,
        AudioService,
        LoggerService,
        ToastrService,
        WordService,
        AdminSelectionService,
        AdminDataService,
        UsersecurityService],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        CarouselModule.forRoot(),
        ToasterModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'letter', component: LetterBoardComponent },
            { path: 'letterslider/:id', component: LettersliderComponent },
            { path: 'lettergroup', component: LettergroupselectionlistComponent },
            { path: 'lettermultiplechoice', component: LettermultiplechoiceComponent },
            { path: 'letterrandom', component: LetterrandomComponent },
            { path: 'wordlist', component: WordlistComponent },
            { path: 'wordslide', component: WordslideComponent },
            { path: 'wordmultiplechoice', component: WordmultiplechoiceComponent },
            { path: 'wordmatch', component: WordmatchComponent },
            { path: 'userlog', component: UserlogComponent },
            { path: 'admin', component: AdminComponent },
            { path: 'testbed', component: TestbedComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
    
})
export class AppModuleShared {
}
