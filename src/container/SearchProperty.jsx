import React from 'react';
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineBookmarkAdd } from 'react-icons/md';
import { TbCurrencyNaira } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';


const SearchProperty = ({apartment}) => {
    const {title, imagea, state, city, property_type, price, slug} = apartment;
    const image = `http://127.0.0.1:8001/${imagea}`
    const prices = Number(price).toLocaleString();
    const navigate = useNavigate();
    
    return(
        <div className='relative all group overflow-hidden border-2 z-10 relative rounded-sm 
            hover:bg-gray-100 hover:shadow-2xl transition duration-300 
            hover:-translate-y-1 cursor-pointer'>
            <div className='absolute z-30 top-5 right-[-100%] transition-all 
            group-hover:right-5 duration-300 delay-300 border bg-gray-300'>
                <button>
                    <MdOutlineBookmarkAdd className='text-2xl hover:text-gray-500
                    ' />
                </button>
            </div>
            <div 
            onClick={() => {
                navigate(`/property/${slug}/`); 
                window.scrollTo(0, 0)
            }}>
                <div>
                    <img className='mx-auto'
                    src={image} 
                    loading='lazy'
                    alt="" />
                </div>

                <div className='text-sm pt-2 font-jost font-light
                flex'>
                    <CiLocationOn className='text-lg' />
                    <div>{state}/{city}</div>
                </div>

                <div className='flex items-center font-light text-sm'>
                    <div className='pt-[2px]'><TbCurrencyNaira className='text-lg' /></div>
                    <div>{prices}</div>
                </div>

                <div className='pt-2 font-jost'>{title}</div>
                <div className='font-jost font-light'>{property_type}</div>
            </div>
        </div>
    );
}

export default SearchProperty;