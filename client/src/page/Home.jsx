import Product from "../components/product";
import Order from "../components/order";

const Home = () => {
  return (
    <div className="flex overflow-hidden h-screen">
      <div className=" w-2/3">
        <Product />
      </div>
      <Order />
    </div>
  );
};

export default Home;
