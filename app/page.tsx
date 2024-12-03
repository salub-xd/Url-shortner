import { BarChart3, Link, QrCode, Shield } from "lucide-react"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import ContactPage from "@/components/app/Contact";
import PricingPage from "@/components/app/Pricing";
import { UrlShortnerForm } from "@/components/app/Url-Shortner-Form";

export default function Home() {

  return (
    <div className="mt-10  mx-4 px-4 py-8 rounded-md sm:mx-auto ">
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center space-y-4 mb-12 max-w-lg">
            <div className="flex items-center justify-center mb-6">
              <Link className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Simplify Your Links
            </h1>
            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
              Transform long, unwieldy URLs into clean, shareable links with our
              powerful URL shortener service.
            </p>
          </div>
          <div className="w-full max-w-md mx-auto">
            <UrlShortnerForm />
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-4 max-w-5xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
              >
                <feature.icon className="h-8 w-8 mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight lg:text-4xl mb-4">
                Powerful Dashboard
              </h2>
              <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
                Track, analyze, and manage all your shortened links in one place.
              </p>
            </div>

            <div className="relative rounded-lg border bg-background shadow-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=630"
                alt="Dashboard Preview"
                width={1200}
                height={630}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
            </div>
          </div>
        </section>
        {/* <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section> */}
        <PricingPage />
        <Separator />
        <ContactPage />
      </div>
    </div>
  )
}


const features = [
  {
    title: "Custom URLs",
    description: "Create branded links with your own custom slugs.",
    icon: Link,
  },
  {
    title: "QR Codes",
    description: "Generate QR codes for your shortened links instantly.",
    icon: QrCode,
  },
  {
    title: "Link Protection",
    description: "Secure your links with password protection.",
    icon: Shield,
  },
  {
    title: "Analytics",
    description: "Track clicks and analyze link performance.",
    icon: BarChart3,
  },
];

// const stats = [
//   {
//     value: "10M+",
//     label: "Links Shortened",
//   },
//   {
//     value: "1M+",
//     label: "Active Users",
//   },
//   {
//     value: "99.9%",
//     label: "Uptime",
//   },
// ];