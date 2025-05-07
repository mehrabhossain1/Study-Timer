"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SubscribeModal from "../SubscribeModal";
import { Menu } from "lucide-react"; // for hamburger icon
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // shadcn sheet

const links = [
  { name: "Home", path: "/" },
  { name: "Video/Photo Gallery", path: "/gallery" },
  { name: "Guidelines", path: "/guidelines" },
  { name: "Case Presentations", path: "/cases" },
  { name: "BSLCTRcon", path: "/bslctrcon" },
  { name: "About US", path: "/about" },
  { name: "Donation", path: "/donate" },
  { name: "Subscribe", path: "/subscribe" },
];

const NavLinksBar = () => {
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  const handleLinkClick = (linkName: string) => {
    if (linkName === "Subscribe") {
      setShowSubscribeModal(true);
      return false;
    }
    return true;
  };

  return (
    <>
      <nav className="w-full bg-sky-500 shadow-sm sticky top-0 z-50 lg:static">
        <div className="flex items-center justify-between px-4 py-3 md:hidden">
          {/* Mobile: Hamburger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-sky-500 text-white border-none"
            >
              <div className="flex flex-col gap-4 mt-8">
                {links.map((link, index) => {
                  if (link.name === "Subscribe") {
                    return (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start text-white"
                        onClick={() => setShowSubscribeModal(true)}
                      >
                        {link.name}
                      </Button>
                    );
                  }
                  return (
                    <Link
                      key={index}
                      to={link.path}
                      onClick={() => handleLinkClick(link.name)}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-white"
                      >
                        {link.name}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="text-white font-bold text-xl">
            Liver Disease Awareness
          </div>
        </div>

        {/* Desktop: Full Nav */}
        <div className="hidden md:flex items-center justify-between divide-x divide-sky-300">
          {links.map((link, index) => {
            if (link.name === "Subscribe") {
              return (
                <div key={index} className="flex-grow">
                  <Button
                    variant="ghost"
                    className="rounded-none px-6 py-4 text-white hover:bg-sky-400 w-full text-sm font-medium"
                    onClick={() => setShowSubscribeModal(true)}
                  >
                    {link.name}
                  </Button>
                </div>
              );
            }

            return (
              <Link key={index} to={link.path} className="flex-grow">
                <Button
                  variant="ghost"
                  className="rounded-none px-6 py-4 text-white hover:bg-sky-400 w-full text-sm font-medium"
                  onClick={() => handleLinkClick(link.name)}
                >
                  {link.name}
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>

      <SubscribeModal
        isOpen={showSubscribeModal}
        onClose={() => setShowSubscribeModal(false)}
      />
    </>
  );
};

export default NavLinksBar;
