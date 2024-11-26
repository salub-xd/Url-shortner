import PricingCard from "./Pricing-Card";

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
          <PricingCard key={plan.name} plans={plan} />
        ))}
      </div>
    </div>
  );
}

interface PricingCardProps {
  name: string;
  price: number;
  featured: boolean;
  features: string[]
}

const plans: PricingCardProps[] = [
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