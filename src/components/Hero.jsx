import React, { useContext } from 'react';
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { CiFilter, CiSearch } from "react-icons/ci";
import Home from '../img/home.png';
import { FilterContext } from '../contexts/FilterContext';

const Hero = () => {
  const {filter, setFilter, filterRef} = useContext(FilterContext);
  return (
    <div className='h-[500px]'>
      <div className='fixed top-0 left-0 bg-box bg-cover w-full h-screen bg-center bg-no-repeat
      opacity-50 flex gap-1 flex-col lg:flex-row z-0'>
      </div>
      <div className='w-full h-[500px] sm:h-screen flex gap-2
      flex-col lg:flex-row'>
        <div className='relative w-full lg:w-1/2 h-full contain'>
          <div className='absolute top-24 left-5 sm:left-14 lg:left-10 xl:left-20 space-y-5'>
            <div className='flex gap-4 justify-around'>
              <div className='flex relative'>
                <button className='absolute flex items-center text-2xl top-0 right-0
                 mx-1 px-1 rounded-md text-xl hover:text-3xl duration-300 h-full'>
                  <CiSearch />
                </button>
                <input className='h-8 bg-gray-300 border-2 border-gray-300 rounded-md
                px-2 pr-10'
                placeholder='State or city (e.g., Enugu)' 
                type="text" />
              </div>
              <button 
              onClick={() => {
                setFilter(!filter);
                if (filterRef.current) {
                  filterRef.current.scrollTop = 0;
                }
              }}
              className='flex border items-center px-1 gap-1 rounded-md bg-gray-300
              transition-transform duration-300 hover:scale-[1.05]'>
                <CiFilter className='text-2xl' />
                <div>Filters</div>
              </button>
            </div>
            <div className='text-6xl uppercase font-play pt-8'>Premium</div>
            <div className='text-5xl font-play font-light'>Access</div>
            <div className='font-light'>Exlusive Properties</div>
            <div className='pt-10'>
              <div className='font-light relative'>
                <RiDoubleQuotesL className='absolute -top-5' />
                <RiDoubleQuotesR className='absolute -bottom-5 right-5'/>
                <p>connecting you directly with trusted owners</p>
              </div>
            </div>
            <button className='underline font-light'>Explore More</button>
          </div>
        </div>

        <div className='absolute top-0 right-0 w-full lg:w-1/2 h-full
        hidden lg:block'>
          <div className='relative'>
            <img className='absolute top-20 w-[450px]'
            src={Home} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
