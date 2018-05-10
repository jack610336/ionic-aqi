import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: Array<{title: string, note: string}>;
  posts: any;
  slide: String;

  constructor(public navCtrl: NavController ,public http: Http) {
 
    this.items = [{title:"台北",note:"45"},{title:"桃園",note:"42"},{title:"北投",note:"57"},{title:"淡水",note:"36"}
  ,{title:"中壢",note:"55"},{title:"八德",note:"62"},{title:"松山",note:"47"},{title:"士林",note:"49"}];
    this.items = [];
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({title: 'Item ' + i,note:  "note : " + i  });
    // }   
    this.posts = null;
 
    this.http.get('http://opendata2.epa.gov.tw/AQI.json').map(res => res.json()).subscribe(
      data => {
        this.posts = String(data[1].AQI);

        for (let i = 0; i < data.length; i++) {
            this.items.push({title: data[i].SiteName ,note: data[i].AQI });
            
          if( data[i].AQI >=0 &&  data[i].AQI <= 50){
            this.slide = "#00DB00";
          }else if(data[i].AQI >50 && data[i].AQI <=100){
            this.slide ="#FFCC00";
          }else if(data[i].AQI > 100 && data[i].AQI <=150){
            this.slide ="#FF8000";
          }
          else if(data[i].AQI > 150 && data[i].AQI <=200){
            this.slide ="#FF0000";
          }
          else if(data[i].AQI >200 && data[i].AQI <=300){
            this.slide ="#B766AD";
          }
          else if(data[i].AQI > 300 ){
            this.slide ="#AE0000";
          }
          else {
            this.slide ="#444444";
          }
        }
        
        
      },
      err => {
        console.log("Oops!");
      });

     
   
  }

  


  

}
