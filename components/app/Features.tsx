import { BarChart, Link, Shield, Zap } from "lucide-react";

export default function Features() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
          Powerful Features
        </h1>
        <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
          Everything you need to manage and optimize your links effectively.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="relative overflow-hidden rounded-lg border bg-background p-8"
          >
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
            </div>
            <p className="mt-4 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    title: "Lightning Fast Processing",
    description: "Generate shortened URLs instantly with our optimized infrastructure. No waiting, no delays.",
    icon: Zap,
  },
  {
    title: "Advanced Analytics",
    description: "Track clicks, geographic data, and referral sources with our comprehensive analytics dashboard.",
    icon: BarChart,
  },
  {
    title: "Custom Links",
    description: "Create branded, memorable links that reflect your identity and enhance recognition.",
    icon: Link,
  },
  {
    title: "Enterprise Security",
    description: "Bank-level encryption and security measures to protect your links and data.",
    icon: Shield,
  },
];