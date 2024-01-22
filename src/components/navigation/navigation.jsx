import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="border-b border-indigo-300">
      <div className="flex justify-between h-12 items-center px-[5%] max-w-7xl mx-auto">
        <div className="text-indigo-600 font-bold text-xl">Plutus</div>
        <div>
          <ul className="flex">
            {routes.map(
              (route, index) =>
                route.display && (
                  <Route key={index} to={route.to} label={route.label} />
                )
            )}
            <li>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location = "/";
                }}
                className="px-4 py-1 mx-1 rounded-md text-indigo-900 hover:bg-slate-200 hover:text-indigo-600 transition-all">
                Log Out
              </button>
            </li>
            <li className="ml-5 my-auto">
              <p className="text-indigo-600">
                {JSON.parse(localStorage.getItem("user"))?.username || null}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;

const Route = ({ to, label }) => {
  const location = useLocation();

  return (
    <li
      className={`px-4 py-1 mx-1 rounded-md text-indigo-900 ${
        location.pathname === to && "bg-slate-200 !text-indigo-600"
      } hover:bg-slate-200 hover:text-indigo-600 transition-all`}>
      <Link to={to}>{label}</Link>
    </li>
  );
};

const routes = [
  {
    to: "/posts",
    label: "Posts",
    display: localStorage.getItem("token") ? true : false,
  },
  {
    to: "/create",
    label: "Create",
    display: localStorage.getItem("token") ? true : false,
  },
];
