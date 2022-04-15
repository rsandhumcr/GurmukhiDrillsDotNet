import {Component} from '@angular/core';

@Component({
    selector: 'letter-slider-menu',
    template: `
<nav class="navbar navbar-inverse">
    <div class="container-fluid">
        <ul class="nav navbar-nav">
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Rows<span class="caret"></span></a>
                <ul class="dropdown-menu">
                    <li><a [routerLink]="['/letterslider/0']">All</a></li>
                    <li><a [routerLink]="['/letterslider/1']">Row 1</a></li>
                    <li><a [routerLink]="['/letterslider/2']">Row 2</a></li>
                    <li><a [routerLink]="['/letterslider/3']">Row 3</a></li>
                    <li><a [routerLink]="['/letterslider/4']">Row 4</a></li>
                    <li><a [routerLink]="['/letterslider/5']">Row 5</a></li>
                    <li><a [routerLink]="['/letterslider/6']">Row 6</a></li>
                    <li><a [routerLink]="['/letterslider/7']">Row 7</a></li>
                    <li><a [routerLink]="['/letterslider/8']">Row 8</a></li>
                </ul>
            </li>
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Groups<span class="caret"></span></a>
                <ul class="dropdown-menu">
                    <li><a [routerLink]="['/letterslider/9']">Voiceless Unaspirated</a></li>
                    <li><a [routerLink]="['/letterslider/10']">Voiceless Aspirated</a></li>
                    <li><a [routerLink]="['/letterslider/11']">Voiced Unaspirated</a></li>
                    <li><a [routerLink]="['/letterslider/12']">Voiced Aspirated</a></li>
                    <li><a [routerLink]="['/letterslider/13']">Nasal</a></li>
                    <li><a [routerLink]="['/letterslider/24']">Vowels Join Carriers</a></li>
                    <li><a [routerLink]="['/letterslider/25']">Vowels</a></li>
                </ul>
            </li>
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Sangat<span class="caret"></span></a>
                <ul class="dropdown-menu">
                    <li><a [routerLink]="['/letterslider/14']">Sangat Lesson 01</a></li>
                    <li><a [routerLink]="['/letterslider/15']">Sangat Lesson 02</a></li>
                    <li><a [routerLink]="['/letterslider/16']">Sangat Lesson 03</a></li>
                    <li><a [routerLink]="['/letterslider/17']">Sangat Lesson 04</a></li>
                    <li><a [routerLink]="['/letterslider/18']">Sangat Lesson 05</a></li>
                    <li><a [routerLink]="['/letterslider/19']">Sangat Lesson 06</a></li>
                    <li><a [routerLink]="['/letterslider/20']">Sangat Lesson 07</a></li>
                    <li><a [routerLink]="['/letterslider/21']">Sangat Lesson 08</a></li>
                    <li><a [routerLink]="['/letterslider/22']">Sangat Lesson 09</a></li>
                    <li><a [routerLink]="['/letterslider/23']">Sangat Lesson 10</a></li>
                </ul>
            </li>
        </ul>
    </div>
</nav>
`
})
export class LetterSliderMenuComponent {
}