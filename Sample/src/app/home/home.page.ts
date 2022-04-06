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

  ngOnInit() {
    this.http.get<any>("http://localhost:3000/employees").subscribe(data => {
      this.obj = data;
      console.log(this.obj);
    });
  }

}
