import { InfoempresaPage } from './../infoempresa/infoempresa';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: "page-list",
  templateUrl: "list.html"
})
export class ListPage {
  public host = "http://sedely.mx/cl";
  public productos: any[];
  public cabeza: any;
  public sub = "";
  public empresas;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http
  ) {
    var link = this.host + "/controllers/empresas.php?op=1";
    http.get(link).subscribe(data => {
      this.productos = data.json();
      this.iniciar();
    });
  }

  buscar() {
    var link = this.host + "/controllers/empresas.php?op=6&sub=" + this.sub;
    this.http.get(link).subscribe(data => {
      this.productos = data.json();
    });
  }

  InfoProductoPage(id) {
    this.navCtrl.push(InfoempresaPage, {
      id: id
    });
  }

  iniciar(){
    this.empresas=this.productos;
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.iniciar();
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != "") {
      this.empresas = this.empresas.filter(item => {
        return item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }
}
