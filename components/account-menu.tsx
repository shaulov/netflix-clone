import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/use-current-user";

interface AccountMenuProps {
  visible?: boolean
}

function AccountMenu ({ visible }: AccountMenuProps): JSX.Element | null {
  const { data } = useCurrentUser();

  if (!visible) {
    return null;
  }
  return (
    <ul className="absolute top-14 right-0 flex flex-col gap-3 w-56 py-5 bg-black border-2 border-gray-800">
      <li className="group/item flex flex-row items-center gap-3 w-full px-3">
        <Image className="w-8 rounded-md" src="/images/default-blue.png" width={32} height={32} alt="Profile photo" />
        <Link className="group-hover/item:underline text-sm text-white" href="#">{data?.name}</Link>
      </li>
      <li>
        <hr className="h-px my-2 bg-gray-600 border-0" />
      </li>
      <li className="px-3 text-sm text-white text-center">
        <button className="hover:underline" onClick={() => signOut()}>Sign out of Netflix</button>
      </li>
    </ul>
  );
}

export default AccountMenu;