import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    price: "₦0",
    period: "per month",
    features: [
      "10 Invoices Per Month",
      "Multiple Businesses",
      "Unlimited Clients",
      "Email Reminders",
    ],
    buttonText: "Sign Up",
    buttonVariant: "outline" as const,
  },
  {
    name: "Basic",
    price: "₦1,500",
    period: "per month",
    yearlyPrice: "(₦15,000/yr)",
    features: [
      "Unlimited Invoices",
      "Multiple Businesses",
      "Unlimited Clients",
      "Email Reminders",
      "API Access & Automations",
      "Payment Gateways Integration",
    ],
    buttonText: "Try For Free",
    buttonVariant: "default" as const,
    popular: true,
  },
  {
    name: "Premium",
    price: "₦2,500",
    period: "per month",
    yearlyPrice: "(₦25,000/yr)",
    features: [
      "Unlimited Invoices",
      "Unlimited Estimates",
      "Unlimited Expenses",
      "Unlimited Clients",
      "Multiple Businesses",
      "Account Users & Teams",
      "API Access & Automations",
      "Email & Whatsapp Reminders",
      "Recurring Invoices & Expenses",
      "Payment Gateways Integration",
    ],
    buttonText: "Try For Free",
    buttonVariant: "default" as const,
  },
];

export default function PricingPage() {
  return (
    <div className="w-full">
      <div className="text-center mb-8 md:mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
          Simple & Affordable Pricing.
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          We offer completely transparent and affordable pricing packages that can
          easily scale with your business needs and requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col h-full ${
              plan.popular ? "border-primary shadow-lg" : ""
            }`}
          >
            <CardHeader className="flex-none space-y-4">
              <h3 className="text-xl md:text-2xl font-semibold leading-none tracking-tight">
                {plan.name}
              </h3>
              <div>
                <span className="text-3xl md:text-4xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground ml-1">
                  {plan.period}
                </span>
                {plan.yearlyPrice && (
                  <div className="text-sm text-muted-foreground">
                    {plan.yearlyPrice}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex-none pt-4">
              <Button
                variant={plan.buttonVariant}
                className="w-full"
                size="lg"
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}