import { auth } from "@/auth";
import { WidgetItem } from "@/components";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("api/auth/signin");
  }

  revalidatePath('/dashboard/profile');

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

      {/* TODO: src/components <WidgetItem /> */}
      <WidgetItem
        title="User Connected Server Side"
      >
        <div className="flex flex-col p-8 justify-center text-center">
          <span>{session.user.name}</span>
          <span>{session.user.image}</span>
          <span>{session.user.email}</span>
        </div>
      </WidgetItem>
      {/* TODO: Fin <WidgetItem /> */}

    </div>
  );
};

export default DashboardPage;