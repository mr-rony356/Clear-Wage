import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-5  container mx-auto ">
      <div className="max-w-[1320px] mx-auto flex justify-between lg:items-center text-sm flex-col lg:flex-row gap-6">
        <div>Copyrights © 2025 clearwage.co - All Rights Reserved</div>
        <Link
          to="/privacy-policy"
          className="text-white hover:text-[#b59658] hover:underline"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
