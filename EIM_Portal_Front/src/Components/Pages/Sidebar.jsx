import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconBrandGoogleAnalytics,
  IconClipboardPlus
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { useEffect, useState } from "react";
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';

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
        <IconBrandGoogleAnalytics className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Add Records Manually",
      href: "/AddRecords",
      icon: (
        <IconClipboardPlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Go to Menu",
      href: "/",
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
                label: `${user && user.fullName}`,
                href: "#",
                icon: (
                  <img
                    src={user && user.imageUrl}
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

  const [AllTicketsGiven, setAllTicketsGiven] = useState([])

  const GetAllTickets=async()=>{
    await axios.get("http://127.0.0.1:8000/sendSixTicketsOnly").then((res)=>{
      setAllTicketsGiven(res.data)
    }).catch((err)=>{
      console.log(`Error While Making Request:${err}`);
    })
  }

  useEffect(()=>{
 GetAllTickets()
  },[])


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 w-full bg-white border border-neutral-200">

    {AllTicketsGiven && AllTicketsGiven.map((Ticket)=>{
      return(<>
      
      <div className="w-80 rounded-[10px] bg-white p-4 !pt-20 sm:p-6" style={{ border: '3px solid black', height: 'fit-content', marginLeft: '30px', marginTop: '20px' }}>
        
      <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
            <a href={Ticket.LINK}>VISIT TICKET</a>
      </span>

      <p>{Ticket.KEY}</p>

        <time className="block text-xs text-gray-500">
         {Ticket.CREATED}
        </time>

        <a href="#">
          <h3 className="mt-0.5 text-lg font-medium text-gray-900">
            {Ticket.SUMMARY}
          </h3>
        </a>

        <div className="mt-4 flex flex-wrap gap-1">
          <span
            className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600"
          >
            {Ticket.ISSUETYPE}
          </span>

          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
            {Ticket.TECH_TYPE}
          </span>

          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
            {Ticket.TECH_VERSION}
          </span>

          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
            {Ticket.DEPARTMENT}
          </span>

          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
            {Ticket.IPADDRESS}
          </span>


          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
            {Ticket.ENV}
          </span>

        </div>
      </div>
      
      </>)
    })}

      

    </div>
  );
};