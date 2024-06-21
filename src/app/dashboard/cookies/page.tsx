import { cookies } from 'next/headers';

import { TabBar } from "@/components";

export const metadata = {
  title: 'Cookies Page',
  description: 'This is the cookies page description',
};

export default function CookiesPage() {
  const cookieStore = cookies();
  const cookieTab = cookieStore.get('currentTab')?.value ?? 1;

  console.log(`🚀 ~ CookiesPage ~ cookieTab:`, cookieTab);



  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div className="flex flex-col">
        <span className="text-3xl">Tabs</span>
        < TabBar
          currentTab={+cookieTab}
        />
      </div>
    </div>
  );
}