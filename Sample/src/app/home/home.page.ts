import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  constructor(private http: HttpClient, private route : Router) {}
  obj = [];
  log = "log-in";
  user = "user";

  doRefresh(event) {
    this.http.get<any>("http://localhost:3000/employees").subscribe(data => {
      this.obj = data;
      console.log(this.obj);
      event.target.complete();
    });
    setTimeout(() => {
      event.target.complete();
      console.log('Async operation has ended');
    }, 2000);
  }

  checkLog() {
    localStorage.getItem("loggedIn") == "true" ? this.log = "log-out" : this.log = "log-in";
  }

  edit(i : any) {
    this.route.navigate(['/register', {first_name: i.first_name, last_name: i.last_name, email: i.email, id: i.id}]);
  }

  ngOnInit() {
    this.checkLog();
    this.http.get<any>("http://localhost:3000/employees").subscribe(data => {
      this.obj = data;
      console.log(this.obj);
    });
  }
}
