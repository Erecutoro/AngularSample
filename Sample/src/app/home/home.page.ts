import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DelUserComponent } from '../modal/del-user/del-user.component';
import { AlertController } from '@ionic/angular';
import { EditUserComponent } from '../modal/edit-user/edit-user.component';

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
  }

  async deleteUser(id : number) {
    let alert = new DelUserComponent(this.alert, this.http);
    await alert.deleteUser(id);
  }

  async edit(i : any) {
    let alert = new EditUserComponent(this.alert, this.http);
    await alert.editUser(i);
  }

  ngOnInit() {
    this.checkLog();
    this.http.get<any>("http://localhost:3000/employees").subscribe(data => {
      this.obj = data;
      console.log(this.obj);
    });
  }
}
