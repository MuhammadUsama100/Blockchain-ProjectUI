import { Component, OnInit } from '@angular/core';
import configuration from "../../assets/contracts/WalmartPaymentSystem.json";
import configuration2 from "../../assets/contracts/WalmartFT.json";
import configuration3 from "../../assets/contracts/WalmartNFT.json";
import Web3 from 'web3';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
   

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

  constructor() {
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
   public  account ;
   public data1;
   public data2
   public data3
  async ngOnInit() {
    const accounts = await this.web3.eth.requestAccounts();
    this.account = accounts[0];
    this.data1 =  await this.contract.methods
    .walmartTransections(this.account).call();
    console.log(this.data1)

    this.data2 =  await this.contractFT.methods
    .walmartTransections(this.account).call();

    this.data3 =  await this.contractNFT.methods
    .walmartTransections(this.account).call();
    
  }

}
