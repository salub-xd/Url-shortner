import React from "react";
import Link from "next/link";

export const Footer = () => {
  const routes = [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const links = [
    { label: 'Twitter', href: 'https://twitter.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
  ];

  return (
    <footer className="border-y bg-white mt-5 w-full dark:bg-black">
      <div className="flex px-5 py-2 justify-around text-black dark:text-white">
        <div className="text-center flex flex-col justify-center">
          <Link href={'/'} className="text-xl sm:text-3xl">kisaner</Link>
        </div>
        <nav className="flex flex-col justify-center items-center text-center px-4">
          <ul>
            {routes.map((route) => (
              <li key={route.href} className="text-xs sm:text-lg">
                <Link href={route.href}>{route.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="flex flex-col justify-center items-center text-center px-4">
          <ul>
            {links.map((link) => (
              <li key={link.href} className="text-xs sm:text-lg">
                <Link href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit our ${link.label} page`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};