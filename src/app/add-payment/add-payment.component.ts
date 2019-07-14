import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDatepicker, MatDialogRef } from '@angular/material';
import { Input } from '@angular/core';
import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  @Input() emailId: string;
  @Input() date: Date;
  @Input() status1: string;
  @Input() mid: number;
  @Input() amt: number;
  paymentId:number;
  constructor(private datepipe:DatePipe,private dialogRef: MatDialogRef<AddPaymentComponent>, private api: DataService) { }

  ngOnInit() {
   
  }

   recieve(value: any) {
    this.status1=value;
  }
  transformDate(){
    return this.datepipe.transform(this.date, 'MM/dd/yyyy');
  }
  add() {

    if (this.emailId && this.emailId.trim() != "") {
      console.log('Adding..');
      
      const Record =  JSON.stringify({
        "paymentId":  Math.floor(100000 + Math.random() * 900000),

        "orderDate": this.transformDate(),

        "merchatId": this.mid,
        "customerEmail": this.emailId,

        "amount": this.amt,

        "paymentStatus": this.status1
      });
      console.log(Record);
     const url = 'http://localhost:8080/payments';
      this.api.postData(url, Record, (response: any) => {
this.paymentId=response.paymentId;
this.dialogRef.close(Record);
console.log(response);
       }, (error) => {
         alert(Record);
        alert('Data not saved');
this.dialogRef.close();
      });
    }
    else {
      alert('email Id Required');
    }
  }
  update(){}
}