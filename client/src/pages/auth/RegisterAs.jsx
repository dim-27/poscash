import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RegisterAs = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col">
        <Link to="/register-cashier" className="w-60 h-12 mb-2">
          <Button className="w-full h-full text-xl bg-red-500 rounded-full hover:bg-red-400 ease-in-out duration-300">
            Register as Cashier
          </Button>
        </Link>
        {/* <Link to="/register-admin" className="w-60 h-12 mt-2">
          <Button className="w-full h-full text-xl bg-red-500 rounded-full hover:bg-red-400 ease-in-out duration-300">
            Register as Admin
          </Button>
        </Link> */}
      </div>
    </div>
  );
};

export default RegisterAs;
