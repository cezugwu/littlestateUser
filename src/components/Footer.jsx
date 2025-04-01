import React, { useContext } from 'react';
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { RiInstagramFill, RiFacebookFill  } from "react-icons/ri";
import { IoIosArrowUp } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { HeaderContext } from '../contexts/HeaderContext';
import { FilterContext } from '../contexts/FilterContext';


const Footer = () => {
    const { scroll, scrollUp } = useContext(HeaderContext)
    const {filter, setFilter, filterRef} = useContext(FilterContext);
    return(
        <div className='z-10 relative'>
            <div className={`${scroll ? 'bottom-5' : 'bottom-[-100%]'}
            fixed right-5 text-lg z-50 duration-300 flex flex-col gap-3`}>
                <button 
                onClick={() => {
                    setFilter(!filter);
                    if (filterRef.current) {
                        filterRef.current.scrollTop = 0;
                    }
                }}>
                    <CiFilter className='text-3xl bg-gray-500 transition 
                    hover:-translate-y-1 duration-300' />
                </button>
                <button onClick={scrollUp}>
                    <IoIosArrowUp className='text-3xl bg-gray-500 transition 
                    hover:-translate-y-1 duration-300' />
                </button>
            </div>

            <div className='mt-10 bg-gray-300 flex flex-col gap-10 px-5 py-10
            xl:flex-row-reverse justify-around'>
                <div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email">Never Miss a Great Property Deal – Subscribe Now!</label>
                        <div className='flex gap-2'>
                            <input className='border-2 border-gray-500 px-2 rounded-sm'
                            type="text"
                            placeholder='Email' />
                            <button className='border-2 p-1 rounded-md border-glow
                            hover:bg-glow font-semibold'>subscribe</button>
                        </div>
                        <div className='flex gap-5 pt-3'>
                            <FaXTwitter className='cursor-pointer' />
                            <RiInstagramFill className='cursor-pointer' />
                            <FaLinkedinIn className='cursor-pointer' />
                            <RiFacebookFill className='cursor-pointer' />
                        </div>

                    </div>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-2 text-sm'>
                    <div>
                        <div className='text-base font-medium'>Help & Support</div>
                        <div className='space-y-1 pt-2'>
                            <p>Help Center</p>
                            <p>FAQs & Customer Support</p>
                            <p>Report Fraudulent Listings</p>
                            <p>Buyer & Seller Protection</p>
                        </div>
                    </div>
                    <div className=''>
                        <div className='text-base font-medium'>Property Categories</div>
                        <div className='space-y-1 pt-2'>
                            <p>For Sale (Houses, Apartments, Land, Commercial)</p>
                            <p>For Rent (Short-term, Long-term)</p>
                            <p>Luxury Homes & Estates</p>
                            <p>New Developments</p>
                        </div>
                    </div>
                    <div>
                        <div className='text-base font-medium'>Company & Legal</div>
                        <div className='space-y-1 pt-2'>
                            <p>About Us</p>
                            <p>Contact Us</p>
                            <p>Privacy Policy</p>
                            <p>Terms & Conditions</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;