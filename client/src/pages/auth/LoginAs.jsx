import { Link } from "react-router-dom";

const LoginAs = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col">
        <Link
          to="/login-cashier"
          className="w-60 h-12 text-xl text-center text-white p-2 px-4 bg-red-500 hover:bg-red-400 rounded-full mb-2"
        >
          Login as Cashier
        </Link>
        <Link
          to="/login-admin"
          className="w-60 h-12 text-xl text-center text-white p-2 px-4 bg-red-500 hover:bg-red-400 rounded-full mt-2"
        >
          Login as Admin
        </Link>
      </div>
    </div>
  );
};
export default LoginAs;
