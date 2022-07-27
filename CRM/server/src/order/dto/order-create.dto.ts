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

    id: number;
    @IsInt()
    totalamount: number;
    @IsString()
    dateoforder: string;
    lastdate: string;
    @IsInt()
    referenceno: number;
    name: string;
    Transactiontype: transactiontype;
    Invoicestatus:invoicestatus;
}