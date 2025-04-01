import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';
import { FaPhoneAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { TbRulerMeasure, TbBuilding,  TbCurrencyNaira } from "react-icons/tb";
import { MdOutlineBedroomParent, MdOutlineSolarPower, MdOutlineBathroom } from "react-icons/md";
import { GiHomeGarage, GiWaterTower, GiWell } from "react-icons/gi";
import { FaParking } from "react-icons/fa";
import { PiSwimmingPool } from "react-icons/pi";
import { ImCheckmark } from "react-icons/im";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SimilarProperties from '../container/SimilarProperties';
import PreLoader from '../container/Preloader';
import PreLoaderPropertyDetail from '../container/PreloaderPropertyDetail';


const preload = [1, 2, 3, 4, 5];

const PropertyDetailed = () => {
    const [property, setProperty] = useState([]);
    const [similarProperty, setSimilarProperty] = useState([]);
    const [loading, setLoading] = useState(true);
    const {slug} = useParams();
    

    const getProduct = useCallback(async () => {
        setLoading(true);
        try {
            let response = await fetch(`http://127.0.0.1:8001/get_one_property/${slug}/`);
            let data = await response.json();
            if (response.status === 200) {
                setProperty(data.data);

                setSimilarProperty(data.data_recommend);
            } else {
                console.log('failed to fetch property');
            }
        } catch (error) {
            console.log('unexpected error', error)
        }
    }, [slug])

    useEffect(() => {
        getProduct();
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000)

        return () => clearTimeout(timer)
    }, [slug, getProduct])

    const prices = Number(property.price).toLocaleString();

    return(
        <>
            {!loading ?
            <div>
                <div className='pt-20 flex flex-col lg:flex-row gap-2'>
                    <div className='lg:w-[60%] py-5 flex justify-center'>
                        <Swiper
                        modules={[Navigation, A11y]}
                            spaceBetween={20}
                            slidesPerView={1}
                            navigation
                            >
                            <SwiperSlide>
                                <img className=''
                                src={`http://127.0.0.1:8001/${property.imagea}`} alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className=''
                                src={`http://127.0.0.1:8001/${property.imagea}`} alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className=''
                                src={`http://127.0.0.1:8001/${property.imagea}`} alt="" />
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    <div className='lg:w-[40%] flex flex-col justify-around'>
                        <div className='mt-1 mx-2 py-2 box'>
                            <div className='flex items-center font-light'>
                                <div className='pt-[2px]'>
                                    <TbCurrencyNaira className='text-[35px] opacity-70'
                                    strokeWidth={1} />
                                </div>
                                <div className='text-2xl'>{prices}</div>
                            </div>
                            <div className='flex items-center font-thin text-md pt-2 px-1'>
                                <div><CiLocationOn /></div>
                                <div>{property.state}</div>
                                <div>/</div>
                                <div>{property.city}</div>
                            </div>
                            <div className='font-jost font-light text-md pt-2 px-1'>
                                <div>{property.property_type},</div>
                                <div>{property.title}</div>
                            </div>
                        </div>

                        <div className='relative box mx-2 mb-2 pt-11 pb-2 lg:mt-0 mt-10 '>
                          <div 
                          className='absolute bg-red-400 h-16 w-16 rounded-full
                          top-0 left-4 -translate-y-[40%]'>
                          </div>
                          <div className='px-2 space-y-1'>
                            <div className='font-play text-sm font-thin'>gezugwu1@gmail.com</div>
                            <div className='font-play text-md font-medium'>{property.agent_username}</div>

                            <div className='flex justify-between'>
                                <button className='border-2 px-3 py-[2px] border-gray-300 hover:bg-gray-300 
                                rounded-sm'>
                                    <a href={`tel:${(property.agent_phone)?.replace('+', '')}`}
                                    className='flex gap-2 items-center'>
                                        <FaPhoneAlt />
                                        <div>phone</div>
                                    </a>
                                </button>
                                <button className='border-2 px-3 py-[2px] border-gray-300 hover:bg-gray-300 rounded-sm'>
                                    <a href={`https://wa.me/${(property.agent_phone)?.replace('+', '')}`} 
                                    className='flex gap-2 items-center'>
                                        <IoLogoWhatsapp />
                                        <div>Whatapp</div>
                                    </a>
                                </button>
                            </div>
                          </div>
                        </div>

                    </div>
                </div>

                <div className='mt-3'>
                    <div>
                        <div className='font-jost'>
                            <div className='border-b-2 border-gray-300 py-2 font-medium px-5'>Property Description</div>
                            <div className='pt-3 px-5 font-light'>{property.description}</div>
                        </div>
                    </div>
                    <div className='pt-4 pb-2 border-b-2 border-gray-300 px-5 font-jost
                    font-medium'>
                        Property information
                    </div>
                    
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 pt-3 px-2'>
                        {
                            property.square_feet &&
                            <div className='hover:shadow-2xl border-2 py-1 duration-300'>
                                <div className='flex flex-col items-center justify-center'>
                                    <TbRulerMeasure className='text-4xl opacity-50'
                                    strokeWidth={2} />
                                    <div className='flex gap-1'>
                                        <div>{property.square_feet}</div>
                                        <div>sq.feet</div>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            property.bedrooms &&
                            <div className='hover:shadow-2xl border-2 py-1 duration-300'>
                                <div className='flex flex-col items-center'>
                                    <MdOutlineBedroomParent className='text-4xl opacity-50'
                                    strokeWidth={0} />
                                    <div className='flex flex-col items-center'>
                                        <div>Bedrooms</div>
                                        <div>{property.bedrooms}</div>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            property.bathrooms &&
                            <div className='hover:shadow-2xl border-2 py-1 duration-300'>
                                <div className='flex flex-col items-center'>
                                    <MdOutlineBathroom className='text-4xl opacity-50'
                                    strokeWidth={0} />
                                    <div className='flex flex-col items-center'>
                                        <div>Bathroom</div>
                                        <div>{property.bathrooms}</div>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            property.floor_count &&
                            <div className='hover:shadow-2xl border-2 py-1 duration-300'>
                                <div className='flex flex-col items-center'>
                                    <TbBuilding className='text-4xl opacity-50'
                                    strokeWidth={2} />
                                    <div className='flex flex-col items-center'>
                                        <div>Floor count</div>
                                        <div>{property.floor_count}</div>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            property.garage &&
                            <div className='hover:shadow-2xl border-2 py-1 duration-300'>
                                <div className='flex flex-col items-center'>
                                    <GiHomeGarage className='text-4xl opacity-50'
                                    strokeWidth={0} />
                                    <div className='flex flex-col items-center'>
                                        <div>Garage</div>
                                        <div className='flex items-center gap-2'>
                                            <div>Available</div>
                                            <ImCheckmark />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            property.bathrooms &&
                            <div className='hover:shadow-2xl border-2 py-1 duration-300'>
                                <div className='flex flex-col items-center'>
                                    <FaParking className='text-4xl opacity-50'
                                    strokeWidth={0} />
                                    <div className='flex flex-col items-center'>
                                        <div>Packing space</div>
                                        <div className='flex items-center gap-2'>
                                            <div>Available</div>
                                            <ImCheckmark />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            property.swimming_pool &&
                            <div className='hover:shadow-2xl border-2 py-1 duration-300'>
                                <div className='flex flex-col items-center'>
                                    <PiSwimmingPool className='text-4xl opacity-50'
                                    strokeWidth={0} />
                                    <div className='flex flex-col items-center'>
                                        <div>Swimming pool</div>
                                        <div className='flex items-center gap-2'>
                                            <div>Available</div>
                                            <ImCheckmark />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            property.solar &&
                            <div className='hover:shadow-2xl border-2 py-1 duration-300'>
                                <div className='flex flex-col items-center'>
                                    <MdOutlineSolarPower className='text-4xl opacity-50'
                                    strokeWidth={0} />
                                    <div className='flex flex-col items-center'>
                                        <div>Solar</div>
                                        <div className='flex items-center gap-2'>
                                            <div>Available</div>
                                            <ImCheckmark />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            property.overhead &&
                            <div className='hover:shadow-2xl border-2 py-1 duration-300'>
                                <div className='flex flex-col items-center'>
                                    <GiWaterTower className='text-4xl opacity-50'
                                    strokeWidth={0} />
                                    <div className='flex flex-col items-center'>
                                        <div>Overhead tank</div>
                                        <div className='flex items-center gap-2'>
                                            <div>Available</div>
                                            <ImCheckmark />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }


                        {
                            property.borehole &&
                            <div className='hover:shadow-2xl border-2 py-1 duration-300'>
                                <div className='flex flex-col items-center'>
                                    <GiWell className='text-4xl opacity-50'
                                    strokeWidth={0} />
                                    <div className='flex flex-col items-center'>
                                        <div>Borehole</div>
                                        <div className='flex items-center gap-2'>
                                            <div>Available</div>
                                            <ImCheckmark />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }


                    </div>
            
                </div>

                {/*recomendation section*/}
                {
                    similarProperty.length !== 0 &&
                    <div className='pt-10'>
                        <div className='px-5 font-medium py-5'>Similar Properties</div>
                        <div className="grid grid-cols-2 gap-5 mx-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {
                                !loading ?
                                similarProperty.map(item => (
                                    <SimilarProperties item={item} key={item.slug} />
                                ))
                                :
                                preload.map(item => (
                                    <PreLoader key={item} />
                                ))
                            }
                        </div>
                    </div>
                }

            </div> 
            :
            <PreLoaderPropertyDetail />
            }
        </>
    );
}

export default PropertyDetailed;