import Image from "next/image";
import NavbarItem from "./navbar-item";

function Navbar () {
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
            <NavbarItem label="Browse by languages" /> 
          </li>
        </ul>
      </div>
    </nav>
  ); 
}

export default Navbar;