import { Component, OnInit } from '@angular/core';
import { UsersecurityService } from '../../services/usersecurity/usersecurity.service';
import { UsersecurityModel } from '../../services/usersecurity/usersecurity.model';
import { ToastrService, MessageType } from "../../services/toastr/toastr.service";
import { LoggerService, LogLevelType } from "../../services/logger/logger.service";

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnInit {

    public usernameloggedin: string = '';
    public showAdmin: boolean = false;
    public showLogin: boolean = false;
    constructor(private toastrService: ToastrService, private loggerService: LoggerService,private usersecurityService: UsersecurityService) {}

    ngOnInit() {

        this.usersecurityService.getUserSecurity().subscribe((usersecdata: UsersecurityModel) => {
            if (usersecdata.loggedIn) {
                this.usernameloggedin = usersecdata.loggedInName;
                this.showAdmin = usersecdata.showAdmin;
                this.showLogin = usersecdata.showLogin;
                console.log('usersecdata', usersecdata);
            }
        },
            error => {
                this.loggerService.logJson(LogLevelType.Error, error.statusText, error);
                this.toastrService.postMessage(MessageType.Error, error.statusText);
            }
        );
    }
}
