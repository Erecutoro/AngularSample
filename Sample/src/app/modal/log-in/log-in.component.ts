import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {

  constructor(
    private alert: AlertController,
    private http: HttpClient,
    ) { }
    
  async logIn() {
    const alert = await this.alert.create({
      cssClass: 'modal',
      header: 'Log in',
      inputs: [
        {
          name: "username",
          type: 'text',
          placeholder: 'Username',
        }, 
        {
          name: "password",
          type: 'password',
          placeholder: 'Password',
        }
      ],
      buttons: [ {
        text: 'Cancel',
      },
      {
        text: 'Log in',
        handler: newVal => {
          if (newVal.username != environment.SuperUser || newVal.password != environment.SuperPassword)
            return;
          this.http.post<any>("http://localhost:3000/users", { username: newVal.username, password: newVal.password }).subscribe( () => {
            localStorage.setItem("loggedIn", "true");
            window.location.reload();
          });
        }
      }
     ]
    });
    await alert.present();
  }


  ngOnInit() {}

}
