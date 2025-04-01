import React, { createContext, useCallback, useState } from 'react';

export const LocationContext = createContext();

const LocationProvider = ({children}) => {
    const [listState, setListState] = useState([]);
    const [listCity, setListCity] = useState([]);
    const [stateMenu, setStateMenu] = useState(false);
    const [cityMenu, setCityMenu] = useState(false);


    const getState = async () => {
        try {
            let response = await fetch(`http://127.0.0.1:8001/get_state/`);
            let data = await response.json();
            if (response.status === 200) {
                const state_data = data.map(item => item.state);
                console.log(state_data);
                setListState(state_data);
            } else {
                console.log('failed to fetch state');
            }
        } catch (error) {
            console.log('unexpected error', error);
        }
    }

    const getCity = useCallback(async (state) => {
        try {
            let response = await fetch(`http://127.0.0.1:8001/get_city/?state=${state}`);
            let data = await response.json();
            if (response.status === 200) {
                const city_data = data.map(item => item.city);
                console.log(city_data);
                setListCity(city_data);
            } else {
                console.log('failed to fetch city');
            }
        } catch (error) {
            console.log('unexpected error', error);
        }
    }, [])

    return(
        <LocationContext.Provider value={{listCity, listState, getCity, getState,
            cityMenu, stateMenu, setCityMenu, setStateMenu
        }}>
            {children}
        </LocationContext.Provider>
    );
}

export default LocationProvider;