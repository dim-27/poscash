import { useState } from "react";
import { useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "@/features/globalReducer";
import { FormatToIDR } from "@/lib/utils";
import { Settings, Trash, ShoppingBasket } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ManageProduct from "./manage/ManageProduct";
import DeleteProduct from "./manage/DeleteProduct";
import { postAPI } from "@/repositories/api";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../auth/AuthContext";
import { Button } from "../ui/button";
import { setRand } from "@/features/globalReducer";

const ProductCard = ({ product, role }) => {
  const { userId } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  const handleIncrement = () => {
    dispatch(incrementQuantity());
    setTotal(total + 1);
  };

  const handleDecrement = () => {
    if (total > 0) {
      dispatch(decrementQuantity());
      setTotal(total - 1);
    }
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      dispatch(setRand(Math.random()));
      return await postAPI(`cart`, data);
    },
  });

  const addCart = async () => {
    mutation.mutate({ userId: userId, productId: product.id, quantity: total });
  };

  return (
    <div
      className="flex flex-col space-y-2 col-span-1 bg-gray-500 hover:bg-gray-600 p-2 rounded-2xl w-60 shadow-xl mx-auto mb-4 "
      onMouseOver={() => dispatch(setRand(Math.random()))}
    >
      <div
        className="h-40 w-full bg-gray-300 rounded-xl overflow-hidden"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={product.image_url} alt={product.name} />
      </div>
      <div className="justify-between items-center pl-1">
        <div className="flex justify-between items-start">
          <span className="text-lg text-slate-50">{product.name}</span>
          <span className="text-white font-bold">{FormatToIDR(product.price)}</span>
        </div>
        {role === 1 ? (
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger>
                <div className="p-2 group rounded-full bg-red-600 cursor-pointer items-center">
                  <div className="group-hover:-translate-y-[1px]">
                    <Trash />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DeleteProduct product={product} />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>
                <div className="p-2 group rounded-full bg-gray-400 cursor-pointer items-center">
                  <div className="group-hover:-translate-y-[1px]">
                    <Settings />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <ManageProduct product={product} action="edit" />
              </DialogContent>
            </Dialog>
          </div>
        ) : role === 2 ? (
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Button
                onClick={handleDecrement}
                className="px-4 h-5 inline-relative group rounded-2xl bg-gray-400 cursor-pointer text-xl font-bold"
                disabled={total <= 0}
              >
                -
              </Button>
              <p className="mx-2 w-6 text-center text-lg">{total}</p>
              <Button
                onClick={handleIncrement}
                className="px-4 h-5 group  rounded-2xl bg-gray-400 cursor-pointer text-xl font-bold"
              >
                +
              </Button>
            </div>

            <ShoppingBasket
              disabled={total !== 0}
              size={25}
              color="red"
              className="bg-white rounded-full cursor-pointer"
              onClick={() => {
                if (total > 0) {
                  addCart();
                }
              }}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
