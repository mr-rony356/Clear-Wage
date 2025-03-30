import * as React from "react";
import { Link } from "react-router-dom";
import {
  Bars3Icon as MenuIcon,
  XMarkIcon as XIcon,
} from "@heroicons/react/24/outline";

function DrawerAppBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="relative z-[1000]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-[70px] lg:py-[18px] py-[8px]">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="md:flex-1 md:ml-[180px]">
            <Link to="/">
              <h1 className="text-[28px] font-[700] leading-[42px] text-white">
                ClearWage
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-[30px]">
            <Link
              to="/"
              className="text-[13px] font-bold hover:text-[gold] tracking-[1px] text-white"
            >
              HOME
            </Link>
            <Link
              to="/about"
              className="text-[13px] font-bold hover:text-[gold] tracking-[1px] text-white"
            >
              ABOUT
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white p-2">
              {mobileMenuOpen ? (
                <XIcon className="h-10 w-10" />
              ) : (
                <MenuIcon className="h-10 w-10" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 ease-in-out z-[9999] ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMobileMenu}
      >
        <div
          className={`fixed inset-x-0 bottom-0 bg-gradient-to-b from-gray-900 to-black transform transition-transform duration-300 ease-in-out z-[10000] ${
            mobileMenuOpen ? "translate-y-0" : "translate-y-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8 space-y-2">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
            </div>
            <Link
              to="/"
              className="block text-[16px] font-bold text-white hover:text-[gold] tracking-[1px] text-center py-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              to="/about"
              className="block text-[16px] font-bold text-white hover:text-[gold] tracking-[1px] text-center py-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              ABOUT
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DrawerAppBar;
