import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import LoadingSpinner from "../CustomComponents/LoadingSpinner";
import UseAllCategories from "../CustomComponents/UseAllCategories";
import { Helmet } from "react-helmet";

export default function CategoriesSlider() {
  const { data, isError, isLoading } = UseAllCategories();

  // const [allCategories, setAllCategories] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  // function getSliderCategories() {
  //   axios
  //     .get("https://ecommerce.routemisr.com/api/v1/categories")
  //     .then((response) => {
  //       setAllCategories(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching categories:", error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }

  // useEffect(() => {
  //   getSliderCategories();
  // }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <>
        <div className="text-center p-5">
          <h3 className="text-muted">No Categories Slider found.</h3>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="View and manage your personalized profile. Explore account settings and preferences."
        />
        <title>Categories</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <h2 className="text-lg font-semibold mb-3">Shop Popular Categories</h2>
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
          {data.data.data.map((category) => (
            <SwiperSlide key={category._id} className="text-center pb-4">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="font-semibold text-sm mt-2">{category.name}</h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
