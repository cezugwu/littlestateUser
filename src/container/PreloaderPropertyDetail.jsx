import React from 'react';


const PreLoaderPropertyDetail = () => {
    return(
        <div className='flex flex-col lg:flex-row pt-10 gap-2'>
            <div className='bg-gray-300 h-[400px] lg:w-[60%] animate-pulse'></div>
            <div className='lg:w-[40%] pt-5 space-y-5 px-5'>
                <div className='w-full h-16 bg-gray-300 animate-pulse'></div>
                <div className='w-full h-16 bg-gray-300 animate-pulse'></div>
                <div className='w-full h-16 bg-gray-300 animate-pulse'></div>
                <div className='w-full h-16 bg-gray-300 animate-pulse'></div>
            </div>
        </div>
    );
}

export default PreLoaderPropertyDetail;