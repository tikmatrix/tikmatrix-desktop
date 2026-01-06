import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import './index.css';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const ImageSlider = () => {

    return (
        <Swiper
            // spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper">
            <SwiperSlide>
                <img
                    alt="App Preview Image"
                    className="hero__img "
                    src="img/startup1.webp?v=4"
                    data-aos="fade-up" />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    alt="App Preview Image"
                    className="hero__img "
                    src="img/startup2.webp?v=4"
                    data-aos="fade-up" />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    alt="App Preview Image"
                    className="hero__img "
                    src="img/startup3.webp?v=4"
                    data-aos="fade-up" />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    alt="App Preview Image"
                    className="hero__img "
                    src="img/startup4.webp?v=4"
                    data-aos="fade-up" />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    alt="App Preview Image"
                    className="hero__img "
                    src="img/startup5.webp?v=4"
                    data-aos="fade-up" />
            </SwiperSlide>

        </Swiper>

    );
};

export default ImageSlider;