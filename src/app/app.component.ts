import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TransactionPayload } from './interface/transaction.interface';
import { TransactionStatus } from './enum/transaction.status.enum';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('search') searchFilter!: ElementRef;

  private transactionApi: string = 'http://192.168.29.144:3000/transaction';
  public RECORDS_PER_PAGE: number = 15;
  public MAXIMUM_PAGE: number = 0;
  public activePage: number = 1;
  public totalRecords: number = 0;
  public optionsList = Object.keys(TransactionStatus);
  public statusFilter: Array<string> = [];

  public isLoading: boolean = false;
  public disaplyedColumns: string[] = [
    'date',
    'gross_amount',
    'status',
    'customer',
    'swifter_id',
    'external_id',
    'source',
  ];

  public searchText: string = "";
  public dataSource: MatTableDataSource<TransactionPayload>;
  public transactionData: TransactionPayload[] = [];
  private Subscription: Subscription = new Subscription();

  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getTransactions();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

    // on search changes
    this.initializeSearch();
  }

  initializeSearch() {
    if (!this.searchFilter) return;

    const search$ = fromEvent(this.searchFilter.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      tap((text) => {
        this.searchText = text;
      }),
      distinctUntilChanged()
    );

    this.Subscription.add(
      search$.subscribe({
        next: () => {
          this.getTransactions();
        },
      })
    );
  }

  toggleSelectedStatusFilter(val: string) {
    if (val === '') return;
    const indexOfExistingSelection = this.statusFilter.findIndex(
      (i) => i === val
    );
    indexOfExistingSelection >= 0
      ? this.statusFilter.splice(indexOfExistingSelection, 1)
      : this.statusFilter.push(val);
    
    this.getTransactions();
  }

  getTransactions() {
    this.isLoading = true;
    this.Subscription.add(
      this.http
        .get<TransactionPayload[]>(
          `${this.transactionApi}?search=${this.searchText}&&status=${this.statusFilter.join(",")}`
        )
        .subscribe({
          next: (response) => {
            this.transactionData = response;
            this.isLoading = false;
            this.totalRecords = this.transactionData.length;
            this.MAXIMUM_PAGE = Math.floor(
              this.totalRecords / this.RECORDS_PER_PAGE
            );
            this.displayDataOnPaginationChange();
          },
          error: (err) => {
            // error cases. Console will be removed in the production
            console.log(err);
            this.isLoading = false;
          },
        })
    );
  }

  displayDataOnPaginationChange() {
    const startIndex = (this.activePage - 1) * this.RECORDS_PER_PAGE;
    const endIndex = startIndex + 15;
    this.dataSource.data = [
      ...this.transactionData.slice(startIndex, endIndex),
    ];
  }

  nextPage() {
    if (this.activePage > this.MAXIMUM_PAGE) return;
    this.activePage++;
    this.displayDataOnPaginationChange();
  }

  previousPage() {
    if (this.activePage === 1) return;
    this.activePage--;
    this.displayDataOnPaginationChange();
  }

  exportToCSV() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      useBom: true,
      headers: [
        'Date',
        'Gross Amount',
        'Status',
        'Customer',
        'Swifter Id',
        'External Id',
        'Source',
      ],
      useHeader: false,
      nullToEmptyString: true,
    };
    new AngularCsv(this.transactionData, 'Transactions', options);
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}
