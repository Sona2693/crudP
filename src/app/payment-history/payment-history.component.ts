import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {
  paymentLog = [];
  filterPaymentLog = [];;
  config: any;
  value: any;
  p: number = 1;
  limit: number = 5;
  exp:string;
  @Input() ipp: number;
  //collection = { count: 60, data: [] };
  constructor(private api: DataService) {


  }

  ngOnInit() {
    this.paymentHistory();
  }
refreshPaymentHistory(){
  this.filterPaymentLog=[];
  this.paymentLog=[];
  this.paymentHistory();
}
  paymentHistory() {
    let url = 'http://localhost:8080/payments';

    this.api.Getdata(url, (response) => {
      if (response) {
        for (let i = 0; i < response.length; i++) {
          var temp = {
            'id': response[i].paymentId,
            'orderDate': response[i].orderDate,
            'merchantId': response[i].merchatId,
            'email': response[i].customerEmail,
            'amt': response[i].amount,
            'status': response[i].paymentStatus
          }
          this.paymentLog.push(temp);
        }
        this.filterPaymentLog = this.paymentLog;
        console.log(this.paymentLog)
      }
    }, (error) => {
      console.log("error");
    });
  }
  pageChanged(event) {
    this.p = event;
    if (this.ipp == null)
      alert('Please Enter limit');
    else
      this.limit = this.ipp;
    //alert(this.limit);
  }
sort(value:any){
  if(value=='asc')
  this.filterPaymentLog.sort(function(a, b){
    var customerEmailA=a.email.toLowerCase(), customerEmailB=b.email.toLowerCase()
    if (customerEmailA < customerEmailB) //sort string ascending
        return -1 ;    
});
else if(value=='dsc'){
//alert(value)
this.filterPaymentLog.sort(function(a, b){
  var customerEmailA=a.email.toLowerCase(), customerEmailB=b.email.toLowerCase()
  if (customerEmailA < customerEmailB) //sort string ascending
      return -1 ;    
}).reverse();
}
}

  firstPage(){
    this.p=1;
   // alert(this.p)
  }
  recieve(value: any) {
    if (value == 'Success' || value == 'Failed' || value == 'Initiated' || value == 'Dropped' || value == 'Refunded') {
      this.filterPaymentLog = (value) ?
        this.paymentLog.filter(m => (m.status.toLowerCase()).indexOf(value.toLowerCase()) != -1) :
        this.paymentLog;
      console.log(this.filterPaymentLog);
      console.log(value);
    }
    else if (value == 'All') {
      this.filterPaymentLog = (value) ? this.paymentLog : this.paymentLog;
      console.log(this.filterPaymentLog);
    }
  }
  filterQuery(Value: string) {
    this.filterPaymentLog = (Value) ?
              this.paymentLog.filter(m => (m.email.toLowerCase()).indexOf(Value.toLowerCase()) != -1) :
              this.paymentLog;
            console.log(Value);
            console.log(this.filterPaymentLog);
  }
}
