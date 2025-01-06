import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface InvoiceItem {
  no: string
  description: string
  sac: string
  amount: number
}

interface ClassicInvoiceTemplateProps {
  invoice: {
    number?: string;
    date: string;
    customer?: {
      name: string;
      email: string;
      street?: string;
      state?: string;
      postalCode?: string;
    };
    items: Array<{
      description: string;
      quantity: number;
      price: number;
      amount: number;
    }>;
    notes?: string;
    terms?: string;
    footer?: string;
  };
  currencySymbol: string;
}

export function ClassicInvoiceTemplate({ invoice, currencySymbol }: ClassicInvoiceTemplateProps) {
  const subtotal = invoice.items.reduce((sum, item) => sum + item.amount, 0)
  const taxableValue = subtotal * 0.75 // Example calculation
  const igst = taxableValue * 0.18
  const total = subtotal + igst

  return (
    <Card className="w-full max-w-3xl mx-auto bg-[#f8f1f1] mt-4">
      <CardContent className="p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold text-[#1a1a3c]">Cordlo Invoice</h1>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold mb-1">TAX INVOICE</h2>
            <p className="text-sm">#{invoice.number}</p>
          </div>
        </div>

        {/* Client Information */}
        {invoice.customer && (
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Issued to</h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">NAME AND ADDRESS</span>
                    <span className="text-sm">{invoice.customer.name}</span>
                  </div>
                  <p className="text-sm">
                    {invoice.customer.street}
                    {invoice.customer.state && `, ${invoice.customer.state}`}
                    {invoice.customer.postalCode && ` ${invoice.customer.postalCode}`}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">DATE ISSUED</span>
                  <span className="text-sm">{new Date(invoice.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charges Table */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Charges</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>DESCRIPTION</TableHead>
                <TableHead className="text-right">QUANTITY</TableHead>
                <TableHead className="text-right">PRICE</TableHead>
                <TableHead className="text-right">AMOUNT</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{currencySymbol}{item.price.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{currencySymbol}{item.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Totals */}
        <div className="space-y-2 mb-8">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{currencySymbol}{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxable Value</span>
            <span>{currencySymbol}{taxableValue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>IGST @ 18%</span>
            <span>{currencySymbol}{igst.toLocaleString()}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{currencySymbol}{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Notes</h4>
            <p className="text-sm text-gray-600">{invoice.notes}</p>
          </div>
        )}

        {/* Terms */}
        {invoice.terms && (
          <div className="mb-8">
            <h4 className="text-sm font-semibold mb-2">Terms and Conditions</h4>
            <p className="text-sm text-gray-600">{invoice.terms}</p>
          </div>
        )}

        {/* Footer */}
        {invoice.footer && (
          <>
            <Separator className="mb-4" />
            <p className="text-xs text-gray-600 mt-4 text-center">
              {invoice.footer}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}