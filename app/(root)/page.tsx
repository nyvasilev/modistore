import ProductList from "@/components/shared/product/product-list";
import {
  getLatestProducts,
  getFeaturedProducts,
} from "@/lib/actions/products.actions";
import ProductCarousel from "@/components/shared/product/product-carousel";

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredtProducts = await getFeaturedProducts();
  console.log(featuredtProducts);
  return (
    <>
      {!!featuredtProducts.length && (
        <ProductCarousel data={featuredtProducts} />
      )}
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
    </>
  );
};

export default Homepage;
