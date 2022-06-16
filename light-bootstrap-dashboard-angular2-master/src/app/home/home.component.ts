import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import configuration from "../../assets/contracts/WalmartPaymentSystem.json";
import configuration2 from "../../assets/contracts/WalmartFT.json";
import configuration3 from "../../assets/contracts/WalmartNFT.json";


import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import Web3 from 'web3';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  public  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  public SufianAccount = "0x7bDadB0C89b46790943B6Ee599Cb8683E6B85923";
  

  public web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
  public contract ;
  public  CONTRACT_ADDRESS ;
  public CONTRACT_ABI ;


  public contractFT ;
  public  CONTRACT_ADDRESSFT ;
  public CONTRACT_ABIFT ;


  public contractNFT ;
  public  CONTRACT_ADDRESSNFT ;
  public CONTRACT_ABINFT ;

  constructor(
   private http: HttpClient , public dialog: MatDialog ) {
    this.CONTRACT_ADDRESS = configuration.networks["5777"].address;
    this.CONTRACT_ABI = configuration.abi;
    this.contract = new this.web3.eth.Contract(this.CONTRACT_ABI, this.CONTRACT_ADDRESS);
   

    this.CONTRACT_ADDRESSFT = configuration2.networks["5777"].address;
    this.CONTRACT_ABIFT = configuration2.abi;
    this.contractFT = new this.web3.eth.Contract(this.CONTRACT_ABIFT, this.CONTRACT_ADDRESSFT);


    this.CONTRACT_ADDRESSNFT = configuration3.networks["5777"].address;
    this.CONTRACT_ABINFT = configuration3.abi;
    this.contractNFT = new this.web3.eth.Contract(this.CONTRACT_ABINFT, this.CONTRACT_ADDRESSNFT);
    }

  public  Data ; 
  public account;

  async PayEther(obj , item){
  
    await this.contract.methods
      .WalmartPaymentInEther(Date.now().toString() , "Usama (k180154)" , obj.price , this.SufianAccount ,  obj.productName , obj.productId , obj.image , item.storeType , item.storeName , item.storeId)
      .send({ from: this.account, value: obj.price });

      alert("Payment completed By Ether");

  }

  openDialog(obj , item): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: {name: "", animal: ""},
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log(result); //configuration3
      if (result.event == "Action"){

        var id =  await this.contractNFT.methods.awardItem(this.account , `https://gateway.pinata.cloud/ipfs/${result.data}`.toString());
        await this.contractNFT.methods.transferFrom(this.account, this.SufianAccount, id);

        await this.contractNFT.methods
        .WalmartPaymentInNFT(Date.now().toString() , "Usama (k180154)" , obj.price ,obj.price   ,  obj.productName , obj.productId , obj.image , item.storeType , item.storeName , item.storeId)
        .send({ from: this.account });

        alert("Payment completed By NFT");

      }
      //this.animal = result;
    });
  }


  async PayWc(obj , item){
    // var k = await this.contractFT.methods.transfer(this.account, 100);
    // console.log(k);
    // console.log(await this.contractFT.methods.balanceOf(this.account))

    var k  = await this.contractFT.methods.transferFrom(this.account, this.SufianAccount, obj.price *2);
    console.log(k)

    await this.contractFT.methods
      .WalmartPaymentInFT(Date.now().toString() , "Usama (k180154)" , obj.price ,obj.price   ,  obj.productName , obj.productId , obj.image , item.storeType , item.storeName , item.storeId)
      .send({ from: this.account });

    alert("Payment completed By FT");


  }

  async ngOnInit() {
    const accounts = await this.web3.eth.requestAccounts();
    this.account = accounts[0];

    await this.http.get<any>("http://localhost:5000/get-walmart-products").subscribe(data => {
     console.log(data)
     this.Data  =  data ;
    });
    }

}
