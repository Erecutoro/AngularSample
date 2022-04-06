import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-del-user',
  templateUrl: './del-user.component.html',
  styleUrls: ['./del-user.component.scss'],
})
export class DelUserComponent implements OnInit {
  constructor(
    private alert: AlertController,
    private http: HttpClient, 
  ) {}

  async deleteUser(id: number) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Warning!',
      message: 'This action is definitive and irreversible. Are you sure?',
      buttons: [ {
        text: 'Cancel',
      },
      {
        text: 'Yes delete',
        handler: () => {
          this.http.delete<any>("http://localhost:3000/employees/" + id).subscribe( () => {
            console.log("delete");
        }
          );
        }
      }
     ]
    });
    await alert.present();
  }

  ngOnInit() {}

}
