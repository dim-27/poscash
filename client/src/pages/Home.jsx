import Product from "@/components/product";
import Cart from "@/components/cart/Cart";
import { useSelector } from "react-redux";
import { showCart } from "@/features/globalReducer";

const Home = () => {
  const show = useSelector(showCart);
  return (
    <div className="flex overflow-hidden h-full">
      <div className={`${show ? "w-full" : "flex-grow"} h-full`}>
        <Product />
      </div>
      <div className={`${show ? "w-1/3" : "hidden"} p-4 bg-slate-200 rounded-lg`}>
        <Cart />
      </div>
    </div>
);
};

export default Home;
