import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TransactionPayload } from './interface/transaction.interface';
import { TransactionStatus } from './enum/transaction.status.enum';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

const ELEMENT_DATA: TransactionPayload[] = [
  {
    date: '2022-12-10T02:10:00+00:00',
    gross_amount: 1000,
    status: TransactionStatus.INITIATED,
    customer: 'Eren Akichi',
    swifter_id: '2342WM',
    external_id: 'T234S2',
    source: 'Payments',
  },
  {
    date: '2022-12-14T02:10:00+00:00',
    gross_amount: 98,
    status: TransactionStatus.CANCELLED,
    customer: 'Eren Akichi',
    swifter_id: '2342WM',
    external_id: 'T234S2',
    source: 'E-commerce',
  },
  {
    date: '2022-12-01T02:10:00+00:00',
    gross_amount: 2500,
    status: TransactionStatus.AUTHORIZED,
    customer: 'Eren Akichi',
    swifter_id: '2342WM',
    external_id: 'T234S2',
    source: 'In-Store',
  },
  {
    date: '2022-12-20T02:10:00+00:00',
    gross_amount: 10000,
    status: TransactionStatus.RETURNED,
    customer: 'Eren Akichi',
    swifter_id: '2342WM',
    external_id: 'T234S2',
    source: 'In-Store',
  },
  {
    date: '2022-12-30T02:10:00+00:00',
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
export class AppComponent implements AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;

  public disaplyedColumns: string[] = [
    'date',
    'gross_amount',
    'status',
    'customer',
    'swifter_id',
    'external_id',
    'source',
  ];

  public dataSource: MatTableDataSource<TransactionPayload>;

  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
  }


}
