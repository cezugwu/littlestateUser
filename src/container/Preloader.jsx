import React from 'react';


const PreLoader = () => {
    return(
        <div className='relative z-10 w-full h-52 shadow-2xl bg-gray-100
         flex flex-col items-center gap-1 py-3'>
            <div className='w-36 sm:w-48 h-36 bg-gray-300 animate-pulse'></div>
            <div className='w-36 sm:w-48 h-5 bg-gray-300 mt-3 animate-pulse'></div>
            <div  className='w-36 sm:w-48 h-5 bg-gray-300 mt-3 animate-pulse'></div>
        </div>
    );
}

export default PreLoader;