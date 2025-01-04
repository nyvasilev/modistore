import Image from "next/image";
import loader from "@/assets/loader.gif";

const LoadingPage = () => (
  <div className="flex items-center justify-center h-screen w-screen">
    <Image src={loader} height={150} width={150} alt="Loading..." />
  </div>
);

export default LoadingPage;
