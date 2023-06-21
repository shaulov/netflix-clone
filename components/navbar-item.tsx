import Link from "next/link";

interface NavbarItemProps {
  label: string;
}

function NavbarItem ({ label }: NavbarItemProps): JSX.Element {
  return (
    <Link 
      className="text-white hover:text-gray-300 transition"
      href="#"
    >
      {label}
    </Link>
  )
}

export default NavbarItem;