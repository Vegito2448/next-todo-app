import { signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { CiLogout } from "react-icons/ci";

export const SingOut = () => {
  return (
    <form action={async () => {
      'use server';
      await signOut();
      revalidatePath('/');
    }} className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
      <button
        type="submit"
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <CiLogout />
        <span className="group-hover:text-gray-700">Logout</span>
      </button>
    </form>
  );
};
