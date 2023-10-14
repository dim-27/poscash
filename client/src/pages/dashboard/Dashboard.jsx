import { Link } from "react-router-dom";
import { UserCircle, Newspaper, BarChart2, Home, History } from "lucide-react";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/components/auth/AuthContext";

const Dashboard = () => {
  const { isAdmin } = useContext(AuthContext);

  return (
    <div className="flex">
      <div className="w-1/4 sm:pr-16">
        <div className="flex gap-2 items-center my-4">
          <Link to="/" className="text-center text-xl font-semibold">
            <Home size={80} />
            <span>Home</span>
          </Link>
        </div>
        <div className="flex gap-2 items-center my-4">
          <Link to="/dashboard/profile" className="text-center text-xl font-semibold">
            <UserCircle size={80} />
            <span>Profile</span>
          </Link>
        </div>
        {isAdmin && (
          <div>
            <div className="flex gap-2 items-center my-4">
              <Link to="/dashboard/sales" className="text-center text-xl font-semibold">
                <BarChart2 size={80} />
                <span>Sales</span>
              </Link>
            </div>
            <div className="flex gap-2 items-center my-4">
              <Link to="/dashboard/report" className="text-center text-xl font-semibold">
                <Newspaper size={80} />
                <span>Report</span>
              </Link>
            </div>
            <div className="flex gap-2 items-center my-4">
              <Link to="/dashboard/history" className="text-center text-xl font-semibold">
                <History size={80} />
                <span>History</span>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
