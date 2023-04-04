import { Component } from '@angular/core';
import { TransactionPayload } from './interface/transaction.interface';
import { TransactionStatus } from './enum/transaction.status.enum';

const ELEMENT_DATA: TransactionPayload[] = [
  {
    date: '10-10-2022T13:12:22',
    gross_amount: 1000,
    status: TransactionStatus.INITIATED,
    customer: 'Eren Akichi',
    swifter_id: '2342WM',
    external_id: 'T234S2',
    source: 'Payments',
  },
  {
    date: '10-10-2022T13:12:22',
    gross_amount: 98,
    status: TransactionStatus.CANCELLED,
    customer: 'Eren Akichi',
    swifter_id: '2342WM',
    external_id: 'T234S2',
    source: 'E-commerce',
  },
  {
    date: '10-10-2022T13:12:22',
    gross_amount: 2500,
    status: TransactionStatus.AUTHORIZED,
    customer: 'Eren Akichi',
    swifter_id: '2342WM',
    external_id: 'T234S2',
    source: 'In-Store',
  },
  {
    date: '10-10-2022T13:12:22',
    gross_amount: 10000,
    status: TransactionStatus.RETURNED,
    customer: 'Eren Akichi',
    swifter_id: '2342WM',
    external_id: 'T234S2',
    source: 'In-Store',
  },
  {
    date: '10-10-2022T13:12:22',
    gross_amount: 700,
    status: TransactionStatus.SUCCESSFUL,
    customer: 'Eren Akichi',
    swifter_id: '2342WM',
    external_id: 'T234S2',
    source: 'E-commerce',
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public disaplyedColumns: string[] = [
    'date',
    'gross_amount',
    'status',
    'customer',
    'swifter_id',
    'external_id',
    'source',
  ];

  public dataSource: TransactionPayload[] = ELEMENT_DATA;
}
