import { Injectable } from '@angular/core';
import { ToasterService, Toast } from 'angular2-toaster';

@Injectable()
export class ToastrService {

    constructor(private toasterService: ToasterService) {
        
    }

    postMessage(messageType: MessageType, message: string, title?: string, showclosebtn?: boolean) {
        let typeString = "Info";

        switch (messageType) {
            case MessageType.Success:
                typeString = "success";
                break;
            case MessageType.Error:
                typeString = "error";
                break;
            case MessageType.Info:
                typeString = "info";
                break;
            case MessageType.Warning:
                typeString = "warning";
                break;
        }

        if (message == '' && messageType === MessageType.Error) {
            message = "No error message, may have lost connection to server.";
        }

        let toast: Toast = {
            type: typeString,
            title: title,
            body: message,
            showCloseButton:  showclosebtn
        };
        this.toasterService.pop(toast);
    }

    clearMessages() {
        this.toasterService.clear();
    }
}

export enum MessageType {
    Success,
    Error,
    Info,
    Warning
}