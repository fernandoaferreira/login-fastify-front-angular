import { Component } from '@angular/core';
import { UserService } from './auth/user.service';
import { Observable } from 'rxjs';
import { User } from './auth/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  autheticated$: Observable<Boolean>;
  user$: Observable<User>

  constructor(private userService: UserService,
    private route: Router) {
    this.autheticated$ = this.userService.isAuthenticated();
    this.user$ = this.userService.getUser();
  }

  logout() {
    this.userService.logout();
    this.route.navigateByUrl('/auth/login')
  }
};
