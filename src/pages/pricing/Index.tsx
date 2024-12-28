import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen bg-background">
      <header className="w-full p-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/43d04b44-fc73-46eb-8543-89f240871e1d.png" 
            alt="Cordlo Logo" 
            className="h-8 w-auto"
          />
        </Link>
        <Link 
          to="#" 
          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          onClick={() => window.open('mailto:support@cordlo.com')}
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Support
        </Link>
      </header>

      <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl space-y-8 py-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple & Affordable Pricing.</h2>
            <p className="text-lg text-gray-600">
              We offer completely transparent and affordable pricing packages that can
              easily scale with your business needs and requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                    variant={tier.buttonVariant}
                    className="w-full bg-[#0F2937] hover:bg-[#1a3c4e] text-white transition-all duration-200 transform hover:translate-y-[-2px] hover:shadow-lg"
                  >
                    {tier.buttonText}
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