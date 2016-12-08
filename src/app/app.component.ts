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
  appState: string;
  activeKey: string;

  activeCompany: string;
  activeCategory: string;
  activePhone: string;
  activeCity: string;
  activeEmail: string;

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

  changeState(state, key){
    console.log("change state to :"+ state);
    if(key){
      this.activeKey = key;
      console.log("change key to :"+ key);
    }
    this.appState = state;
  }

  filterCategory(category){
    this._firebaseService.getBusinesses(category).subscribe(businesses => {
      this.businesses = businesses;
    });
  }

  addBusiness(
      company: string,
      category: string,
      phone: string,
      city: string,
      email: string){
    var newBusiness = {
      company: company,
      category: category,
      phone: phone,
      city: city,
      email: email
    };
    this._firebaseService.addBusiness(newBusiness);
    this.changeState('default', false);

  }

  showEdit(business){
    this.changeState('edit', business.$key);
    this.activeCompany = business.company;
    this.activeCategory = business.category;
    this.activePhone = business.phone;
    this.activeCity = business.city;
    this.activeEmail = business.email;

  }

  updateBusiness(){
    var updBusiness = {
      company: this.activeCompany,
      category: this.activeCategory,
      email: this.activeEmail,
      phone: this.activePhone,
      city: this.activeCity
    };
    this._firebaseService.updateBusiness(this.activeKey, updBusiness);
    this.changeState('default', false);
  }

  deleteBusiness(key){
    this._firebaseService.deleteBusiness(key);
    this.changeState('default', false)
  }
}
