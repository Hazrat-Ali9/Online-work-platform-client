"use client";

import { useCategoriesQuery } from "@/redux/features/categories/categoriesApi";
import { setSearch } from "@/redux/features/filter/filterSlice";
import { useAppDispatch } from "@/redux/hooks";
import Lottie from "lottie-react";
import Link from "next/link";
import Container from "../ui/Container";
import ExpertAnimation from "@/lottieAnimation/ExpertAnimation.json";

const HomepageBanner = () => {
  const { data, isLoading, isError } = useCategoriesQuery(undefined);

  // decide what to render
  let content = null;

  // if (isLoading) {
  //   content = <div>Loading...</div>;
  // }
  if (!isLoading && !isError && data) {
    content = data?.data?.map((item) => (
      <span
        key={item.id}
        className="inline-block mr-3 border border-white px-3 rounded-full py-1 text-sm"
      >
        {item.name}
      </span>
    ));
  }

  const dispatch = useAppDispatch();

  return (
    <section className="pb-10 md:py-20">
      <Container className="flex flex-col-reverse md:flex-row justify-between items-center">
        <div
          className="mt-10 md:mt-0"
          data-aos="fade-left"
          data-aos-mirror="true"
          data-aos-once="true"
        >
          <h1 className="text-lg lg:text-5xl font-semibold lg:font-bold mb-5 leading-tight">
            Find the right person
            <br />
            to complete your task
          </h1>
          <form className="mt-12">
            <div className="max-w-xl">
              <div className="flex">
                <div className="flex rounded-md overflow-hidden w-full">
                  <input
                    type="text"
                    className="w-full rounded-md rounded-r-none px-5"
                    placeholder="Enter your task topic"
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                  />
                  <Link
                    href="/#task-section"
                    className="bg-primary text-white px-6 text-lg font-semibold py-4 rounded-r-md"
                  >
                    <svg
                      className="h-4 w-4 text-grey-dark"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </form>
          <div className="mt-8">
            <span className="inline-block font-semibold">Popular: </span>{" "}
            {content}
          </div>
        </div>{" "}
        <Lottie
          className="w-full md:w-[35%]"
          animationData={ExpertAnimation}
          loop={true}
          data-aos="fade-right"
          data-aos-mirror="true"
          data-aos-once="true"
        />
      </Container>
    </section>
  );
};

export default HomepageBanner;
