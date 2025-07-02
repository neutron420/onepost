import { useState } from "react"
import { Button } from "@/components/ui/button1"
import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"

interface Feature {
  name: string
  description: string
  included: boolean
}

interface PricingTier {
  name: string
  price: {
    monthly: number
    yearly: number
  }
  description: string
  features: Feature[]
  highlight?: boolean
  badge?: string
  icon: React.ReactNode
}

interface PricingSectionProps {
  tiers: PricingTier[]
  className?: string
}

function PricingSection({ tiers, className }: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section
      className={cn(
        "relative bg-white",
        "pt-0 pb-4 px-4 md:pb-6 lg:pb-8",
        "overflow-hidden",
        className,
      )}
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-4 mb-8">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <img
              src="https://www.shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg"
              alt="One Post Logo"
              className="h-8 w-8"
            />
            <h2 className="text-4xl font-bold text-gray-900 text-center">
              OnePost 
            </h2>
          </div>

          {/* Monthly/Yearly Toggle */}
          <div className="inline-flex items-center p-1 bg-gray-100 rounded-full">
            {["Monthly", "Yearly"].map((period) => (
              <button
                key={period}
                onClick={() => setIsYearly(period === "Yearly")}
                className={cn(
                  "px-6 py-2 text-sm font-medium rounded-full transition-all duration-200",
                  (period === "Monthly" && !isYearly) || (period === "Yearly" && isYearly)
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900",
                )}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative group",
                "rounded-2xl transition-all duration-200",
                "flex flex-col",
                "bg-white",
                "border border-gray-200",
                "hover:shadow-lg hover:-translate-y-1",
                tier.highlight && "ring-2 ring-gray-900 shadow-xl"
              )}
            >
              {tier.badge && tier.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="px-3 py-1 text-xs font-medium bg-gray-900 text-white border-none">
                    {tier.badge}
                  </Badge>
                </div>
              )}

              <div className="p-8 flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gray-50">
                    {tier.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {tier.name}
                  </h3>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-gray-900">
                      ${isYearly ? tier.price.yearly : tier.price.monthly}
                    </span>
                    <span className="text-gray-500 text-sm font-medium">
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600 text-sm">
                    {tier.description}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {tier.features.map((feature) => (
                    <div key={feature.name} className="flex gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <CheckIcon 
                          className={cn(
                            "w-4 h-4",
                            feature.included
                              ? "text-green-600"
                              : "text-gray-300"
                          )} 
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {feature.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 pt-0">
                <Button
                  className={cn(
                    "w-full h-11 text-sm font-medium transition-colors duration-200",
                    tier.highlight
                      ? "bg-gray-900 hover:bg-gray-800 text-white"
                      : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-400"
                  )}
                >
                  <span className="flex items-center justify-center gap-2">
                    {tier.highlight ? "Buy now" : "Get started"}
                    <ArrowRightIcon className="w-4 h-4" />
                  </span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { PricingSection }
