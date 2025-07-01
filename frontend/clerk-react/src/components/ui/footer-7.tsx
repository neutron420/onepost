import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Features", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Sales", href: "#" },
      { name: "Advertise", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="w-5 h-5" />, href: "#", label: "Instagram" },
  { icon: <FaGithub className="w-5 h-5" />, href: "https://github.com", label: "GitHub" },
  { icon: <FaTwitter className="w-5 h-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

export const Footer7 = ({
  logo = {
    url: "#",
    src: "https://www.shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "One Post",
  },
  sections = defaultSections,
  description = "A collection of components for your startup business or side project.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2025 One Post. All rights reserved.",
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex w-full flex-col justify-between gap-8 lg:flex-row lg:items-start">
          <div className="flex w-full flex-col justify-between gap-4 lg:items-start lg:max-w-sm">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <a href={logo.url} className="flex items-center gap-2">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-8 w-8"
                />
                <h2 className="text-xl font-semibold text-gray-900">{logo.title}</h2>
              </a>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
            <ul className="flex items-center space-x-4 text-gray-500">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="hover:text-gray-900 transition-colors">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-12 lg:max-w-2xl">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-3 font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  {section.title}
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a 
                        href={link.href}
                        className="hover:text-gray-900 transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <p className="text-xs text-gray-500 order-2 md:order-1">{copyright}</p>
          <ul className="order-1 md:order-2 flex flex-col gap-2 md:flex-row md:gap-6">
            {legalLinks.map((link, idx) => (
              <li key={idx}>
                <a 
                  href={link.href}
                  className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};