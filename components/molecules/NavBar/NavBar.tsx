"use client";

import { cn } from "@/utils/cn";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const HIDE_THRESHOLD = 100;

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > HIDE_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Disclosure
        as="header"
        className={cn(
          "w-full flex justify-center sticky top-0 backdrop-filter backdrop-blur-2xl bg-opacity-50 z-50 px-5",
          "transition-transform duration-300 ease-in-out",
          scrolled ? "-translate-y-full" : "translate-y-0"
        )}
      >
        {({ open }) => (
          <>
            <div className="w-full max-w-4xl py-3">
              <div className="flex h-16 justify-between">
                <div className="z-10 flex">
                  <div
                    className={cn(
                      "flex flex-shrink-0 items-center text-primary dark:text-dark-primary text-xl"
                    )}
                  >
                    <Link href="/">
                      <div className="inline-flex items-center gap-2 hover:opacity-60">
                        <span className="font-bold">Palm Type</span>
                        <span className="opacity-70">Detection App</span>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="z-10 flex items-center gap-3">
                  {/* Mobile menu button */}
                  <div className="flex items-center gap-0">
                    <ThemeToggle />
                  </div>
                  {/* <DisclosureButton
                    className={cn(
                      "inline-flex items-center justify-center rounded-md text-primary hover:text-accent focus:outline-none focus:ring-0"
                    )}
                  >
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <X className="block h-7 w-7" aria-hidden="true" />
                    ) : (
                      <Menu className="block h-7 w-7" aria-hidden="true" />
                    )}
                  </DisclosureButton> */}
                </div>
                {/* <DesktopMenu /> */}
              </div>
            </div>

            {/* <DisclosureMenu /> */}
          </>
        )}
      </Disclosure>
    </>
  );
};
