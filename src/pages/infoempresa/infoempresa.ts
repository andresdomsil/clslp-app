import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from "@ionic-native/call-number";

/**
 * Generated class for the InfoempresaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-infoempresa',
  templateUrl: 'infoempresa.html',
})
export class InfoempresaPage {

  public id: any;
  public producto: any[];
  public host = "http://sedely.mx/cl";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http:Http,
    private iab: InAppBrowser,
    public callNumber : CallNumber
  ) {
    this.id = this.navParams.get("id");
    var link = this.host + '/controllers/empresas.php?op=2&id=' + this.id;
    this.http.get(link)
      .subscribe(data => {
        this.producto = data.json();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoempresaPage');
  }

  web(){
    const browser = this.iab.create(this.producto[0].web, '_system');
    browser.close();
  }

  tel(){
    this.callNumber.callNumber(this.producto[0].telefono,true).then(res=>{
      console.log(res);
    }).catch(err =>{
      console.log(err);
    })
  }

}
