import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Observable } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  peoples$: Observable<User[]>

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.peoples$ = this.homeService.getPeople();
  }

}
