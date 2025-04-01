import React from 'react';
import Header from './components/Header';
import HeaderProvider from './contexts/HeaderContext';
import Home from './pages/Home';
import FilterProvider from './contexts/FilterContext';
import Filter from './components/Filter';
import ApartmentProvider from './contexts/PropertyContext';
import Footer from './components/Footer';
import LocationProvider from './contexts/LocationContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import PropertyDetailed from './pages/PropertyDeatailed';


const App = () => {
  return (
  <div className='overflow-hidden'>
    <Router>
      <FilterProvider>
      <HeaderProvider>
      <ApartmentProvider>
      <LocationProvider>
      <Header />
      <Filter />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='property/' element={<Search />} />
        <Route path='property/:slug/' element={<PropertyDetailed />} />
      </Routes>
      <Footer />
      </LocationProvider>
      </ApartmentProvider>
      </HeaderProvider>
      </FilterProvider>
    </Router>
  </div>
  );
};

export default App;
