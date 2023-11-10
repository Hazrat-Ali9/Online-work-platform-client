import Image from "next/image";
import React from "react";
import clockImg from "@/assets/svg/img_clock.svg";
import Container from "../ui/Container";
import Button from "../ui/Button";
const AsapFeatures = () => {
  return (
    <section
      className="py-10 md:py-20"
      data-aos="fade-up"
      data-aos-easing="ease-in-back"
      data-aos-once="true"
    >
      <Container className="bg-neutral p-5 rounded-md">
        <div className="flex flex-col md:flex-row items-center gap-y-10 md:gap-y-0 md:gap-x-10 text-white px-5 text-center md:text-left">
          <Image src={clockImg} width={200} height={200} alt="asap-features" />
          <div>
            <h2 className="text-xl mb-5">Need your work complete ASAP?</h2>
            <p>
              We are here for you 24/7. Just tell us about your task, and we’ll
              help you out.
            </p>
            <Button className="btn w-auto">Order Now</Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AsapFeatures;
