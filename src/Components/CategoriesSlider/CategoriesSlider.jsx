import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
// FIX: Import Autoplay module for automatic sliding
import { Autoplay } from "swiper/modules";
import LoadingSpinner from "../CustomComponents/LoadingSpinner"; // Assuming LoadingSpinner is in a subfolder

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function CategoriesSlider() {
  const [allCategories, setAllCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function getSliderCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => {
        setAllCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getSliderCategories();
  }, []);

  if (isLoading) {
    // You can return a smaller spinner or null if you prefer
    return null;
  }

  return (
    <>
      {allCategories ? (
        <div className="py-4">
          <h2 className="text-lg font-semibold mb-3">
            Shop Popular Categories
          </h2>
          <Swiper
            // Responsive breakpoints
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 7,
                spaceBetween: 30,
              },
            }}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {allCategories.map((category) => (
              <SwiperSlide key={category._id} className="text-center">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h5 className="font-semibold text-sm mt-2">{category.name}</h5>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
