import ProductList from "@/components/shared/product/product-list";
import {
  getLatestProducts,
  getFeaturedProducts,
} from "@/lib/actions/products.actions";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ViewAllProductsButton from "@/components/view-all-products-button";
import IconBoxes from "@/components/icon-boxes";

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredtProducts = await getFeaturedProducts();

  return (
    <>
      {!!featuredtProducts.length && (
        <ProductCarousel data={featuredtProducts} />
      )}
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
      <ViewAllProductsButton />
      <IconBoxes />
    </>
  );
};

export default Homepage;
