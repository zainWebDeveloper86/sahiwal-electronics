import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data.jsx";

const Footer = () => {
  return (
    <div className="bg-ink text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-voltage py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-display font-semibold md:w-2/5">
          <span className="text-copper">Subscribe</span> for news,{" "}
          <br />
          events and offers
        </h1>
        <div>
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-ink font-body sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none bg-white"
          />
          <button className="bg-copper hover:opacity-90 duration-300 px-5 py-2.5 rounded-md text-white font-body font-[600] md:w-auto w-full">
            Submit
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <span className="font-display font-[700] text-[22px] text-white">
            Sahiwal <span className="text-copper">Electronics</span>
          </span>
          <br />
          <p className="font-body text-white/70 text-sm">
            Your trusted multi-vendor marketplace for electronics — genuine
            products, verified sellers.
          </p>
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer text-white/70 hover:text-copper transition-colors" />
            <AiOutlineTwitter size={25} className="ml-4 cursor-pointer text-white/70 hover:text-copper transition-colors" />
            <AiFillInstagram size={25} className="ml-4 cursor-pointer text-white/70 hover:text-copper transition-colors" />
            <AiFillYoutube size={25} className="ml-4 cursor-pointer text-white/70 hover:text-copper transition-colors" />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-display font-semibold text-white">Company</h1>
          {footerProductLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-white/60 hover:text-copper duration-300 font-body text-sm cursor-pointer leading-6"
                to={link.link || "#"}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-display font-semibold text-white">Shop</h1>
          {footercompanyLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-white/60 hover:text-copper duration-300 font-body text-sm cursor-pointer leading-6"
                to={link.link || "#"}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-display font-semibold text-white">Support</h1>
          {footerSupportLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-white/60 hover:text-copper duration-300 font-body text-sm cursor-pointer leading-6"
                to={link.link || "#"}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-white/50 font-body text-sm pb-8 border-t border-white/10 mt-4">
        <span>© 2026 Sahiwal Electronics. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full text-white/40">
          Cash on Delivery Available
        </div>
      </div>
    </div>
  );
};

export default Footer;