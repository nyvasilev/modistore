import { requireAdmin } from "@/lib/auth-guard";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";

export const metadata: Metadata = {
  title: "Update User",
};

const AdminUserUpdateaPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  await requireAdmin();
  const { id } = await props.params;
  const user = await getUserById(id);

  if (!user) notFound();

  return <div>Update</div>;
};

export default AdminUserUpdateaPage;
