import React from "react";
import "./FreeBies.css";
import Container from "../ui/Container";

const FreeBies = () => {
  return (
    <section className="py-10 md:py-20">
      <div className="section section-freebies bg-neutral">
        <Container className="py-10">
          <div className="section-freebies__inner">
            <h2
              className="uppercase md:!leading-[70px] font-bold text-lg md:text-4xl text-center md:text-left mx-auto md:mx-0"
              data-aos="fade-left"
              data-aos-easing="ease-in-back"
              data-aos-once="true"
            >
              Freebies you receive with every order:
            </h2>
            <ul
              className="list list--black-check-in-circle"
              data-aos="fade-right"
              data-aos-easing="ease-in-back"
              data-aos-once="true"
            >
              <li>Bibliography section with reliable sources</li>
              <li>Consistent communication with your writer</li>
              <li>Formatting in any academic style</li>
              <li>Free title page</li>
              <li>24/7 WOW-support team</li>
            </ul>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default FreeBies;
