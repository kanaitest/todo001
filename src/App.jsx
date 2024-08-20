import { NavLink, Routes, Route } from "react-router-dom";
import About from './pages/About';
import NewItem from './pages/New';
import Profile from './pages/Profile';
import HomePage from './pages/HomePage';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
function App() {

 

  return (
    <div className='w-full min-h-screen max-h-fit p-4 flex flex-col items-center '>
      <div className="w-full flex border-2  max-w-[800px] justify-center align-middle p-4 rounded-md shadow-md ">
      <nav className="w-full flex gap-2 justify-center text-lg font-semibold ">
          <NavLink className='active:text-cyan-400 text-sky-800 active:underline' to="/">Home</NavLink>
          <NavLink className='active:text-cyan-400 text-sky-800 active:underline' to="/about">About</NavLink>
          <NavLink className='active:text-cyan-400 text-sky-800 active:underline' to="/new">Add</NavLink>
        </nav>
      </div>
      <div className="text-xl font-bold mt-4 ">
        <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" loader element={<HomePage />} />
        <Route path="/new" element={<NewItem />} />
        <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  )
}

export default App
