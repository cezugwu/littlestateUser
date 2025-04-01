import React, { createContext, useCallback, useState } from 'react';
import Cookies from "js-cookie";

export const PropertyContext = createContext();

const PropertyProvider = ({children}) => {
    const [apartment, setApartment] = useState(() => JSON.parse(sessionStorage.getItem('home')) || []);
    const [loading, setLoading] = useState(true)
    const [fetched, setFetched] = useState(false)
    const [properties, setProperties] = useState([])
    const [seeAlloading, setSeeAllLoading] = useState(true)
    const [page, setPage] = useState(() => parseInt(Cookies.get('pages')) || 1);
    const [count, setCount] = useState('');
    const [itemCount, setitemCount] = useState('');
    const [showPreloaders, setShowPreLoaders] = useState(false);
    const [update, setUpdate] = useState(false);


    const getApartmentAndSelfconatin = async () => {
        setLoading(true);
        try {
            let response = await fetch(`http://127.0.0.1:8001/get_property/`);
            let data = await response.json();
            if (response.status === 200) {
                setApartment(data);
                sessionStorage.setItem('home', JSON.stringify(data));
                console.log(data)
            } else {
                console.log('failed to fetch data');
            }
        } catch (error) {
            console.log('error', error)
        } finally {
            setLoading(false);
        }
    }

    const getFilteredProperties = useCallback(async () => {
        setSeeAllLoading(true);
        const pages = Cookies.get('pages') || 1;
        const sorts = Cookies.get('sort') || '';
        const exchange = Cookies.get('listing') || '';
        const propertyType = Cookies.get('property_type') || '';
        const room = Cookies.get('room') || '';
        const priceMin = Cookies.get('min') || '';
        const priceMax = Cookies.get('max') || '';
        const state = Cookies.get('state') || '';
        const city = Cookies.get('city') || '';
        

        try {
            let response = await fetch(`http://127.0.0.1:8001/get_filtered_property/?ordering=${sorts}&page=${pages}&listing=${exchange}&property_type=${propertyType}&state=${state}&city=${city}&price_max=${priceMax}&price_min=${priceMin}&bedrooms=${room}`);
            let data = await response.json();
            if (response.status === 200) {
                console.log(data);
                setCount(data.count);
                setitemCount(data.item_count);
                setProperties(data.data);
            } else {
                console.log('failed to fetch data');
            }
        } catch (error) {
            console.log('error', error)
        } finally {
            setSeeAllLoading(false);
        }
    }, [])


    return(
        <PropertyContext.Provider value={{getApartmentAndSelfconatin, getFilteredProperties, 
            apartment, loading, setLoading, properties, seeAlloading, page, setPage, count, fetched, 
            setFetched, itemCount, showPreloaders, setShowPreLoaders, update, setUpdate
        }}>
            {children}
        </PropertyContext.Provider>
    );
}

export default PropertyProvider;