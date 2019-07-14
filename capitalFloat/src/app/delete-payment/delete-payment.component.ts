import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-delete-payment',
  templateUrl: './delete-payment.component.html',
  styleUrls: ['./delete-payment.component.css']
})
export class DeletePaymentComponent implements OnInit {
  @Input() id: number;
  constructor(private dialogRef: MatDialogRef<DeletePaymentComponent>,private api: DataService) { }

  ngOnInit() {
  }
  delete(){
    if (this.id != null) {
      console.log('deleting..');
      const id=this.id;
      const url = 'http://localhost:8080/payments/'+this.id+'/';
      
      console.log(id);
      this.api.deleteData(url,(response: any) => {
        console.log('Data deleted..!!')
        console.log(response);
        this.dialogRef.close(this.id);
               }, (error) => {
                alert('Data not deleted');
                this.dialogRef.close();
              });
    }
    else{
      alert('Payment Id Required!!');
    }
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
