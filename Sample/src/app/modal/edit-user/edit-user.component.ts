import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {

  constructor(
    private alert: AlertController,
    private http: HttpClient,
  ) { }

  async editUser(user: any) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Edit',
      inputs: [
        {
          name: "first_name",
          type: 'text',
          placeholder: 'First name',
          value: user.first_name,
        }, 
        {
          name: "last_name",
          type: 'text',
          placeholder: 'Last name',
          value: user.last_name,
        },
        {
          name: "email",
          type: 'email',
          placeholder: 'Email',
          value: user.email,
        }
      ],
      buttons: [ {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: newVal => {
          this.http.get<any>("http://localhost:3000/employees/"+ user.id).subscribe( data => {
            if (newVal.first_name == data.first_name && newVal.last_name == data.last_name && newVal.email == data.email) {
              console.log("No changes made.");
            } else 
              this.http.put<any>("http://localhost:3000/employees/" + user.id, newVal).subscribe( data => {
                console.log(data);
              });
            });
        }
      }
     ]
    });
    await alert.present();
  }

  ngOnInit() {}

}
