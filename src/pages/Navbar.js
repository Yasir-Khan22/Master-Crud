import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <div className="w-ful h-16 flex items-center px-14 justify-between bg-[#55423d] text-white">
        <Link to={"/"} className="text-3xl font-semibold font-Montesarrat">Master Crud</Link>
        <Link to={"/add-user"} className="hover:bg-[#ffc0ad]
            hover:border-2 hover:border-white hover:text-[#55423d] hover:shadow-md rounded-lg bg-white font-bold text-black py-2 px-2">Add Users</Link>
      </div>
    </>
  )
}

export default Navbar