import React, { useContext } from 'react';
import { IoIosClose } from "react-icons/io";
import Cookies from "js-cookie";
import { FilterContext } from '../contexts/FilterContext';
import { PropertyContext } from '../contexts/PropertyContext';

const sortData = [
    {item: 'Newest', value: 'new'},
    {item: 'Lowest price', value: 'price'},
    {item: 'Highest price', value: '-price'},
]

const SortInfo = () => {
    const { sort, setSort, sorts, setSorts } = useContext(FilterContext);
    const { setPage, setShowPreLoaders, update, setUpdate } = useContext(PropertyContext);

    return(
        <div className={`${sort ? 'bottom-0' : 'bottom-[-100%]'}
        fixed left-1/2 w-full sm:w-[400px] sm:h-60 bg-gray-100 h-[350px] 
        z-30 -translate-x-1/2 rounded-md font-play border-2 shadow-2xl
        duration-300`}>
            <div className='flex justify-between px-5 pt-2'>
                <button onClick={() => setSort(!sort)}
                className='text-3xl'><IoIosClose /></button>
                <button
                onClick={() => {
                    if (Cookies.get('sort')) {
                        setShowPreLoaders(false);
                        Cookies.remove('sort');
                        Cookies.remove('sorts');
                        setSorts('');
                        Cookies.set('pages', 1);
                        setPage(1)
                        setUpdate(!update);
                        setTimeout(() => {
                            setSort(!sort)
                        }, 500);
                        window.scrollTo(0, 0);
                    }
                }}
                >
                    clear
                </button>
            </div>
            <div className='flex flex-col gap-4 items-start px-5'>
                <div className='w-full flex justify-center'>Sort by</div>
                {
                    sortData.map(item => (
                        <button 
                        onClick={() => {
                            if (Cookies.get('sort') === item.value) {
                                setTimeout(() => {setSort(!sort)}, 500);
                            } else {
                                setShowPreLoaders(false);
                                setSorts(item.value); 
                                Cookies.set('sort', item.value); 
                                Cookies.set('sorts', item.item); 
                                setTimeout(() => {setSort(!sort)}, 500);
                                Cookies.set('pages', 1);
                                setPage(1)
                                setUpdate(!update)
                                window.scrollTo(0, 0);
                            }
                        }}
                        className='w-full flex items-center justify-between 
                        p-1 all group'
                        key={item.value}>
                            <div>{item.item}</div>
                            <div className={`${sorts === item.value ? 'bg-blue-500' : ''}
                            w-5 h-5 rounded-full border-[5px] duration-300 group-hover:bg-blue-500`}></div>
                        </button>
                    ))
                }
            </div>
        </div>
    );
}

export default SortInfo;