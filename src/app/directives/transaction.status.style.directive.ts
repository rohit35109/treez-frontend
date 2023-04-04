import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";
import { TransactionStatus } from "../enum/transaction.status.enum";

@Directive({
    selector: '[transactionStatusStyle]'
})
export class TransactionStatusStyleDirective implements OnInit {
    
    @Input() status!: TransactionStatus;

    constructor(private el: ElementRef, private renderer: Renderer2) {}
    
    ngOnInit(): void {
        switch(this.status) {
            case TransactionStatus.INITIATED: {
                this.setClass("info");
                this.setValue(`ACH ${TransactionStatus.INITIATED}`);
                break;
            }
            case TransactionStatus.AUTHORIZED: {
                this.setClass("warning");
                this.setValue(`ACH ${TransactionStatus.AUTHORIZED}`);
                break;
            }
            case TransactionStatus.CANCELLED: {
                this.setClass("secondary");
                this.setValue(`${TransactionStatus.CANCELLED}`);
                break;
            }
            case TransactionStatus.RETURNED: {
                this.setClass("danger");
                this.setValue(`ACH ${TransactionStatus.RETURNED}`);
                break;
            }
            case TransactionStatus.SUCCESSFUL: {
                this.setClass("success");
                this.setValue(`${TransactionStatus.SUCCESSFUL}`);
                break;
            }
            default: {
                this.setClass("");
                this.setValue("");
                break;
            }
        }
    }

    private setClass(className: string) {
        this.renderer.addClass(this.el.nativeElement, `t-bg-${className}`);
        this.renderer.addClass(this.el.nativeElement, `t-text-${className}`);
    }

    private setValue(text: string) {
        this.renderer.appendChild(this.el.nativeElement, this.renderer.createText(text.toUpperCase()));
    }
}