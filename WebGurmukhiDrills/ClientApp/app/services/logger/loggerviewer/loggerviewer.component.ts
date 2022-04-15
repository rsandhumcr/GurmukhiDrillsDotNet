import { Component, OnInit } from '@angular/core';
import { LoggerService, LogLevelType} from '../logger.service';

@Component({
    selector: 'app-loggerviewer',
    templateUrl: './loggerviewer.component.html',
    styleUrls: ['./loggerviewer.component.css']
})
/** loggerviewer component*/
export class LoggerviewerComponent implements OnInit
{
    public logLevelInt : number;
    /** loggerviewer ctor */
    constructor(public logger: LoggerService) {
        this.logLevelInt = +logger.logLevel;
    }

    /** Called by Angular after loggerviewer component initialized */
    ngOnInit(): void { }

    onClearLog() {
        this.logger.clearLog();
    }

    onLevelChange($event : any) {
        let loglevelInt = +$event.target.value;
        this.logger.setLogLevel(<LogLevelType>loglevelInt);
    }
}