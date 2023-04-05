import { TransactionStatus } from "../enum/transaction.status.enum";

export interface TransactionPayload {
  [key: string]: any;
  date: string;
  gross_amount: number; // in cents
  status: TransactionStatus;
  customer: string;
  swifter_id: string;
  external_id: string;
  source: string;
}
