import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
          Choose the perfect plan for your link management needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="relative overflow-hidden rounded-lg border bg-background p-8"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                {plan.price > 0 && <span className="text-muted-foreground">/mo</span>}
              </div>
              <Button className="w-full" variant={plan.featured ? "default" : "outline"}>
                Get Started
              </Button>
            </div>
            <ul className="space-y-3 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

const plans = [
  {
    name: "Free",
    price: 0,
    featured: false,
    features: [
      "Up to 50 links per month",
      "Basic Analytics",
      "Standard Support",
      "24-hour Statistics",
    ],
  },
  {
    name: "Pro",
    price: 10,
    featured: true,
    features: [
      "Unlimited links",
      "Advanced Analytics",
      "Priority Support",
      "API Access",
      "Team Collaboration",
    ],
  },
  {
    name: "Enterprise",
    price: 40,
    featured: false,
    features: [
      "Everything in Pro",
      "Dedicated Account Manager",
      "SLA Guarantee",
      "Custom Integration",
      "Advanced Security",
      "Bulk Link Creation",
    ],
  },
];