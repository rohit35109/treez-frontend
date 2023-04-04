import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "amountWithCentToUsd"
})
export class AmountWithConversionToUSD implements PipeTransform {
    transform(value: any, ...args: any[]) {
        if (isNaN(value)) return '';

        const dollars = Math.floor(value/100);
        const cents = value % 100;
        const formattedCents = cents < 10 ? `0${cents}` : cents;

        return `$${dollars}.${formattedCents}`;
    }
}