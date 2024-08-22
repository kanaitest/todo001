import { NavLink, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProductPage from "./pages/ProductPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart";
import { MdEmail } from "react-icons/md";
import { BiPhone } from "react-icons/bi";

function App() {
  return (
    <div className="w-full min-h-screen max-h-fit flex flex-col items-center transition-all ease-in justify-between ">
      <div className="w-full flex border-2  justify-center align-middle p-4 rounded-md shadow-md sticky top-0 z-10 backdrop-blur-lg ">
        <nav className="w-full flex gap-4 justify-center text-lg font-semibold ">
          <NavLink
            className="active:text-cyan-400 text-sky-800 active:underline"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="active:text-cyan-400 text-sky-800 active:underline"
            to="/cart"
          >
            Cart
          </NavLink>
          <NavLink
            className="active:text-cyan-400 text-sky-800 active:underline"
            to="/profile"
          >
            Profile
          </NavLink>
        </nav>
      </div>
      <div className="text-xl font-bold mt-4 ">
        <Routes>
          <Route path="/" loader element={<HomePage />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/products/:productid"
            element={<ProductPage />}
            loader={({ params }) => console.table(params)}
          />
        </Routes>
      </div>

      <footer className="w-full p-2 flex items-center justify-around align-middle mt-4 flex-wrap md:flex-nowrap">
        <div className="p-2">
          <h1 className="text-3xl bg-gradient-to-bl from-purple-400 to-cyan-500 bg-clip-text text-transparent">
            ElectroSpace
          </h1>

          <p className="text-base bg-gradient-to-bl from-purple-400 to-cyan-500 bg-clip-text text-transparent ">
            Level Up Your Tech Game With our Cutting Edge Electronics!
          </p>
        </div>

        <div className="p-2 flex flex-col ">
          <h1 className="text-lg font-bold text-cyan-500">Quick Links</h1>
          <ul className="text-base">
            <li className="my-2">
              <NavLink
                className="active:text-cyan-400 text-sky-800 active:underline"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="my-2">
              <NavLink
                className="active:text-cyan-400 text-sky-800 active:underline"
                to="/cart"
              >
                Cart
              </NavLink>
            </li>
            <li className="my-2">
              <NavLink
                className="active:text-cyan-400 text-sky-800 active:underline"
                to="/profile"
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="p-2 ">
          <h1 className="text-lg font-bold text-cyan-500">Contact Us</h1>
          <ul className="text-cyan-600 space-y-4">
            <li className="rounded-full p-2 bg-slate-100 flex gap-2 align-middle cursor-pointer hover:bg-cyan-300">
              Mail us <MdEmail className="w-6 h-6" />
            </li>

            <li className="rounded-full p-2 bg-slate-100 flex gap-2 align-middle cursor-pointer hover:bg-cyan-300">
              Call us <BiPhone className="w-6 h-6" />
            </li>
          </ul>
        </div>
      </footer>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer limit={1} theme="colored" />
    </div>
  );
}

export default App;
