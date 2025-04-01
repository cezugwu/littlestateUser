import React, { useContext } from 'react';
import { FaHouse } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { CiFilter, CiSearch } from "react-icons/ci";
import { RiMenu4Line } from "react-icons/ri";
import { HeaderContext } from '../contexts/HeaderContext';
import { FilterContext } from '../contexts/FilterContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const {filter, setFilter, filterRef} = useContext(FilterContext);
  const {onHeader, navbar, onNavbar, setNavbar} = useContext(HeaderContext);
  const navigate = useNavigate();
  const location = useLocation();

  return(
    <div className={`${onHeader ? 'bg-gray-100' : 'bg-transparent'}
    fixed top-0 left-0 w-full h-16 flex justify-between items-center
    contain z-30`}>
      <div className='h-16 w-full lg:w-auto flex items-center justify-between gap-2 
      font-play font-bold'>
        <div className='flex items-center gap-2'>
          <button onClick={onNavbar}
          className='text-2xl mr-2 lg:hidden'>
            <RiMenu4Line />
          </button>
          <button onClick={() => {
            if (location.pathname !== '/') {
              navigate('/');
            }
          }}
          className='flex gap-1 items-center mt-1'>
            <FaHouse className='text-2xl mb-2' />
            <div className='text-lg'>littlEstate</div>
          </button>
        </div>
      </div>

      <div className='flex gap-5 xlg:gap-16 items-center font-play'>
        <div className={`${navbar ? 'left-0' : 'left-[-100%]'}
        flex flex-col fixed top-0 w-full h-screen gap-5 bg-gray-100 duration-300 lg:duration-0
        lg:flex-row lg:static lg:w-auto lg:h-auto lg:gap-7 lg:bg-transparent`}>
          <div className='lg:hidden'>
              <div className='h-16 flex items-center justify-between gap-2 border-b 
              border-gray-300 mx-5 px-2 font-play font-bold'>
                <div className='flex gap-2'>
                  <FaHouse className='text-2xl' />
                  <div className='text-lg'>littlEstate</div>
                </div>
                <button onClick={onNavbar}>
                  <IoIosClose className='text-3xl' />
                </button>
              </div>
              <div className='flex gap-5 py-5 px-2 mx-5'>
                <div className='flex relative'>
                  <button className='absolute flex items-center text-2xl top-0 right-0
                  mx-1 px-1 rounded-md text-xl hover:text-3xl duration-300 h-full'>
                    <CiSearch />
                  </button>
                  <input className='h-8 w-[220px] bg-gray-300 border-2 border-gray-300 rounded-md
                  px-2 pr-10'
                  placeholder='search' 
                  type="text" />
                </div>
                <button 
                onClick={() => {
                  setFilter(!filter); 
                  setNavbar(false);
                  if (filterRef.current) {
                    filterRef.current.scrollTop = 0;
                  }
                }}
                className='flex border items-center px-1 gap-1 rounded-md 
                transition-transform duration-300 hover:scale-[1.05] bg-gray-300'>
                  <CiFilter className='text-2xl' />
                  <div>Filters</div>
                </button>
              </div>
              <div className='flex gap-2 px-2 mx-5 py-4 border-b border-gray-300'>
                <button>Sign up</button>
                <div>/</div>
                <button>Login</button>
              </div>
          </div>
          <div className='lg:px-0 px-10'><button>Home</button></div>
          <div className='lg:px-0 px-10'><button>Buy</button></div>
          <div className='lg:px-0 px-10'><button>Rent</button></div>
          <div className='lg:px-0 px-10'><button>Commercial</button></div>
          <div className='lg:px-0 px-10'><button>Agent</button></div>
          <div className='lg:px-0 px-10'><button>About Us</button></div>
          <div className='lg:px-0 px-10'><button>Contact</button></div>
        </div>
        <button className='block border-2 border-gray-300 px-2 rounded-sm 
        hover:bg-gray-300 duration-300'>
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;
