import { Button } from "../ui/button";
import { FormatToIDR } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { putAPI } from "@/repositories/api";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import PropTypes from "prop-types";

const CartItem = ({ item }) => {
  const { userId } = useContext(AuthContext);
  const data = { productId: item.product.id, userId: userId };
  const deleteItemCart = () => {
    putAPI(`cart/item`, data);
  };
  const increase = () => {
    putAPI(`cart/increase`, data);
  };
  const decrease = () => {
    putAPI(`cart/decrease`, data);
  };

  return (
    <div className="my-4">
      <div className="flex">
        <img className="w-[100px]" src={item.product.image_url} />
        <div>
          <p className="font-semibold">{item.product.name}</p>
          <div className="flex">
            <p className="w-24">Quantity</p>
            <p>{item.qty}</p>
          </div>
          <div className="flex">
            <p className="w-24">Price</p>
            <p>{FormatToIDR(item.price)}</p>
          </div>
          <div className="flex">
            <p className="w-24">Total Price</p>
            <p>{FormatToIDR(item.total_price)}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <Button className="h-8 bg-red-500 hover:bg-red-400 ease-in-out duration-300 mr-2" onClick={increase}>
            +
          </Button>
          <Button className="h-8 bg-red-500 hover:bg-red-400 ease-in-out duration-300" onClick={decrease}>
            -
          </Button>
        </div>
        <div>
          <Trash2 size={30} className="text-red-700 cursor-pointer" onClick={deleteItemCart} />
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.any,
};

export default CartItem;
