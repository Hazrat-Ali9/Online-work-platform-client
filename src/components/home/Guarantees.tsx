import React from "react";
import Container from "../ui/Container";
import Image from "next/image";
import moneIcon from "@/assets/svg/ico_money.svg";
import "./Guarantees.css";
const Guarantees = () => {
  return (
    <section className="py-10 md:py-20">
      <Container>
        <h1
          className="text-lg md:text-3xl lg:text-5xl font-semibold"
          data-aos="fade-up"
          data-aos-easing="ease-in-back"
          data-aos-once="true"
        >
          GUARANTEES WE OFFER
        </h1>
        <div className="flex flex-col md:flex-row mt-16 items-center justify-between gap-y-20 md:gap-y-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:basis-[65%]">
            <div
              data-aos="fade-up"
              data-aos-easing="ease-in-back"
              data-aos-delay="300"
              data-aos-once="true"
            >
              <div className="flex gap-x-5 mb-4">
                <Image src={moneIcon} alt="money icon" width={30} height={30} />
                <h4 className="text-lg font-semibold">Money-back guarantee</h4>
              </div>
              <p>
                In case you don’t receive the paper you’ve asked for, or you
                wish to cancel the order for any reason, you can get a full or
                partial refund.
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-easing="ease-in-back"
              data-aos-delay="500"
              data-aos-once="true"
            >
              <div className="flex gap-x-5 mb-4">
                <Image src={moneIcon} alt="money icon" width={30} height={30} />
                <h4 className="text-lg font-semibold">Free revisions</h4>
              </div>
              <p>
                Do My Works expert will edit your paper for free if you notice
                any flaws within it. Apply for a revision if you want to change
                anything in your paper.
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-easing="ease-in-back"
              data-aos-delay="700"
              data-aos-once="true"
            >
              <div className="flex gap-x-5 mb-4">
                <Image src={moneIcon} alt="money icon" width={30} height={30} />
                <h4 className="text-lg font-semibold">
                  Authenticity guarantee
                </h4>
              </div>
              <p>
                Every paper we deliver is customized. To guarantee its
                originality, we double-check every work with our in-house
                plagiarism-detection software.
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-easing="ease-in-back"
              data-aos-delay="900"
              data-aos-once="true"
            >
              <div className="flex gap-x-5 mb-4">
                <Image src={moneIcon} alt="money icon" width={30} height={30} />
                <h4 className="text-lg font-semibold">
                  Confidentiality guarantee
                </h4>
              </div>
              <p>
                We never publicly disclose email addresses or phone numbers that
                our customers provide. We want every student to feel safe and
                protected while using our service.
              </p>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-easing="ease-in-back"
            data-aos-delay="1100"
            data-aos-once="true"
            className="md:basis-[35%] m-auto text-center"
          >
            <div className=" text-white">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">97.98%</h2>
                <p>of orders are delivered on time</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">8.5/10</h2>
                <p>customer satisfaction rate</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Guarantees;
