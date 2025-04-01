import React, { useContext, useEffect } from 'react';
import { PropertyContext } from '../contexts/PropertyContext.jsx';
import SearchProperty from '../container/SearchProperty.jsx';
import PreLoader from '../container/Preloader.jsx';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import Sort from '../components/Sort.jsx';
import SortInfo from '../container/SortInfo.jsx';
import Cookies from "js-cookie";
import { useLocation } from 'react-router-dom';


const preload = [1, 2, 3, 4, 5]

const Search = () => {
    const { properties, seeAlloading, getFilteredProperties, page, setPage, count, itemCount, 
        showPreloaders, setShowPreLoaders, setUpdate, update } = useContext(PropertyContext);
    const location = useLocation();

    const pages = Array.from({ length: Math.ceil(count/itemCount)}, (_, i) =>i + 1)

    useEffect(() => {
        if (location !== '/property') {
            getFilteredProperties();
            const timer = setTimeout(() => {
                setShowPreLoaders(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [getFilteredProperties, location, setShowPreLoaders, update]);


    return(
        <div className='pt-28 relative'>

            <Sort />

            <div className="grid grid-cols-2 gap-5 mx-2 sm:grid-cols-2 md:grid-cols-3 
            lg:grid-cols-4 xl:grid-cols-5">
                {
                    !showPreloaders ?
                        preload.map(item => <PreLoader key={item} />)
                    :
                    (!seeAlloading
                    ? properties.map(apartment => <SearchProperty apartment={apartment} key={apartment.slug} />)
                    : preload.map(item => <PreLoader key={item} />))
                }
            </div>

            <div className='flex px-5 justify-between mt-10'>
                <button onClick={() => {
                    if (page !== 1) {
                        Cookies.set('pages', page - 1);
                        setPage(prev => prev - 1); 
                        setShowPreLoaders(false);
                        setUpdate(!update);
                        window.scrollTo(0, 0);
                    }
                }}
                className='text-2xl border border-gray-300 hover:bg-gray-300'>
                    <GrFormPrevious />
                </button>
                <div className='flex gap-0 sm:gap-2 md:gap-5 lg:gap-10'>
                    {
                        pages.map(item => (
                            <button onClick={() => {
                                if (page !== item) {
                                    Cookies.set('pages', item);
                                    setPage(item);
                                    setShowPreLoaders(false);
                                    setUpdate(!update);
                                    window.scrollTo(0, 0);
                                }
                            }}
                            className={`${page === item ? 'bg-gray-300' : ''}
                            border border-gray-300 px-2`}  
                            key={item}>
                                {item}
                            </button>
                        ))
                    }
                </div>
                <button onClick={() => {
                    if (page !==(pages[pages.length - 1])) {
                        Cookies.set('page', page + 1);
                        setPage(prev => prev + 1); 
                        setShowPreLoaders(false);
                        setUpdate(!update);
                        window.scrollTo(0, 0);}}
                    }
                className='text-2xl border border-gray-300 hover:bg-gray-300'>
                    <MdNavigateNext />
                </button>
            </div>

            <SortInfo />

        </div>
    );
}

export default Search;
