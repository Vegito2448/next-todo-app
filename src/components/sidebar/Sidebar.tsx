import { auth } from "@/auth";

import Image from "next/image";
import Link from "next/link";
import { IoCalendarOutline, IoCheckboxOutline, IoListOutline, IoPersonOutline, IoServerOutline, IoStorefrontOutline } from "react-icons/io5";
import { SidebarItem } from "./SidebarItem";
import { SingIn } from "./SingIn";
import { SingOut } from './SingOut';

const sideBarItems = [
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: <IoCalendarOutline size={30} />,
  },
  {
    href: '/dashboard/rest-todos',
    title: 'Rest TODOS',
    icon: <IoCheckboxOutline size={30} />,
  },
  {
    href: '/dashboard/server-todos',
    title: 'Server Actions',
    icon: <IoListOutline size={30} />,
  },
  {
    href: '/dashboard/cookies',
    title: 'Cookies',
    icon: <IoServerOutline size={30} />,
  },
  {
    href: '/dashboard/products',
    title: 'Products',
    icon: <IoStorefrontOutline size={30} />,
  },
  {
    href: '/dashboard/profile',
    title: 'Profile',
    icon: <IoPersonOutline size={30} />,
  },
];

const noUserImage = "https://res.cloudinary.com/vegito2448/image/upload/no-user.webp";

export const Sidebar = async () => {

  const session = await auth();

  const user = session?.user;

  const userImage = user?.image ?? noUserImage;

  const userName = user?.name ?? 'No User';

  const userRoles = user?.roles ?? [];

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">

          <Link href="/dashboard" title="home">

            <Image src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" alt="Logo"
              width={128} height={32}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">

          <Image src={userImage} alt="user" className="m-auto rounded-full object-cover"
            width={100} height={100}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
          {Boolean(userRoles.length) &&
            <span className="hidden text-gray-400 lg:block capitalize">
              {userRoles.join(', ')}</span>}
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {
            sideBarItems.map((item, index) => (
              <SidebarItem key={index + item.title} {...item} />
            ))
          }
        </ul>
      </div>

      {user && <SingOut />}
      {!user && <SingIn />}
    </aside>
  );
};
