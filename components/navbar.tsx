import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import NavbarItem from "./navbar-item";
import MobileMenu from "./mobile-menu";
import AccountMenu from "./account-menu";
import { TOP_OFFSET } from "@/const";

function Navbar () {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccounMenu, setShowAccounMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccounMenu = useCallback(() => {
    setShowAccounMenu((current) => !current);
  }, []);

  return (
    <nav className="fixed z-40 w-full">
      <div
        className={`
          flex
          flex-row
          items-center
          px-4
          md:px-16
          py-6
          transition
          duration-500
          ${showBackground ? 'bg-zinc-900 bg-opaciry-90' : ''}
        `}
      >
        <Image className="w-auto h-4 lg:h-7" src="/images/logo.png" width={178} height={48} alt="Logo" priority />
        <ul className="hidden lg:flex flex-row gap-7 ml-8">
          <li>
            <NavbarItem label="Home" /> 
          </li>
          <li>
            <NavbarItem label="Series" /> 
          </li>
          <li>
            <NavbarItem label="Films" /> 
          </li>
          <li>
            <NavbarItem label="New & Popular" /> 
          </li>
          <li>
            <NavbarItem label="My List" /> 
          </li>
          <li>
            <NavbarItem label="Browse by Languages" /> 
          </li>
        </ul>
        <div className="relative lg:hidden flex flex-row items-center gap-2 ml-8">
          <button className="flex flex-row items-center gap-2 cursor-pointer" onClick={toggleMobileMenu}>
            <span className="text-white text-sm">Browse</span>
            <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
          </button>
          <MobileMenu visible={showMobileMenu} />
        </div>
        <ul className="flex flex-row items-center gap-7 ml-auto">
          <li>
            <Link className="text-gray-200 hover:text-gray-300" href="">
              <span className="sr-only">Search</span>
              <BsSearch />
            </Link>
          </li>
          <li>
            <Link className="text-gray-200 hover:text-gray-300" href="">
              <span className="sr-only">Notification</span>
              <BsBell />
            </Link>
          </li>
          <li className="relative">
            <button className="relative flex flex-row items-center gap-2" onClick={toggleAccounMenu}>
              <span className="sr-only">Profile</span>
              <Image className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden" src="/images/default-blue.png" width={24} height={24} alt="Profile photo" />
              <BsChevronDown className={`text-white transition ${showAccounMenu ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            <AccountMenu visible={showAccounMenu} />
          </li>
        </ul>
      </div>
    </nav>
  ); 
}

export default Navbar;