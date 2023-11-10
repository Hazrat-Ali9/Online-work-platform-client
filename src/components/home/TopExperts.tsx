import React from "react";
import Container from "../ui/Container";
import Image from "next/image";
import badgeIcon from "@/assets/svg/ico_star.svg";
import elizaImg from "@/assets/images/img_eliza.webp";
import harryImg from "@/assets/images/img_harry.webp";
import sarahImg from "@/assets/images/img_sarah.webp";
import heartImg from "@/assets/images/img_heart.webp";
import Button from "../ui/Button";

const TopExperts = () => {
  return (
    <section className="py-10 md:py-20">
      <Container>
        <div className="flex flex-col md:flex-row justify-between mb-10">
          <div
            className="basis-full md:basis-[60%] text-center md:text-left"
            data-aos="fade-left"
            data-aos-easing="ease-in-back"
            data-aos-once="true"
          >
            <h1 className="text-white text-xl md:text-4xl font-bold mb-5">
              TOP EXPERTS
            </h1>
            <p className="text-sm md:text-base">
              We make sure your expert suits your academic needs. All our
              writers pass several application tests and undergo thorough
              training before they start working.
            </p>
          </div>
          <div
            className="hidden basis-full md:basis-[40%] md:flex gap-x-5 items-start justify-center"
            data-aos="fade-right"
            data-aos-easing="ease-in-back"
            data-aos-once="true"
          >
            <Image src={badgeIcon} width={35} height={50} alt="badge-icon" />
            <p className="w-1/2">
              Each of our experts is highly qualified in their field
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 md:gap-y-0 md:gap-x-10">
          <div
            data-aos="fade-up"
            data-aos-easing="ease-in-back"
            data-aos-delay="300"
            data-aos-once="true"
          >
            <Image
              src={elizaImg}
              width={1000}
              height={300}
              alt="eperts-image"
            />
            <div className="flex mt-4 items-center">
              <h2 className="font-semibold mr-3">Eliza</h2>
              <div className="rating">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400 h-3 w-4"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400 h-3 w-4"
                  checked
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400 h-3 w-4"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400 h-3 w-4"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400 h-3 w-4"
                />
              </div>
              <span className="inline-block text-sm ml-3">5.0</span>
            </div>
            <p className="text-sm mt-3">
              She specializes in management, writing papers to meet students’
              demands. Place an order to get help from Eliza in the shortest
              term.
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-easing="ease-in-back"
            data-aos-delay="500"
            data-aos-once="true"
          >
            <Image
              src={harryImg}
              width={1000}
              height={300}
              alt="eperts-image"
            />
            <div className="flex mt-4 items-center">
              <h2 className="font-semibold mr-3">Harry</h2>
              <div className="rating">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400 h-3 w-4"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400 h-3 w-4"
                  checked
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400 h-3 w-4"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400 h-3 w-4"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400 h-3 w-4"
                />
              </div>
              <span className="inline-block text-sm ml-3">4.7</span>
            </div>
            <p className="text-sm mt-3">
              If you need a poem or a complex literary analysis, this guy is
              ready to help. Creative writing is Harry’s strong point.
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-easing="ease-in-back"
            data-aos-delay="700"
            data-aos-once="true"
          >
            <Image
              src={sarahImg}
              width={1000}
              height={300}
              alt="eperts-image"
            />
            <div className="flex mt-4 items-center">
              <h2 className="font-semibold mr-3">Sarah</h2>
              <div className="rating">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400 h-3 w-4"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400 h-3 w-4"
                  checked
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400 h-3 w-4"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400 h-3 w-4"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400 h-3 w-4"
                />
              </div>
              <span className="inline-block text-sm ml-3">4.9</span>
            </div>
            <p className="text-sm mt-3">
              She knows C++ and JavaScript, easily dealing with programming
              works of any level.
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-easing="ease-in-back"
            data-aos-delay="900"
            data-aos-once="true"
          >
            <Image
              src={heartImg}
              width={1000}
              height={300}
              alt="eperts-image"
              className="mb-4"
            />
            <Button className="mb-4">Hire work expert</Button>
            <Button className="m-0">More about our expert</Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TopExperts;
