import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  constructor(private http: HttpClient) {}
  obj = [];
  log = "log-in";
  user = "user";

  checkLog() {
    localStorage.getItem("loggedIn") == "true" ? this.log = "log-out" : this.log = "log-in";
  }

  edit(i : [], index : number) {
    
  }

  // edit(i : [], index : number) {
  //   const prompt = this.modalCtrl.create({
  //     title: "Edit",
  //     inputs: [{
  //       name: "First name",
  //       placeholder: "First name"
  //     },
  //     {
  //       name: "Last name",
  //       placeholder: "Last name"
  //     },
  //     {
  //       name: "Email",
  //       placeholder: "Email"
  //     }],
  //     buttons: [
  //       {
  //         text: "Cancel"
  //       },
  //       {
  //         text: "Save",
  //         handler: data => {
  //           if (this.user == "admin")
  //             console.error("Not admin");
  //           this.obj[index].firstName = data.First;
  //           this.obj[index].lastName = data.Last;
  //           this.obj[index].email = data.Email;
  //         },
  //       },
  //       {
  //         text: "Delete",
  //         handler: data => {
  //           if (this.user == "admin")
  //             console.error("Not admin");
  //           this.obj.splice(index, 1);
  //         }
  //       }]
  //   })
  // }

  ngOnInit() {
    this.checkLog();
    this.http.get<any>("http://localhost:3000/employees").subscribe(data => {
      this.obj = data;
      console.log(this.obj);
    });
  }
}
