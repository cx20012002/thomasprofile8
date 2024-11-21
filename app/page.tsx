import BannerComponent from "./components/BannerComponent";
import FeatureProductsComponent from "./components/FeatureProductsComponent";
import ProductListComponent from "./components/ProductListComponent";

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-2 md:gap-4 p-2 md:p-4">
      <BannerComponent />
      <FeatureProductsComponent />
      <ProductListComponent />
    </div>
  );
}
