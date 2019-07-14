import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { DeletePaymentComponent } from './delete-payment/delete-payment.component';
import { ViewChild,EventEmitter } from '@angular/core';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'capitalFloat';
  @ViewChild(PaymentHistoryComponent) phComp: PaymentHistoryComponent;
  
  constructor(private dialogRef: MatDialog){
    
 }
 

  addPayment(){
    let addPaymentDialog = this.dialogRef.open(AddPaymentComponent, {
      id: 'addPaymentDialog',
      width: '60vh',
    });
    addPaymentDialog.afterClosed().subscribe(
      (data)=>{console.log(data);
      this.phComp.refreshPaymentHistory();})
  }
  deletePayment(){
    let deletePaymentDialog = this.dialogRef.open(DeletePaymentComponent, {
      id: 'addPaymentDialog',
      width: '60vh',
    });
    deletePaymentDialog.afterClosed().subscribe(
      (id)=>{alert(id);
      this.phComp.refreshPaymentHistory();})
  }
  filter(value: string) {
  this.phComp.filterQuery(value);
   //  alert(value);
    }
}
