import { getAPI } from "@/repositories/api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";

import CartItem from "./CartItem";
import { postAPI } from "@/repositories/api";
import { FormatToIDR } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { ShoppingBasketIcon, ConciergeBell } from "lucide-react";

import { totalCart } from "@/features/globalReducer";
import { useDispatch, useSelector } from "react-redux";
import { setTotalCart } from "@/features/globalReducer";
import { random } from "@/features/globalReducer";

const Cart = () => {
  const dispatch = useDispatch();
  const total = useSelector(totalCart);
  const rand = useSelector(random);
  const { toast } = useToast();
  const { userId } = useContext(AuthContext);

  const {
    data: cart,
    isFetched,
    refetch,
  } = useQuery(["cart"], async () => {
    const res = await getAPI(`cart/user/${userId}}`);
    return res.data;
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      return await postAPI("order/transaction", data);
    },
  });

  const checkout = async () => {
    mutation.mutate({ userId: userId });
  };

  useEffect(() => {
    mutation.reset();
    if (mutation.isSuccess) {
      toast({
        title: "Checkout Success",
      });
    } else if (mutation.isError) {
      toast({
        title: "Checkout Failed",
      });
    } else {
      isFetched && cart != null ? dispatch(setTotalCart(cart.cart_items.length)) : dispatch(setTotalCart(0));
    }
    refetch();
  }, [mutation.isSuccess, mutation.isError, total, rand, cart]);

  return (
    <div className="h-screen">
      <div className="h-14 p-4 flex items-center pt-8">
        <ShoppingBasketIcon size={40} />
        <span className="ml-4 text-4xl font-bold">{total}</span>
      </div>
      {isFetched && cart !== null && cart.cart_items.length > 0 ? (
        <div className="h-[64vh] overflow-scroll">
          <div className="flex flex-col mt-4">
            {cart.cart_items.map((item) => (
              <CartItem key={item.id} item={item} refetch={refetch} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[64vh]">
          <div>
            <ConciergeBell className="mx-auto" size={40} />
            <span className="text-slate-500 font-thin">cart empty</span>
          </div>
        </div>
      )}
      <div className="mt-8">
        <div className="flex justify-between">
          <p className="font-semibold ml-2">Sub Total</p>
          {cart ? <p className="mr-2">{FormatToIDR(cart.sub_total)}</p> : <p>{FormatToIDR(0)}</p>}
        </div>

        <Button
          disabled={cart !== null ? isFetched && cart.cart_items.length < 1 : true}
          className={`mt-4  bg-green-500 hover:bg-green-400 ease-in-out duration-300 `}
          onClick={checkout}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
