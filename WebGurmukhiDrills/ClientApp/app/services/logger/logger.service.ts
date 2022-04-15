import {Injectable} from '@angular/core';

@Injectable()
export class LoggerService {
    public loggedData: LogData[];
    public logLevel: LogLevelType;

    constructor() {
        this.loggedData = [];
        this.logLevel = LogLevelType.Debug;
    }

    logJson(loglevel: LogLevelType, msg : string,obj: object) {
        this.log(loglevel, msg, JSON.stringify(obj));
    }

    log(loglevel: LogLevelType, ...msg: string[]) {
        if (this.logLevel > LogLevelType.Off) {
            if (this.logLevel <= loglevel) {
                let logleveldesc = "";

                switch (loglevel) {
                case LogLevelType.Success:
                    logleveldesc = "Success";
                    break;
                case LogLevelType.Debug:
                    logleveldesc = "Debug";
                    break;
                case LogLevelType.Error:
                        logleveldesc = "Error";
                        console.log(loglevel, logleveldesc, msg);
                    break;
                case LogLevelType.Info:
                    logleveldesc = "Info";
                    break;
                case LogLevelType.Warning:
                    logleveldesc = "Warning";
                    break;
                }

                if (msg[0] == '' && loglevel === LogLevelType.Error) {
                    msg[0] = "No error message, may have lost connection to server.";
                }

                let currentDate = new Date();
                this.loggedData.unshift(new LogData(currentDate, loglevel, logleveldesc, msg));
            }
        }
    }


    setLogLevel(loglevel: LogLevelType) {
        this.logLevel = loglevel;
    }

    clearLog() {
        this.loggedData = [];
    }
}

export class LogData {
    constructor(public date: Date, public loglevel: LogLevelType, public logleveldesc: string, public messges: string[]) {
    }
}

export enum LogLevelType {
    Off = 0,
    Debug,
    Info,
    Success,
    Warning,
    Error
}