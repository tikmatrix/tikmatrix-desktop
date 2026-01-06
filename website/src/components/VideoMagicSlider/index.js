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
                    src="/img/video-magic-startup1.webp?v=1"
                    data-aos="fade-up" />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    alt="App Preview Image"
                    className="hero__img "
                    src="/img/video-magic-startup2.webp?v=1"
                    data-aos="fade-up" />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    alt="App Preview Image"
                    className="hero__img "
                    src="/img/video-magic-startup3.webp?v=1"
                    data-aos="fade-up" />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    alt="App Preview Image"
                    className="hero__img "
                    src="/img/video-magic-startup4.webp?v=1"
                    data-aos="fade-up" />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    alt="App Preview Image"
                    className="hero__img "
                    src="/img/video-magic-startup5.webp?v=1"
                    data-aos="fade-up" />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    alt="App Preview Image"
                    className="hero__img "
                    src="/img/video-magic-startup6.webp?v=1"
                    data-aos="fade-up" />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    alt="App Preview Image"
                    className="hero__img "
                    src="/img/video-magic-startup7.webp?v=1"
                    data-aos="fade-up" />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    alt="App Preview Image"
                    className="hero__img "
                    src="/img/video-magic-startup8.webp?v=1"
                    data-aos="fade-up" />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    alt="App Preview Image"
                    className="hero__img "
                    src="/img/video-magic-startup9.webp?v=1"
                    data-aos="fade-up" />
            </SwiperSlide>
        </Swiper>

    );
};

export default ImageSlider;