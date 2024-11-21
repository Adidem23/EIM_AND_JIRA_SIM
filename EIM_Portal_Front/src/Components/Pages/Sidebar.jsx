import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { useEffect, useState } from "react";
import { useUser } from '@clerk/clerk-react';
// import axios from 'axios';

export function SidebarDemo() {
  const { user } = useUser();
  

  const [open, setOpen] = useState(false);


  const links = [
    {
      label: "All Tickets",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Charts",
      href: "/charts",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];


  return (
    (<div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-10xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[100vh]"
      )}>
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: `${user.fullName}`,
                href: "#",
                icon: (
                  <img
                    src={user.imageUrl}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar" />
                ),
              }} />
          </div>
        </SidebarBody>
      </Sidebar>
      <AllTickets />
    </div>)
  );
}
export const Logo = () => {
  return (
    (<a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div
        className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre">
        EIM AND JIRA PORTAL
      </motion.span>
    </a>)
  );
};
export const LogoIcon = () => {
  return (
    (<a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div
        className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </a>)
  );
};

const AllTickets = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 w-full bg-white border border-neutral-200">

      <div className="w-60 rounded-[10px] bg-white p-4 !pt-20 sm:p-6" style={{ border: '3px solid black', height: 'fit-content', marginLeft: '30px', marginTop: '30px' }}>
        <time className="block text-xs text-gray-500">
          29th June 2019
        </time>

        <a href="#">
          <h3 className="mt-0.5 text-lg font-medium text-gray-900">
            Next.js crash course by KhateykoBan
          </h3>
        </a>

        <div className="mt-4 flex flex-wrap gap-1">
          <span
            className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600"
          >
            Snippet
          </span>

          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
            JavaScript
          </span>
        </div>
      </div>

    </div>
  );
};