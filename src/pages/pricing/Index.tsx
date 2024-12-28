import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const PricingPage = () => {
  const pricingTiers = [
    {
      name: "Free",
      price: "0",
      period: "per month",
      features: [
        "10 Invoices Per Month",
        "Multiple Businesses",
        "Unlimited Clients",
        "Email Reminders",
      ],
      buttonText: "Select Plan",
      buttonVariant: "default" as const,
    },
    {
      name: "Basic",
      price: "1,500",
      period: "per month (₦15,000/yr)",
      features: [
        "Unlimited Invoices",
        "Multiple Businesses",
        "Unlimited Clients",
        "Email Reminders",
        "API Access & Automations",
        "Payment Gateways Integration",
      ],
      buttonText: "Select Plan",
      buttonVariant: "default" as const,
    },
    {
      name: "Premium",
      price: "2,500",
      period: "per month (₦25,000/yr)",
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
      buttonText: "Select Plan",
      buttonVariant: "default" as const,
    },
  ];

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center mb-8">
            <h1 className="text-2xl font-semibold tracking-tight">
              Choose Your Plan
            </h1>
            <p className="text-sm text-muted-foreground">
              Select the perfect plan for your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto w-full">
            {pricingTiers.map((tier) => (
              <Card key={tier.name} className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                    {tier.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-8">
                    <span className="text-4xl font-bold">₦{tier.price}</span>
                    <span className="text-gray-500 ml-2">{tier.period}</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="default"
                    className="w-full bg-primary hover:bg-primary/90 transition-colors duration-200"
                  >
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
