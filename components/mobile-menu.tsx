import Link from "next/link";

interface MobileMenuProps {
  visible?: boolean;
}

function MobileMenu ({ visible }: MobileMenuProps): JSX.Element | null {
  if (!visible) {
    return null;
  }

  return (
    <div className="absolute top-8 flex flex-col w-56 py-5 bg-black border-gray-800">
      <ul className="flex flex-col gap-4">
        <li className="text-center">
          <Link className="px-3 text-white hover:underline" href="">Home</Link>
        </li>
        <li className="text-center">
          <Link className="px-3 text-white hover:underline" href="">Series</Link>
        </li>
        <li className="text-center">
          <Link className="px-3 text-white hover:underline" href="">Films</Link>
        </li>
        <li className="text-center">
          <Link className="px-3 text-white hover:underline" href="">New & Popular</Link>
        </li>
        <li className="text-center">
          <Link className="px-3 text-white hover:underline" href="">My List</Link>
        </li>
        <li className="text-center">
          <Link className="px-3 text-white hover:underline" href="">Browse by Languages</Link>
        </li>
      </ul>
    </div>
  );
}

export default MobileMenu;