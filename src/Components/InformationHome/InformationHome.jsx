import { Link } from "react-router-dom";
import clockIcon from "../../assets/images/clock.svg";
import giftIcon from "../../assets/images/gift.svg";
import packageIcon from "../../assets/images/package.svg";
import refreshIcon from "../../assets/images/refresh-cw.svg";

export default function InformationHome() {
  const features = [
    {
      icon: clockIcon,
      title: "10 minute grocery now",
      description:
        "Get your order delivered to your doorstep at the earliest from FreshCart pickup stores near you.",
    },
    {
      icon: giftIcon,
      title: "Best Prices & Offers",
      description:
        "Cheaper prices than your local supermarket, great cashback offers to top it off. Get best prices & offers.",
    },
    {
      icon: packageIcon,
      title: "Wide Assortment",
      description:
        "Choose from 5000+ products across food, personal care, household, bakery, veg and non-veg & other categories.",
    },
    {
      icon: refreshIcon,
      title: "Easy Returns",
      description:
        "Not satisfied with a product? Return it at the doorstep & get a refund within hours. No questions asked.",
    },
  ];

  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-4">
                <img
                  src={feature.icon}
                  alt={`${feature.title} icon`}
                  className="h-8 w-8 text-emerald-500"
                />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {feature.description}
                {feature.title === "Easy Returns" && (
                  <Link
                    to=""
                    className="ml-1 text-emerald-700 underline hover:text-emerald-800 font-medium"
                  >
                    policy
                  </Link>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
