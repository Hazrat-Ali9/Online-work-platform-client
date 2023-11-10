"use client";

import { useTestmonialsQuery } from "@/redux/features/testimonial/testimonialApi";
import Image from "next/image";
import Container from "../ui/Container";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef, useState } from "react";

const Testimonials = () => {
  const { data, isLoading, isError } = useTestmonialsQuery(undefined);
  const [_, setInit] = useState<boolean>(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (!isLoading && isError) {
    content = <p>Something went wrong</p>;
  }
  if (!isLoading && !isError && data && data?.data?.length > 0) {
    content = (
      <div className="flex gap-6">
        <button ref={prevRef}>
          <FaChevronLeft />
        </button>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={2}
          loop={true}
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
          scrollbar={{ draggable: true }}
          onInit={() => setInit(true)}
          className="w-full"
          breakpoints={
            {
              // when window width is >= 640px
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              // when window width is >= 1200px
              1200: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            } as any
          }
        >
          {data?.data.map((testimonial, index) => {
            const user = (testimonial as any)?.user;

            let userObj: Record<string, any> = {};
            let userKeys: String = "";

            Object.keys(user).forEach((key) => {
              if (user[key] !== null) {
                userObj = user[key];
                userKeys = key;
              }
            });

            return (
              <SwiperSlide key={testimonial.id}>
                <div
                  className="p-5 border border-gray-500 rounded-2xl max-w-sm"
                  data-aos="fade-up"
                  data-aos-easing="ease-in-back"
                  data-aos-delay={index * 100}
                  data-aos-once="true"
                >
                  <div className="flex gap-x-5">
                    {userObj.avatarUrl ? (
                      <div className="avatar">
                        <div className="w-8">
                          <Image
                            className="rounded-full"
                            src={userObj.avatarUrl}
                            alt="ed-dev"
                            width={30}
                            height={30}
                          />
                        </div>
                      </div>
                    ) : null}
                    <div>
                      <h3 className="text-sm">{userObj.name}</h3>
                      <p className="text-xs">{userObj.presentAddress}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm">{testimonial.description}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <button ref={nextRef}>
          <FaChevronRight />
        </button>
      </div>
    );
  }

  return (
    <section className="py-10 md:py-20">
      <Container>
        <h1
          className="text-white text-xl md:text-4xl font-bold mb-2"
          data-aos="fade-left"
          data-aos-easing="ease-in-back"
          data-aos-once="true"
        >
          EVALUATION OF OUR WORK
        </h1>
        <p
          className="text-sm md:text-base mb-10"
          data-aos="fade-left"
          data-aos-easing="ease-in-back"
          data-aos-once="true"
        >
          Here’s what students say about us.
        </p>
        {content}
      </Container>
    </section>
  );
};

export default Testimonials;
