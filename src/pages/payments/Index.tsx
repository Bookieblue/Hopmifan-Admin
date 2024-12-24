import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet } from "lucide-react";

export default function Payments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Payment Integration</h1>
        <p className="text-muted-foreground mt-2">Connect your payment gateways to start accepting payments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:border-mint-200 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-mint-500" />
                Stripe
              </CardTitle>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
            <CardDescription>Accept credit card payments with Stripe.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Credit & debit cards</li>
              <li>• International payments</li>
              <li>• Secure payment processing</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:border-mint-200 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-mint-500" />
                PayPal
              </CardTitle>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
            <CardDescription>Accept payments through PayPal.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• PayPal balance</li>
              <li>• International support</li>
              <li>• Buyer protection</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:border-mint-200 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-mint-500" />
                Bank Transfer
              </CardTitle>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <CardDescription>Accept direct bank transfers.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Direct deposits</li>
              <li>• Low transaction fees</li>
              <li>• Secure transfers</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}