import { TaskReview } from "@/types/ApiResponse";
import ServiceReview from "./ServiceReview";
// Import Swiper React components
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ServiceReviews = ({ taskReviews }: { taskReviews: TaskReview[] }) => {
  const [_, setInit] = useState<boolean>(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="mt-10 max-w-md">
      <h2 className="text-2xl mb-10">What people loved about this seller</h2>
      <div className="flex items-center">
        <button ref={prevRef}>
          <FaChevronLeft />
        </button>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              return (
                '<span class="mt-10 ' +
                className +
                '"><img class="pagination-bullet bg-white w-3 h-2 rounded-full"/></span>'
              );
            },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          loop={true}
          className="w-full"
          onInit={() => setInit(true)}
          breakpoints={{
            0: {
              // width: 0,
              spaceBetween: 10,
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
          }}
        >
          {taskReviews.map((review: any) => {
            const { id, comment, buyer, createdAt } = review;
            const { name, avatarUrl, permanentAddress } = buyer;

            return (
              <SwiperSlide key={id}>
                <ServiceReview
                  key={id}
                  name={name}
                  avatarUrl={avatarUrl}
                  comment={comment}
                  permanentAddress={permanentAddress}
                  createdAt={createdAt}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <button ref={nextRef}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ServiceReviews;
