'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  href: string;
  title: string;
  icon: JSX.Element;
}

export const SidebarItem = ({ icon, title, href }: SidebarItemProps) => {
  const isActive = usePathname() === href;

  return (
    <li>
      <Link href={href} className={`px-4 py-3 flex items-center space-x-4 rounded-2xl ${isActive ? 'relative text-white bg-gradient-to-r from-sky-600 to-cyan-400 ' : 'hover:bg-gray-700 hover:text-white text-gray-600 group'}`}>
        <span
          className="mr-2"
        >{icon}</span>
        {title}
      </Link>
    </li>
  );
};
