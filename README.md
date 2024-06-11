1. Login API
http://localhost:4042/rc-group/salesman/login

2. 
SendMessageAPI - CASH
{
    "invoice": "INV001",
    "invoiceDate": "2023-01-01",
    "mode": "Cash",
    "amount": 1000,
    "dealerId": "66670c8914d76275d8861cc9",
   "additionalPaymentDetails" : null
}



SendMessageAPI - CHEQUE
{
    "invoice": "INV001",
    "invoiceDate": "2023-01-01",
    "mode": "Cheque",
    "amount": 1000,
    "dealerId": "66670c8914d76275d8861cc9",
   "additionalPaymentDetails" : {
       "chequeNumber": "1235",
       "chequeDate":date,
       "bankName":"BOI"
         }
}

SendMessageAPI - Online
{
    "invoice": "INV001",
    "invoiceDate": "2023-01-01",
    "mode": "Online",
    "amount": 1000,
    "dealerId": "66670c8914d76275d8861cc9",
   "additionalPaymentDetails" : {
       "UpiAddress": "1235",
         }
}