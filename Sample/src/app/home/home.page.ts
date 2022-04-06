import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { DelUserComponent } from '../modal/del-user/del-user.component';
import { EditUserComponent } from '../modal/edit-user/edit-user.component';
import { LogInComponent } from '../modal/log-in/log-in.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  constructor(private http: HttpClient, private route : Router, private alert : AlertController) {}

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
    return localStorage.getItem("loggedIn") == "true";
  }

  logIn() {
    let alert = new LogInComponent(this.alert, this.http);
    alert.logIn();
    this.checkLog();
  }

  logOut() {
    localStorage.setItem("loggedIn", "false");
    this.checkLog();
    window.location.reload();
  }
  
  async deleteUser(id : number) {
    let alert = new DelUserComponent(this.alert, this.http);

    if (this.checkLog())
      await alert.deleteUser(id);
  }

  async edit(user : any) {
    let alert = new EditUserComponent(this.alert, this.http);

    if (this.checkLog())
      await alert.editUser(user);
  }

  ngOnInit() {
    this.checkLog();
    this.http.get<any>("http://localhost:3000/employees").subscribe(data => {
      this.obj = data;
      console.log(this.obj);
    });
  }
}
