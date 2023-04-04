import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTableModule } from "@angular/material/table";
import { TransactionStatusStyleDirective } from './directives/transaction.status.style.directive';
import { AmountWithConversionToUSD } from './pipes/amount.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TransactionStatusStyleDirective,
    AmountWithConversionToUSD
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
