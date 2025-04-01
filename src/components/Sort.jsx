import React, { useContext } from 'react';
import { GrSort } from "react-icons/gr";
import Cookies from "js-cookie";
import { FilterContext } from '../contexts/FilterContext';
import { IoIosClose } from 'react-icons/io';
import { PropertyContext } from '../contexts/PropertyContext';


const Sort = () => {
    const {sort, setSort, setSorts} = useContext(FilterContext);
    const { setPage, setShowPreLoaders, update, setUpdate } = useContext(PropertyContext);
    return(
        <div className='fixed top-16 w-full h-10 bg-transparent z-20
        flex items-center contain justify-end'>
            <div className='relative'>
                <button 
                onClick={() => setSort(!sort)} 
                className='flex gap-2 items-center font-play font-bold
                border px-1 py-[1px] border-gray-300 bg-gray-300 rounded-sm
                hover:scale-[1.05] duration-300'>
                    <div className={`${Cookies.get('sorts') ? 'pr-6' : ''}`}>
                        {Cookies.get('sorts') ? Cookies.get('sorts') : 'Sort by'}
                    </div>
                    <div className='text-lg'><GrSort /></div>
                </button >
                <button 
                onClick={() => {
                    setShowPreLoaders(false);
                    Cookies.remove('sorts'); 
                    Cookies.remove('sort');
                    setSorts(''); 
                    Cookies.set('pages', 1);
                    setPage(1);
                    setUpdate(!update);
                }}
                className='absolute top-[2px] right-7 flex gap-2 items-center 
                transition hover:scale-[1.3] duration-300'>
                {Cookies.get('sorts') ? 
                    <IoIosClose className='text-2xl' />
                    : ''}
                </button> 
            </div>
        </div>
    );
}

export default Sort