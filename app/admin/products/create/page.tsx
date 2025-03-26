import { requireAdmin } from "@/lib/auth-guard";
import { Metadata } from "next";
import ProductForm from "@/components/admin/product-form";

export const metadata: Metadata = {
  title: "Create Product",
};

const CreateProductaPage = async () => {
  await requireAdmin();
  return (
    <>
      <h2 className="h2-bold">Create Product</h2>
      <div className="my-8">
        <ProductForm type="Create" />
      </div>
    </>
  );
};

export default CreateProductaPage;
