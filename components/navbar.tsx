import { useCallback, useState } from "react";
import Image from "next/image";
import { BsChevronDown } from "react-icons/bs";
import NavbarItem from "./navbar-item";
import MobileMenu from "./mobile-menu";

function Navbar () {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  return (
    <nav className="fixed z-40 w-full">
      <div
        className="
          flex
          flex-row
          items-center
          px-4
          md:px-16
          py-6
          bg-zinc-900
          bg-opaciry-90
          transition
          duration-500
        "
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
            <BsChevronDown className="text-white transition" />
          </button>
          <MobileMenu visible={showMobileMenu} />
        </div>
      </div>
    </nav>
  ); 
}

export default Navbar;