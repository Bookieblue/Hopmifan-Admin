import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface QuoteItem {
  title: string
  description: string
  quantity: number
  unitPrice: number
  amount: number
}

interface QuoteProps {
  quoteNumber: string
  issueDate: string
  expirationDate: string
  totalAmount: string
  companyLogo: string
  companyName: string
  clientName: string
  clientEmail: string
  items: QuoteItem[]
  status: 'pending' | 'accepted' | 'expired'
  paymentType: 'one-time' | 'recurring'
  bankDetails: {
    bankName: string
    accountName: string
    accountNumber: string
    routingNumber: string
    swiftCode: string
  }
  paymentLink: string
}

const Quote: React.FC<QuoteProps> = ({
  quoteNumber,
  issueDate,
  expirationDate,
  totalAmount,
  companyLogo,
  companyName,
  clientName,
  clientEmail,
  items,
  status,
  paymentType,
  bankDetails,
  paymentLink
}) => {
  const statusColors = {
    pending: 'bg-yellow-500',
    accepted: 'bg-green-500',
    expired: 'bg-red-500'
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
      <CardContent className="p-12">
        {/* Header */}
        <div className="flex justify-between items-start mb-16">
          <div>
            <h1 className="text-xl font-medium">QUOTE</h1>
            <div className="flex gap-2 mt-2">
              <Badge 
                className={`${statusColors[status]} text-white`}
              >
                {status.toUpperCase()}
              </Badge>
              <Badge variant="outline">
                {paymentType === 'recurring' ? 'Recurring' : 'One-time'}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Valid until {expirationDate}</p>
            <p className="text-4xl font-bold">{totalAmount}</p>
          </div>
        </div>

        {/* Company and Quote Information */}
        <div className="grid grid-cols-2 gap-16 mb-16">
          <div>
            <div className="mb-8">
              <Image
                src={companyLogo}
                alt={companyName}
                width={200}
                height={80}
                className="mb-8"
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-medium mb-2">QUOTE FOR</h2>
              <p className="font-medium">{clientName}</p>
              <p className="text-gray-600">{clientEmail}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">QUOTE NUMBER</p>
              <p className="text-xl">{quoteNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium">ISSUE DATE</p>
              <p className="text-xl">{issueDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium">EXPIRATION DATE</p>
              <p className="text-xl">{expirationDate}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-16">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">DESCRIPTION</TableHead>
                <TableHead className="text-center">QTY</TableHead>
                <TableHead className="text-right">UNIT PRICE</TableHead>
                <TableHead className="text-right">AMOUNT</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index} className="align-top">
                  <TableCell>
                    <p className="font-medium mb-2">{item.title}</p>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-right">${item.unitPrice.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${item.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-16">
          <div className="w-1/3">
            <div className="flex justify-between py-4 border-b">
              <span className="font-medium">Subtotal</span>
              <span>${totalAmount}</span>
            </div>
            <div className="flex justify-between py-4">
              <span className="font-medium">Total</span>
              <span className="text-xl font-bold">${totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="mb-16">
          <h3 className="text-lg font-medium mb-6">Payment Information</h3>
          
          {/* Bank Details */}
          <div className="bg-gray-50 p-6 rounded-sm mb-8">
            <h4 className="text-sm font-medium mb-4">Bank Transfer Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Bank Name</p>
                <p className="font-medium">{bankDetails.bankName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Name</p>
                <p className="font-medium">{bankDetails.accountName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Number</p>
                <p className="font-medium">{bankDetails.accountNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Routing Number</p>
                <p className="font-medium">{bankDetails.routingNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">SWIFT Code</p>
                <p className="font-medium">{bankDetails.swiftCode}</p>
              </div>
            </div>
          </div>

          {/* Payment Link */}
          <div className="text-center">
            <a 
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 inline-flex items-center"
            >
              Click here to pay online
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-right text-sm text-gray-600">
          <p>Page 1 of 1</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ProfessionalQuoteTemplate() {
  const sampleQuote = {
    quoteNumber: "2732",
    issueDate: "AUG 25, 2022",
    expirationDate: "SEP 1, 2022",
    totalAmount: "100,000",
    companyLogo: "/placeholder.svg?height=80&width=200",
    companyName: "HUSSAIN IMTIAZ",
    clientName: "Bruce Wayne",
    clientEmail: "bruce@waynenterprises.com",
    status: "pending" as const,
    paymentType: "one-time" as const,
    items: [
      {
        title: "Brand Design (Logo, Colours & Typography)",
        description: "Crafting a digital branding presence for developing the website and establishing a digital presence.",
        quantity: 1,
        unitPrice: 25000,
        amount: 25000
      },
      {
        title: "Website Design (Desktop & Mobile optimized & Developers Handoff Guide)",
        description: "Building a responsive website design with developers handoff guide through zeplin.",
        quantity: 1,
        unitPrice: 25000,
        amount: 25000
      },
      {
        title: "Website Development in Webflow",
        description: "One of the most easy to develop and scaleable website builder, with a con of expensive hosting and yet a great choice for small businesses.",
        quantity: 1,
        unitPrice: 25000,
        amount: 25000
      },
      {
        title: "Lifetime Website Support",
        description: "This entitles you for any change, edit or update anything on the website. The merit of the change will be decided on mututal understanding.",
        quantity: 1,
        unitPrice: 25000,
        amount: 25000
      }
    ],
    bankDetails: {
      bankName: "Chase Bank",
      accountName: "Hussain Imtiaz LLC",
      accountNumber: "1234567890",
      routingNumber: "021000021",
      swiftCode: "CHASUS33XXX"
    },
    paymentLink: "https://paystack.com/pay/afrika-mom-braids-store"
  }

  return <Quote {...sampleQuote} />
}
