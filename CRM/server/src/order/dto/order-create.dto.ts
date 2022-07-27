import { IsString, IsInt} from 'class-validator';

export enum transactiontype{
    CASH = 'cash',
    CHEQUE = 'cheque',
    ONLINE = 'online',
}

export enum invoicestatus{
    PAID = 'paid',
    UNPAID = 'unpaid',
}


export class orderCreateDto{

    Id: number;

    @IsInt()
    TotalAmount: number;

    @IsString()
    DateOfOrder: string;

    @IsString()
    LastDate: string;

    @IsInt()
    ReferenceNo: string;

    @IsString()
    Name: string;


    TransactionType: transactiontype;
    InvoiceStatus:invoicestatus;
}