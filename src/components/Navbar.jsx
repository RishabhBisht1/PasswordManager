import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white flex items-center justify-between px-4 py-2 h-14'>
        <div className='logo font-bold ring-white ring-2 px-2 rounded-2xl'>
            <span className='text-green-500'>&lt;</span>
            Password
            <span className='text-green-500'>Manager/&gt;</span>

            
            </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="">About</a>
                <a className='hover:font-bold' href="">Contact</a>
            </li>
        </ul> */}
    </nav>
  )
}

export default Navbar