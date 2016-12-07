import { Component, OnInit } from '@angular/core';
import { Business } from './Business';
import { Category } from './Category';
import { FirebaseService } from './services/firebase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ FirebaseService ]
})
export class AppComponent {
  businesses:Business[];
  categories:Category[];
  constructor(private _firebaseService:FirebaseService) {

  }

  ngOnInit(){
    this._firebaseService.getBusinesses().subscribe(businesses => {
      console.log(businesses);
      this.businesses = businesses;
    });

    this._firebaseService.getCategories().subscribe(categories => {
      console.log(categories);
      this.categories = categories;
    });
  }

}
