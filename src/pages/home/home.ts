import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: Array<{title: string, AQI: string ,colorS: string}>;
  posts: any;
  slide: string ;

  constructor(public navCtrl: NavController ,public http: Http) {
 
  //   this.items = [{title:"台北",note:"45"},{title:"桃園",note:"42"},{title:"北投",note:"57"},{title:"淡水",note:"36"}
  // ,{title:"中壢",note:"55"},{title:"八德",note:"62"},{title:"松山",note:"47"},{title:"士林",note:"49"}];
    this.items = [];
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({title: 'Item ' + i,note:  "note : " + i  });
    // }   
 
    this.http.get('http://opendata2.epa.gov.tw/AQI.json').map(res => res.json()).subscribe(
      data => {
        this.posts = data;
        this.colorString();
      },
      err => {
        console.log("Oops!");
      });

     
  }

  

  colorString(){

    for (let i = 0; i < this.posts.length; i++) {    

      if(this.posts[i].AQI == ""){
        this.slide ="#444444";
        this.posts[i].AQI = "暫無資料"
      }else if( this.posts[i].AQI >=0 &&  this.posts[i].AQI <= 50){
        this.slide = "#00DB00";
      }else if(this.posts[i].AQI >50 && this.posts[i].AQI <=100){
        this.slide ="#FFCC00";
      }else if(this.posts[i].AQI > 100 && this.posts[i].AQI <=150){
        this.slide ="#FF8000";
      }
      else if(this.posts[i].AQI > 150 && this.posts[i].AQI <=200){
        this.slide ="#FF0000";
      }
      else if(this.posts[i].AQI >200 && this.posts[i].AQI <=300){
        this.slide ="#B766AD";
      }
      else if(this.posts[i].AQI > 300 ){
        this.slide ="#AE0000";
      }
      else {
        this.slide ="#444444";
      }
      this.items.push({title: this.posts[i].SiteName ,AQI: this.posts[i].AQI ,colorS: this.slide});

      

    }
  }

  

}
