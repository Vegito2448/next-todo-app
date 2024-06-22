'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const noUserImage = "https://res.cloudinary.com/vegito2448/image/upload/no-user.webp";

export default function ProfilePage() {

  const router = useRouter();

  const { data: session } = useSession();


  const user = session?.user;

  const userImage = user?.image ?? noUserImage;

  const userName = user?.name ?? 'No User';

  const userEmail = user?.email ?? 'No Email';

  const userRoles = user?.roles ?? [];

  useEffect(() => {
    if (!session) router.push('/dashboard');
  }, [session]);

  return (
    <div>
      <h1>Profile Page</h1>
      <hr
        className="my-4 border-t-2 border-gray-200 w-1/2"
      />
      <div className="flex flex-col">
        <span>{userName}</span>
        <span>{userEmail}</span>
        <span>{userImage}</span>
        <span>{userRoles.join(', ')}</span>
      </div>
    </div>
  );
}