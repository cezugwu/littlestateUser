import React, { useContext, useEffect, useState} from 'react';
import { FilterContext } from '../contexts/FilterContext';
import { IoIosClose } from "react-icons/io";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { LocationContext } from '../contexts/LocationContext';
import Cookies from "js-cookie";
import { PropertyContext } from '../contexts/PropertyContext';
import { useLocation, useNavigate } from 'react-router-dom';


const exchangeList = ['Buy', 'Rent', 'Shortlet'];

const optionPropertyType = [
  { label: 'All', value: 'all' },
  { label: 'Bungalow', value: 'bungalow' },
  { label: 'Flat & Apartment', value: 'apartment' },
  { label: 'Self-Contain', value: 'selfcontain' },
  { label: 'Studio Apartment', value: 'studio' },
  { label: 'Duplex', value: 'duplex' },
  { label: 'Triplex/Fourplex', value: 'triplex' },
  { label: 'Detached House', value: 'detached' },
  { label: 'Semi-Detached House', value: 'semidetached' },
  { label: 'Penthouse', value: 'penthouse' },
  { label: 'Mansion', value: 'mansion' },
  { label: 'Office/Workspace', value: 'office' },
  { label: 'Shopping Mall/Plaza', value: 'mall' },
  { label: 'Hotel', value: 'hotel' },
  { label: 'Warehouse', value: 'warehouse' },
  { label: 'Townhouse', value: 'townhouse' },
];

const roomNumber = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const Filter = () => {
  const { listCity, listState, getCity, getState, cityMenu, stateMenu, 
    setCityMenu, setStateMenu } = useContext(LocationContext);
  const { setPage, setShowPreLoaders, update, setUpdate } = useContext(PropertyContext);

  const {filter, setFilter, filterRef} = useContext(FilterContext);

  const [selectedExchange, setSelectedExchange] = useState(() => Cookies.get('listing') || '');
  const [selectedPropertyType, setSelectedPropertyType] = useState(() => Cookies.get('property_type') || '');
  const [selectedRoom, setSelectedRoom] = useState(() =>  Cookies.get('room') || '');
  const [min, setMin] = useState(() => Cookies.get('min') || '');
  const [max, setMax] = useState(() => Cookies.get('max') || '');
  const [inputState, setInputState] = useState(() => Cookies.get('state') || '');
  const [inputCity, setInputCity] = useState(() => Cookies.get('city') || '');

  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if (inputState) {
      getCity(inputState);
    }
  }, [inputState, getCity])



  const saveStateToCookie = () => {

    Cookies.set('pages', 1); 

    if (selectedExchange) {
       Cookies.set('listing', selectedExchange);
    } else {
      Cookies.remove('listing');
    }
    
    if (inputState) {
      Cookies.set('state', inputState);
    } else {
      Cookies.remove('state');
    }

    if (inputCity) {
      Cookies.set('city', inputCity);
    } else {
      Cookies.remove('city');
    }

    if (min) {
      Cookies.set('min', min);
    } else {
      Cookies.remove('min');
    }

    if (max) {
      Cookies.set('max', max);
    } else {
      Cookies.remove('max');
    }

    if (selectedPropertyType === 'all') {
      selectedPropertyType && Cookies.remove('property_type');
    } else {
      selectedPropertyType && Cookies.set('property_type', selectedPropertyType);
    }

    if (selectedPropertyType === 'all' ||
      selectedPropertyType === 'selfcontain' ||
      selectedPropertyType === 'studio' ||
      selectedPropertyType === 'detached' ||
      selectedPropertyType === 'semidetached' ||
      selectedPropertyType === 'penthouse' ||
      selectedPropertyType === 'office' ||
      selectedPropertyType === 'mall' ||
      selectedPropertyType === 'warehose' ||
      selectedPropertyType === 'townhouse' ||
      selectedPropertyType === 'hotel') {
        Cookies.get('room') && Cookies.remove('room');
    } else {
      selectedRoom && Cookies.set('room', selectedRoom);
    }

    setPage(1);
    setUpdate(!update);
    setFilter(!filter);
    setShowPreLoaders(false);
    setTimeout( () => {
      setShowPreLoaders(true);
    }, 1000)
    
    if (location.pathname !== "/property") {
      navigate("/property");
    }
    window.scrollTo(0, 0);
  }


  const clearFilter = () => {
    setSelectedExchange('');
    setSelectedPropertyType('');
    setSelectedRoom('');
    setMin('');
    setMax('');
    setInputState('');
    setInputCity('');
    setPage(1);
    setTimeout(() => {
      setFilter(!filter);
    }, 500);

    if (
      Cookies.get('listing') ||
      Cookies.get('property_type') ||
      Cookies.get('room') ||
      Cookies.get('min') ||
      Cookies.get('max') ||
      Cookies.get('state') ||
      Cookies.get('city')) 
    {
      Cookies.remove('listing');
      Cookies.remove('property_type');
      Cookies.remove('room');
      Cookies.remove('min');
      Cookies.remove('max');
      Cookies.remove('state');
      Cookies.remove('city');
      setUpdate(!update);
    }
  }

  return(
    <div ref={filterRef}
    className={`${filter ? 'right-0' : 'right-[-100%]'}
    fixed top-0 w-full md:w-[450px] h-screen bg-gray-100 z-30 duration-300
    border shadow-2xl overflow-x-hidden overflow-y-auto`}>

      <div className='h-16 sticky top-0 left-0 flex items-center justify-between
      gap-2 border-b border-gray-300 mx-5 px-2 font-play font-bold z-40 bg-gray-100'>
        <div className='flex gap-2 items-center'>
          <button 
          onClick={() => setFilter(!filter)}>
            <IoIosClose className='text-3xl' />
          </button>
          <div className='text-lg'>Filters</div>
        </div>
        <button 
        onClick={clearFilter}>
          clear
        </button>
      </div>

      <div className='flex justify-around border-b mx-5 py-5'>
        {exchangeList.map(item => (
          <button 
          onClick={() => 
            setSelectedExchange(item)
          }
          className={`${selectedExchange === item ? 'bg-gray-300' : ''} w-20 rounded-md
          border-2 border-gray-300 hover:bg-gray-300 font-light font-play duration-300 `}
          key={item}>
            {item}
          </button>
        ))}
      </div>

    <div className='px-5 py-2 pb-5 font-play border-b'>
        <div className='py-2'>State/City</div>
        <div className='flex justify-around gap-5'>
          <div className='w-1/2'>
            <div className='relative'>
              <input className='w-full h-8 px-2 rounded-sm bg-gray-300 
              border-2 border-gray-300'
              placeholder='State'
              value={inputState}
              type="text" disabled />
              <button 
              onClick={() => {
                    if (!listState.length) {
                      getState();
                      setStateMenu(!stateMenu);
                    }
                    setStateMenu(!stateMenu);
                    setCityMenu(false);
              }}>
                {
                  !stateMenu ?
                  <div className='absolute top-0 right-0 w-full h-8 bg-transparent
                  flex justify-end items-center text-lg pr-4'>
                    <FaAngleDown  /> 
                  </div>:
                  <div className='absolute top-0 right-0 w-full h-8 bg-transparent
                  flex justify-end items-center text-lg pr-4'>
                    <FaAngleUp  /> 
                  </div>
                }
              </button>
            </div>
            <div className={`${stateMenu ? '' : 'hidden'}
            h-60 border border-2 mt-2 flex flex-col py-2 gap-2  
            items-start overflow-auto px-2`}>
              {listState.map(item => (
                <button 
                onClick={() => {
                  setInputState(item);
                  setInputCity('');
                  setStateMenu(!stateMenu);
                }}
                key={item}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className='w-1/2'>
            <div className='relative'>
              <input className='w-full h-8 px-2 rounded-sm bg-gray-300 
              border-2 border-gray-300'
              placeholder='City'
              value={inputCity}
              type="text" disabled />
              <button 
              onClick={() => {
                if (!inputState || inputState === '[]') {
                  return;
                } else {
                    setCityMenu(!cityMenu);
                    setStateMenu(false);
                }
              }}>
                {
                  !cityMenu ?
                  <div className='absolute top-0 right-0 w-full h-8 bg-transparent
                  flex justify-end items-center text-lg pr-4'>
                    <FaAngleDown  /> 
                  </div>:
                  <div className='absolute top-0 right-0 w-full h-8 bg-transparent
                  flex justify-end items-center text-lg pr-4'>
                    <FaAngleUp  /> 
                  </div>
                }
              </button>
            </div>
            <div className={`${cityMenu ? '' : 'hidden'}
            h-60 border border-2 mt-2 flex flex-col items-start
            py-2 gap-2 overflow-auto px-2`}>
              {listCity.map(item => (
                <button 
                onClick={() => {
                  setInputCity(item);
                  setCityMenu(!cityMenu);
                }}
                className=''
                key={item}>
                  {item}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className='px-5 py-2 font-play'>
        <div className='py-2'>Property-Type</div>
        {optionPropertyType.map(item => (
          <button 
          onClick={() => {
            setSelectedPropertyType(item.value);
          }}
          className={`${selectedPropertyType === item.value ? 'bg-gray-300' : ''}
          border mx-2 my-2 px-3 py-[1px] rounded-sm border-gray-300 hover:bg-gray-300
          duration-300`}
          key={item.value}>
            {item.label}
          </button>
        ))}
      </div>

      <div 
      className={`${selectedPropertyType ? 
      (
      (selectedPropertyType === 'bungalow' ||
      selectedPropertyType === 'duplex' ||
      selectedPropertyType === 'apartment' ||
      selectedPropertyType === 'triplex' ||
      selectedPropertyType === 'mansion') ? 
      'block' : 'hidden') : 
      ('')} px-5 py-2 font-play`}>
        <div className='py-2'>Bedrooms</div>
        {roomNumber.map(item => (
          <button 
          onClick={() => {
            setSelectedRoom(item);
          }}
          className={`${selectedRoom === item ? 'bg-gray-300' : ''}
          border mx-2 my-2 px-3 py-[1px] rounded-sm border-gray-300 hover:bg-gray-300`}
          key={item}>
            {item}
          </button>
        ))}
      </div>

      <div className='font-play border-t border-b pb-5 mx-5'>
        <div className='py-2'>Price Range</div>
        <div className='flex justify-around gap-10 h-8'>
          <input className='rounded-sm bg-gray-300 border-2 border-gray-300
          p-2 w-40' 
          placeholder='min'
          value={min}
          onChange={(e) => setMin(e.target.value)}
          type="text" />
          <input className='rounded-sm bg-gray-300 border-2 border-gray-300
          p-2 w-40' 
          placeholder='max'
          value={max}
          onChange={(e) => setMax(e.target.value)}
          type="text" />
        </div>
      </div>

      <div className='px-5 pt-5 pb-20'>
        <button onClick={saveStateToCookie}
        className='border w-16 py-[2px] border border-gray-300 font-play 
        hover:bg-gray-300 duration-300'>
          Apply
        </button>
      </div>

    </div>
  );
};

export default Filter;
