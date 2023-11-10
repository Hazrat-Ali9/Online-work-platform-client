import Image from "next/image";
import React from "react";
import manThinkingImg from "@/assets/images/img_man-thinking.webp";
import Container from "../ui/Container";
import Button from "../ui/Button";

const TroubleSolution = () => {
  return (
    <section className="py-20">
      <Container className="bg-neutral px-5 py-10 md:py-0 pt-5 rounded-md">
        <div className="flex flex-col md:flex-row items-center gap-x-10 text-white text-center md:text-left">
          <Image
            src={manThinkingImg}
            width={300}
            height={1000}
            alt="asap-features"
            data-aos="fade-left"
            data-aos-easing="ease-in-back"
            data-aos-once="true"
          />

          <div
            className="mt-6 md:mt-0"
            data-aos="fade-right"
            data-aos-easing="ease-in-back"
            data-aos-once="true"
          >
            <h2 className="text-2xl mb-2">
              Having a hard time figuring out how to do your work?
            </h2>
            <p>Ask our experts for help and get it done in no time!</p>
            <Button className="btn w-auto">Place an Order</Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TroubleSolution;
