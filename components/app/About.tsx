import { Award, Users } from "lucide-react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
            About Us
          </h1>
          <p className="text-lg text-muted-foreground">
            We are on a mission to make the web more accessible and manageable.
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            Founded in 2024, URL Shortener has been at the forefront of link management
            solutions. We believe in making the internet more navigable through
            simple, efficient tools that help people and businesses share links
            effectively.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="flex items-center gap-4">
              <Users className="h-12 w-12 text-primary" />
              <div>
                <h3 className="text-xl font-semibold">1M+ Users</h3>
                <p className="text-muted-foreground">Trust our service daily</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Award className="h-12 w-12 text-primary" />
              <div>
                <h3 className="text-xl font-semibold">#1 Rated</h3>
                <p className="text-muted-foreground">Link management platform</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Vision</h2>
          <p>
            We envision a web where sharing links is seamless and efficient,
            enabling better communication and collaboration across the digital
            landscape. Our commitment to innovation and user experience drives
            everything we do.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
          <ul className="space-y-4">
            <li>
              <strong>Simplicity</strong> - We believe in making complex things simple.
            </li>
            <li>
              <strong>Security</strong> - Your trust and data security are our top priorities.
            </li>
            <li>
              <strong>Innovation</strong> - We continuously evolve to meet the changing needs of the web.
            </li>
            <li>
              <strong>Reliability</strong> - We provide a service you can count on, 24/7.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}