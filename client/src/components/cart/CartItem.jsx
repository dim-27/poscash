import { Button } from "../ui/button";
import { FormatToIDR } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { postAPI } from "@/repositories/api";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

const CartItem = ({ item, refetch }) => {
  const { userId } = useContext(AuthContext);
  const data = { productId: item.product.id, userId: userId };

  const deleteItemCart = async () => {
    await postAPI(`cart/item`, data);
    await refetch();
  };
  const increase = async () => {
    await postAPI(`cart/increase`, data);
    await refetch();
  };
  const decrease = async () => {
    await postAPI(`cart/decrease`, data);
    await refetch();
  };

  return (
    <div className="mb-8 items-center">
      <div className="">
        <div className="flex justify-between">
          <div className="w-32 ">
            <p className="font-semibold text-center">{item.product.name}</p>
            <img className="w-[50px] h-[50px] mx-auto" src={item.product.image_url} />
          </div>
          <div className="">
            <div className="flex justify-between">
              <p>Price</p>
              <p className="ml-2">{FormatToIDR(item.price)}</p>
            </div>
            <div className="flex">
              <p className="w-24">Total Price</p>
              <p>{FormatToIDR(item.total_price)}</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Button className="h-6 bg-red-500 hover:bg-red-400 ease-in-out duration-300" onClick={decrease}>
                  -
                </Button>
                <p className="w-6 text-center">{item.qty}</p>
                <Button className="h-6 bg-red-500 hover:bg-red-400 ease-in-out duration-300 mr-2" onClick={increase}>
                  +
                </Button>
              </div>
              <div>
                <Trash2 size={30} className="text-red-700 cursor-pointer" onClick={deleteItemCart} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
