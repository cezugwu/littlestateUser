import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay,} from 'swiper/modules';
import Discount from '../img/discount2.png';

import 'swiper/css';
import 'swiper/css/pagination';


const Promotion = () => {
    return (
        <div className='my-8'>
            <div className='py-5 z-10 relative contain font-jost'>
                Exclusive Offers & Announcements
            </div>
            <div>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={1.5}
                    pagination={{ clickable: true }}
                    loop={true}
                    centeredSlides={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        300: {slidesPerView: 1.5},
                        360: { slidesPerView: 1.5 },
                        450: { slidesPerView: 1.5 },
                        600: { slidesPerView: 1.5 },
                        700: { slidesPerView: 1.9 },
                        768: { slidesPerView: 2.1 },
                        850: { slidesPerView: 2.3 },
                        1024: { slidesPerView: 2.7 },
                        1280: { slidesPerView: 3 },
                    }}
                    modules={[Pagination, Autoplay]}
                >
                    <SwiperSlide>
                        <img className='w-[300px] md:w-[700px] mx-auto'
                        src={Discount} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-[300px] md:w-[700px] mx-auto'
                        src={Discount} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-[300px] md:w-[700px] mx-auto'
                        src={Discount} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-[300px] md:w-[700px] mx-auto'
                        src={Discount} alt="" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}

export default Promotion;