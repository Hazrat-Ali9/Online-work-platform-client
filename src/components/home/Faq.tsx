"use client";

import React, { useState } from "react";
import Container from "../ui/Container";

const Faq = () => {
  const [active, setActive] = useState(0);

  const handleActive = (index: number) => {
    setActive(index);
  };

  return (
    <section className="py-20 md:py-32">
      <Container className="flex flex-col md:flex-row gap-y-20 md:gap-y-0 gap-x-20">
        <div
          className="basis-1/2 text-center md:text-left"
          data-aos="fade-left"
          data-aos-easing="ease-in-back"
          data-aos-once="true"
        >
          <h1 className="text-lg md:text-4xl lg:text-5xl uppercase md:!leading-[70px] font-bold mb-10 ">
            ANSWERS ABOUT WORK HELP
          </h1>
          <p className="max-w-xs mb-5 text-sm mx-auto md:mx-0">
            If your question is not on the list, you can use our chat and talk
            to our specialist.
          </p>
          <button className="btn btn-primary  mb-5">Open Chat</button>
          <p className="text-sm">Monday 00:00 AM and Saturday 08:00 PM (UTC)</p>
        </div>
        <div
          className="basis-1/2"
          data-aos="fade-right"
          data-aos-easing="ease-in-back"
          data-aos-once="true"
        >
          <div className="join join-vertical w-full">
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input
                type="radio"
                name="my-accordion-4"
                onClick={() => handleActive(0)}
                checked={active === 0}
              />
              <div className="collapse-title text-base md:text-xl font-medium">
                Can you do my work for me?
              </div>
              <div className="collapse-content text-sm md:text-base">
                <p>
                  Yes, we can do your work for you to give you an idea of how
                  you should handle your tasks!
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input
                type="radio"
                name="my-accordion-4"
                onClick={() => handleActive(1)}
                checked={active === 1}
              />
              <div className="collapse-title text-base md:text-xl font-medium">
                Who can I pay to do my homework?
              </div>
              <div className="collapse-content text-sm md:text-base">
                <p>
                  At our website, you can pay top-level experts for their help!
                  When we do your homework, we assign each order to the most
                  suitable professional in the corresponding field. Each of our
                  experts is a highly qualified specialist who knows the
                  struggles of student life first-hand. They work from different
                  countries, so there`s always someone to ask for professional
                  assistance.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input
                type="radio"
                name="my-accordion-4"
                onClick={() => handleActive(2)}
                checked={active === 2}
              />
              <div className="collapse-title text-base md:text-xl font-medium">
                How fast can you help with university work?
              </div>
              <div className="collapse-content text-sm md:text-base">
                <p>
                  We can provide you with university work help in just 8 hours!
                  This urgent delivery doesn’t affect quality, so it costs a bit
                  more than an identical order with a longer deadline would.
                  That’s why you’re always welcome to order in advance and save
                  money by giving your expert more time. Nonetheless, we can
                  always help you with maximum urgency.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input
                type="radio"
                name="my-accordion-4"
                onClick={() => handleActive(2)}
                checked={active === 2}
              />
              <div className="collapse-title text-base md:text-xl font-medium">
                Can you assist if I need help with my work confidentially?
              </div>
              <div className="collapse-content text-sm md:text-base">
                <p>
                  Yes, we can! We never publicly disclose the private
                  information of our clients when we do your work. Our privacy
                  policy safeguards all the information you share with us. The
                  only goal we use your email and phone number for is delivering
                  your orders. That’s it! However, you can always opt to receive
                  email notifications about our special offers and discounts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Faq;
