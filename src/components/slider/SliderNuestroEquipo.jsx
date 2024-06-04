import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards, Autoplay } from 'swiper/modules';

import nuestroEquipo1 from "../../images/nuestroEquipo1.webp";
import nuestroEquipo2 from "../../images/nuestroEquipo2.webp";
import nuestroEquipo3 from "../../images/nuestroEquipo3.webp";
import nuestroEquipo4 from "../../images/nuestroEquipo4.webp";

export default function SliderNuestroEquipo() {
  return (
    <>
      <section className='px-8 my-6'>
        <Swiper
            effect={'cards'}
            grabCursor={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            modules={[EffectCards, Autoplay]}
            className="mySwiper w-full max-w-sm animate-fade-up animate-delay-500"
        >
            <SwiperSlide>
                <img className='rounded-lg' src={nuestroEquipo1.src} alt="xd" />
            </SwiperSlide>
            <SwiperSlide>
                <img className='rounded-lg' src={nuestroEquipo2.src} alt="xd" />
            </SwiperSlide>
            <SwiperSlide>
                <img className='rounded-lg' src={nuestroEquipo3.src} alt="xd" />
            </SwiperSlide>
            <SwiperSlide>
                <img className='rounded-lg' src={nuestroEquipo4.src} alt="xd" />
            </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
}
