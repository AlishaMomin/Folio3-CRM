import { IsString, IsInt} from 'class-validator';
import { invoicestatus } from "../enums/invoicestatus.enum";
import { transactiontype } from "../enums/transactiontype.enum";


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