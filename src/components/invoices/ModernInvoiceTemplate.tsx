import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, CreditCard, AlertCircle, ExternalLink } from 'lucide-react'

interface InvoiceItem {
  description: string
  cost: number
  quantity: string
  price: number
  unit?: string
}

interface InvoiceProps {
  invoiceNumber: string
  projectDesc: string
  date: string
  dueDate: string
  companyName: string
  companyAddress: string
  companyPhone: string
  companyEmail: string
  clientName: string
  clientAddress: string
  clientPhone: string
  clientEmail: string
  items: InvoiceItem[]
  status: 'pending' | 'paid' | 'overdue'
  paymentType: 'one-time' | 'recurring'
  customerNotes?: string
  terms?: string
  bankDetails: {
    bankName: string
    accountName: string
    accountNumber: string
    swiftCode: string
    routingNumber: string
  }
  paymentLink: string
}

const ModernInvoiceTemplate: React.FC<InvoiceProps> = ({
  invoiceNumber,
  projectDesc,
  date,
  dueDate,
  companyName,
  companyAddress,
  companyPhone,
  companyEmail,
  clientName,
  clientAddress,
  clientPhone,
  clientEmail,
  items,
  status,
  paymentType,
  customerNotes,
  terms,
  bankDetails,
  paymentLink
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const taxRate = 0.10
  const tax = subtotal * taxRate
  const discount = 0 // Can be modified as needed
  const total = subtotal + tax - discount

  const statusColors = {
    pending: 'bg-yellow-500',
    paid: 'bg-green-500',
    overdue: 'bg-red-500'
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      <div className="h-2 bg-blue-600 rounded-t-lg" />
      <CardContent className="p-8">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2 rounded-full">
              <span className="text-2xl font-bold">10</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Invoice {invoiceNumber}</h1>
              <p className="text-sm text-gray-600">{projectDesc}</p>
            </div>
          </div>
          <div className="text-right">
            <Badge 
              className={`${statusColors[status]} text-white`}
            >
              {status.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="ml-2">
              {paymentType === 'recurring' ? 'Recurring' : 'One-time'}
            </Badge>
          </div>
        </div>

        {/* Dates */}
        <div className="flex justify-end gap-4 mb-8">
          <div>
            <p className="text-sm text-gray-600">Date:</p>
            <p className="font-medium">{date}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Due Date:</p>
            <p className="font-medium">{dueDate}</p>
          </div>
        </div>

        {/* Company and Client Information */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-sm font-medium text-blue-600 mb-2">FROM:</p>
            <h3 className="font-bold text-lg">{companyName}</h3>
            <p className="text-sm text-gray-600">{companyAddress}</p>
            <p className="text-sm text-gray-600">{companyPhone}</p>
            <p className="text-sm text-gray-600">{companyEmail}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-600 mb-2">TO:</p>
            <h3 className="font-bold text-lg">{clientName}</h3>
            <p className="text-sm text-gray-600">{clientAddress}</p>
            <p className="text-sm text-gray-600">{clientPhone}</p>
            <p className="text-sm text-gray-600">{clientEmail}</p>
          </div>
        </div>

        {/* Items Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>JOB DESCRIPTION</TableHead>
              <TableHead className="text-right">COST</TableHead>
              <TableHead className="text-right">PAGE/SCREEN</TableHead>
              <TableHead className="text-right">PRICE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.description}</TableCell>
                <TableCell className="text-right">${item.cost.toFixed(2)}</TableCell>
                <TableCell className="text-right">{item.quantity} {item.unit}</TableCell>
                <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Totals */}
        <div className="mt-8 flex justify-end">
          <div className="w-1/3">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Tax ({(taxRate * 100)}%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Discount:</span>
              <span>${discount.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 space-y-6">
          <h4 className="font-semibold text-lg">Payment Methods</h4>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Bank Transfer Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Bank Transfer</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank Name:</span>
                  <span className="font-medium">{bankDetails.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Name:</span>
                  <span className="font-medium">{bankDetails.accountName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Number:</span>
                  <span className="font-medium">{bankDetails.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SWIFT Code:</span>
                  <span className="font-medium">{bankDetails.swiftCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Routing Number:</span>
                  <span className="font-medium">{bankDetails.routingNumber}</span>
                </div>
              </div>
            </div>

            {/* Payment Gateway */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Pay Online</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Click the button below to pay securely via our payment gateway.
              </p>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => window.open(paymentLink, '_blank')}
              >
                Pay Now
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Notes */}
        {customerNotes && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Notes</h4>
            <p className="text-sm text-gray-600">{customerNotes}</p>
          </div>
        )}

        {/* Terms and Conditions */}
        <div className="mt-6">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold mb-2">Terms and Conditions</h4>
              <p className="text-sm text-gray-600">{terms || 'Payment is due within 30 days of invoice date. Late payments may be subject to fees. All deliverables remain the property of the company until full payment is received.'}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Separator className="my-6" />
        <footer className="text-center text-sm text-gray-600">
          <p>Thank you for your business!</p>
          <p className="mt-1">For any questions, please contact us at {companyEmail}</p>
        </footer>
      </CardContent>
    </Card>
  )
}

export default ModernInvoiceTemplate
