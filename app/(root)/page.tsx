import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/products.actions";

const Homepage = async () => {
  const latesProducts = await getLatestProducts();

  return (
    <>
      <ProductList data={latesProducts} title="Newest Arrivals" limit={4} />
    </>
  );
};

export default Homepage;
