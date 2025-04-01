import React, { useContext, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import Promotion from '../components/Promotion';
import { PropertyContext } from '../contexts/PropertyContext';
import PreLoader from '../container/Preloader';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import HomeApartment from '../container/HomeApartment';


const preload = [1, 2, 3, 4, 5];
const Home = () => {
  const {apartment, loading, fetched, setFetched, getApartmentAndSelfconatin, setPage, update, setUpdate} = useContext(PropertyContext);
  const triggerRef = useRef(null);
  const navigate = useNavigate();

    useEffect(() => {
      const observer = new IntersectionObserver(
          (x) => {
              if (x[0].isIntersecting) {
                  if (!fetched) {
                      getApartmentAndSelfconatin();
                      setFetched(true);
                  }
              }
          },
          { 
              rootMargin: '50% 0px',
              threshold: 0,
            }
      );

      if (triggerRef.current) {
          observer.observe(triggerRef.current);
      }

      return () => observer.disconnect();
    }, [fetched, setFetched, getApartmentAndSelfconatin]);

    

  const getApartmentSelfContain = () => {
    Cookies.set('pages', 1);
    Cookies.remove('listing');
    Cookies.set('property_type', 'apartment,selfcontain'); 
    Cookies.remove('room');
    Cookies.remove('min');
    Cookies.remove('max');
    Cookies.remove('state');
    Cookies.remove('city');
    setPage(1);
    setUpdate(!update);
    navigate('/property'); 
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <Hero />
      <Promotion />
        <div ref={triggerRef} className=''>
            <div className='flex items-center justify-between py-5 contain z-10 relative'>
                <div className='text-sm font-semibold font-jost uppercase
                md:text-base'>Apartment & Self-Contained</div>
                <button onClick={getApartmentSelfContain}
                className=''>see more</button>
            </div>
            <div className="grid grid-cols-2 gap-5 mx-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {!loading
                ? apartment.map((apartment) => <HomeApartment apartment={apartment} key={apartment.slug} />)
                : preload.map(item => <PreLoader key={item} />)
              }
            </div>
        </div>
    </div>
  );
};

export default Home;
