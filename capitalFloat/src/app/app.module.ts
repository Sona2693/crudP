import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule, MatIcon, MatIconModule, MatDialog,MatDatepickerModule,MatNativeDateModule, MatDialogModule} from '@angular/material';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { DeletePaymentComponent } from './delete-payment/delete-payment.component';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PaymentHistoryComponent,
    AddPaymentComponent,
    DeletePaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    NgxPaginationModule
  ],
  exports: [MatMenuModule,MatIconModule, MatDialogModule,
    MatDatepickerModule,MatNativeDateModule,NgxPaginationModule],
  providers: [DataService,DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [AddPaymentComponent,DeletePaymentComponent]
})
export class AppModule { }
