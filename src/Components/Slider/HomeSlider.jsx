import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// --- FIXED: Corrected the image import paths ---
import imgSlider1 from "../../assets/images/slider-image-1.jpeg";
import imgSlider2 from "../../assets/images/slider-image-2.jpeg";
import imgSlider3 from "../../assets/images/slider-image-3.jpeg";
import imgSlider4 from "../../assets/images/ad-banner-1.png";
import imgSlider5 from "../../assets/images/ad-banner-2.png";

// Reusable Slide Component
const Slide = ({ image, title, description, offer, price, link }) => (
  <div className="relative w-full h-[250px] md:h-[525px] rounded-lg overflow-hidden">
    <img src={image} className="w-full h-full object-cover" alt={title} />
    <div className="absolute inset-0 bg-opacity-20" />
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center p-6 md:p-12 lg:w-3/4 xl:w-1/2">
      <div className="flex items-center mb-3">
        <span className="text-white font-semibold">{description}</span>
        {offer && (
          <span className="ml-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            {offer}% OFF
          </span>
        )}
      </div>
      <h2
        className="text-white font-bold text-3xl md:text-5xl mb-3 leading-tight"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className="my-4">
        <span className="text-white text-lg">
          Start from{" "}
          <span className="text-red-400 font-bold text-xl ml-1">
            {price} EGP
          </span>
        </span>
      </div>
      <Link
        to={link}
        className="bg-teal-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-600 transition-colors duration-300 self-start inline-flex items-center"
      >
        Shop Deals Now
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </div>
  </div>
);

// Reusable Ad Banner Component
const AdBanner = ({ image, title, subtitle, code, link }) => (
  <div className="relative w-full h-[250px] rounded-lg overflow-hidden group">
    <img
      src={image}
      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
      alt={title}
    />
    <div className="absolute inset-0 bg-opacity-30" />
    <div className="absolute top-0 left-0 p-8">
      <h3
        className="text-white font-bold text-2xl leading-tight"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className="mt-3 mb-5 text-emerald-600">
        <p className="mb-0">{subtitle}</p>
        {code && (
          <span>
            Code: <span className="font-bold text-black">{code}</span>
          </span>
        )}
      </div>
      <Link
        to={link}
        className="bg-gray-800 bg-opacity-70 text-white font-bold py-2 px-2 rounded-lg hover:bg-opacity-100 transition-colors duration-300"
      >
        Shop Now
      </Link>
    </div>
  </div>
);

export default function HomeSlider() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Main Slider */}
        <div className="col-span-1 xl:col-span-8">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            className="h-full rounded-lg"
          >
            <SwiperSlide>
              <Slide
                image={imgSlider3}
                title="Cokoladni Kolutici Lasta"
                description="Exclusive Offer"
                offer="20"
                price="185"
                link="/products"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Slide
                image={imgSlider1}
                title="Best Online Deals,<br/> Free Stuff"
                description="Exclusive Offer"
                offer="15"
                price="150"
                link="/products"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Slide
                image={imgSlider2}
                title="Chocozay Wafer<br/>-rolls Deals"
                description="Exclusive Offer"
                offer="35"
                price="200"
                link="/products"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Side Banners */}
        <div className="col-span-1 xl:col-span-4 flex flex-col gap-6">
          <AdBanner
            image={imgSlider4}
            title="10% cashback on<br/>personal care"
            subtitle="Max cashback: $12"
            code="CARE12"
            link="/products"
          />
          <AdBanner
            image={imgSlider5}
            title="Say yes to<br/>season’s fresh"
            subtitle="Refresh your day the fruity way"
            link="/products"
          />
        </div>
      </div>
    </div>
  );
}
