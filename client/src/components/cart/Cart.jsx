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

const Cart = () => {
  const toast = useToast();
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
      postAPI("order", data);
    },
  });

  const checkout = () => {
    mutation.mutate({ userId: userId });
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      toast({
        title: "Checkout Success",
      });
    } else if (mutation.isError) {
      toast({
        title: "Checkout Failed",
      });
    }
  }, [mutation.isSuccess, mutation.isError, toast]);

  return (
    <div className="px-4 h-screen">
      {isFetched && cart ? (
        <div className="h-[70vh] overflow-scroll">
          <div className="flex flex-col mt-4">
            {cart.cart_items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="mt-8">
        <div className="flex justify-between">
          <p className="font-semibold ml-2">Sub Total</p>
          {cart ? <p className="mr-2">{FormatToIDR(cart.sub_total)}</p> : <p>{FormatToIDR(0)}</p>}
        </div>

        <Button
          className={`${cart ? `` : `btn-disabled`} mt-4  bg-green-500 hover:bg-green-400 ease-in-out duration-300 `}
          onClick={() => {
            checkout;
            refetch;
          }}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
