import React from "react";
import american from "../../assets/images/american-express.svg";
import masterCard from "../../assets/images/mastercard.svg";
import paypal from "../../assets/images/paypal.svg";
import visa from "../../assets/images/visa.svg";
import appStore from "../../assets/images/appstore-btn.svg";
import googlePlay from "../../assets/images/googleplay-btn.svg";

export default function Footer() {
  return (
    <div className="bg-gray-100 py-8 mt-10 font-sans">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800">
            Get the FreshCart app
          </h2>
          <p className="text-gray-500 mt-1 mb-6">
            We will send you a link, open it on your phone to download the app.
          </p>

          {/* Email input and Share button flex container */}
          <div className="flex items-center space-x-2">
            <input
              type="email"
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Email.."
            />
            <button
              type="submit"
              className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 whitespace-nowrap"
            >
              Share App Link
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        <div className="flex justify-between items-center flex-wrap gap-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium">Payment Partners</span>
            <div className="flex items-center space-x-2">
              <img src={american} className="h-6" alt="American Express" />
              <img src={masterCard} className="h-6" alt="MasterCard" />
              <img src={paypal} className="h-6" alt="PayPal" />
              <img src={visa} className="h-6" alt="Visa" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium">
              Get deliveries with FreshCart
            </span>
            <div className="flex items-center space-x-2">
              <a href="#" aria-label="Download on the App Store">
                <img src={appStore} className="h-10" alt="App Store button" />
              </a>
              <a href="#" aria-label="Get it on Google Play">
                <img
                  src={googlePlay}
                  className="h-10"
                  alt="Google Play button"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <span className="text-lg text-gray-500">
            © 2025 FreshCart E-Commerce. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
}
