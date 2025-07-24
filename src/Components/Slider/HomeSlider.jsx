import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import slideImage1 from "../../assets/images/slider-image-1.jpeg";
import slideImage2 from "../../assets/images/slider-image-2.jpeg";
import slideImage3 from "../../assets/images/slider-image-3.jpeg";
export default function HomeSlider() {
  return (
    <div className="pb-3">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src={slideImage1}
            alt="img"
            className=" w-full"
            style={{ height: "400px" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={slideImage2}
            alt="img"
            className=" w-full"
            style={{ height: "400px" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={slideImage3}
            alt="img"
            className=" w-full"
            style={{ height: "400px" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={slideImage1}
            alt="img"
            className=" w-full"
            style={{ height: "400px" }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
