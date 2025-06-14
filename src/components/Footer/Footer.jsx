import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-[#1f1f2e] border-t border-gray-700 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  &copy; Copyright 2023. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>

          {/* Column: Company */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="mb-6 text-xs font-semibold uppercase text-gray-400">
                Company
              </h3>
              <ul>
                {["Features", "Pricing", "Affiliate Program", "Press Kit"].map(
                  (item) => (
                    <li key={item} className="mb-3">
                      <Link
                        className="text-base text-gray-200 hover:text-purple-400 transition"
                        to="/"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Column: Support */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="mb-6 text-xs font-semibold uppercase text-gray-400">
                Support
              </h3>
              <ul>
                {["Account", "Help", "Contact Us", "Customer Support"].map(
                  (item) => (
                    <li key={item} className="mb-3">
                      <Link
                        className="text-base text-gray-200 hover:text-purple-400 transition"
                        to="/"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Column: Legals */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="mb-6 text-xs font-semibold uppercase text-gray-400">
                Legals
              </h3>
              <ul>
                {["Terms & Conditions", "Privacy Policy", "Licensing"].map(
                  (item) => (
                    <li key={item} className="mb-3">
                      <Link
                        className="text-base text-gray-200 hover:text-purple-400 transition"
                        to="/"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
