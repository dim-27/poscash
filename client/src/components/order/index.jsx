import { ShoppingBasket } from "lucide-react";
import Cart from "../cart/Cart";

const Order = () => {
  return (
    <div className="p-4 bg-slate-200 w-1/3">
      <span className="">
        <div className="flex items-center border bg-slate-50 rounded-3xl w-24 p-4">
          <ShoppingBasket size={40} />
          <p className="text-3xl font-bold ml-2">0</p>
        </div>
      </span>
      <Cart />
    </div>
  );
};

export default Order;
