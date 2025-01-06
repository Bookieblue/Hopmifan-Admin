import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ExternalLink } from 'lucide-react'

interface InvoiceItem {
  description: string
  quantity: number
  cost: number
  amount: number
}

interface InvoiceProps {
  amount: string
  dueDate: string
  invoiceNumber: string
  issueDate: string
  companyDetails: {
    name: string
    website: string
    email: string
    phone: string
    address: {
      street: string
      city: string
      postcode: string
    }
  }
  clientDetails: {
    name: string
    address: {
      street: string
      city: string
      postcode: string
    }
  }
  items: InvoiceItem[]
  bankDetails: {
    bank: string
    accountName: string
    accountNumber: string
    sortCode: string
  }
  paymentLink: string
}

const Invoice: React.FC<InvoiceProps> = ({
  amount,
  dueDate,
  invoiceNumber,
  issueDate,
  companyDetails,
  clientDetails,
  items,
  bankDetails,
  paymentLink
}) => {
  return (
    <Card className="w-full max-w-3xl mx-auto bg-white">
      <CardContent className="p-12">
        {/* Header - Amount and Due Date */}
        <div className="mb-12">
          <h1 className="text-3xl font-normal mb-1">
            Invoice for {amount}
          </h1>
          <p className="text-xl">
            Due by {dueDate}
          </p>
        </div>

        {/* Company and Client Information */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          {/* Client Details */}
          <div>
            <h2 className="text-sm font-medium mb-2">Billed to:</h2>
            <div className="space-y-1">
              <p className="font-medium">{clientDetails.name}</p>
              <p>{clientDetails.address.street}</p>
              <p>{clientDetails.address.city}</p>
              <p>{clientDetails.address.postcode}</p>
            </div>
          </div>

          {/* Company Details */}
          <div className="text-right">
            <div className="space-y-1">
              <p className="font-medium">{companyDetails.name}</p>
              <p>{companyDetails.address.street}</p>
              <p>{companyDetails.address.city}</p>
              <p>{companyDetails.address.postcode}</p>
              <p>{companyDetails.website}</p>
              <p>{companyDetails.email}</p>
              <p>{companyDetails.phone}</p>
            </div>
            <div className="mt-4 space-y-1">
              <p>Invoice number: {invoiceNumber}</p>
              <p>Issuing date: {issueDate}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%] pl-0">DESCRIPTION</TableHead>
              <TableHead className="text-right">QUANTITY</TableHead>
              <TableHead className="text-right">COST</TableHead>
              <TableHead className="text-right pr-0">AMOUNT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="pl-0">{item.description}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">£{item.cost}</TableCell>
                <TableCell className="text-right pr-0">£{item.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Total */}
        <div className="flex justify-end mt-4 mb-12">
          <div className="text-right">
            <p className="text-lg">
              Total due: {amount}
            </p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-gray-50 p-6 rounded-sm">
          <h2 className="text-lg font-medium mb-4">Payment details</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <div>
              <span className="text-gray-600 uppercase text-sm">Bank</span>
              <p>{bankDetails.bank}</p>
            </div>
            <div>
              <span className="text-gray-600 uppercase text-sm">Account name</span>
              <p>{bankDetails.accountName}</p>
            </div>
            <div>
              <span className="text-gray-600 uppercase text-sm">Account number</span>
              <p>{bankDetails.accountNumber}</p>
            </div>
            <div>
              <span className="text-gray-600 uppercase text-sm">Sort code</span>
              <p>{bankDetails.sortCode}</p>
            </div>
          </div>

          <div className="mt-6">
            <Button 
              className="w-full bg-black hover:bg-gray-800 text-white"
              onClick={() => window.open(paymentLink, '_blank')}
            >
              Pay Now
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            Please pay within 28 days from the issuing date.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default Invoice