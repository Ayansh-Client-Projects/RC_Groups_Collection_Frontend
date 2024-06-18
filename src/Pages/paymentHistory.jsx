import React from 'react'
import { useState } from 'react'

function PaymentHistory() {
const [details,setDetails] = useState([])
const PaymentDetails = 
[
    {

    invoice: "inv-1294",
    invoiceDate: "18-06-2024",
    mode: "cash",
    amount: "876",
    dealerId: "66670c8914d76275d8861cce",
} ,
    {

    invoice: "inv-1274",
    invoiceDate: "15-06-2024",
    mode: "cash",
    amount: "767",
    dealerId: "23467",
}
]
  return (
    <div>
        <div>
            <ul></ul>
        </div>
        {PaymentDetails.map ((value))}
    </div>
  )
}

export default PaymentHistory