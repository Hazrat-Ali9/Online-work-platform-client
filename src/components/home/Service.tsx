"use client";

import React from "react";
import Container from "../ui/Container";
import imgPaperSection from "../../assets/images/img_paper-section-top.webp";
import Image from "next/image";
import Button from "../ui/Button";
import { useCategoriesQuery } from "@/redux/features/categories/categoriesApi";
import Form from "../ui/Form";
import FormSelect from "../ui/FormSelect";
import { RemainingDays } from "@/constants/globals";
import { useAppSelector } from "@/redux/hooks";
const Service = () => {
  const { data, isLoading, isError } = useCategoriesQuery(undefined);
  const { task } = useAppSelector((state) => state.tasks);
  let content = null;
  if (isLoading)
    content = [
      {
        label: "Loading...",
        value: "Loading...",
      },
    ];
  if (!isLoading && isError)
    content = [
      {
        label: "Something went wrong",
        value: "Something went wrong",
      },
    ];
  if (!isLoading && !isError && data && data?.data?.length > 0) {
    content = data?.data?.map((category) => ({
      label: category.name,
      value: category.name,
    }));
  }

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <section className="py-32 text-white">
      <Container className="flex gap-x-10">
        <Form
          submitHandler={handleSubmit}
          className="bg-yellow-600 p-5 basis-1/2 text-white rounded-md"
        >
          <h2 className="text-3xl font-normal mb-5">
            We write any type of work in any discipline
          </h2>
          <FormSelect
            name="type"
            label="Type of service"
            options={content as any}
            className="max-w-full"
            required={true}
          />
          <FormSelect
            name="time"
            label="Time of service"
            options={RemainingDays as any}
            className="max-w-full"
            required={true}
          />
          <span>Price: {task?.price}</span>
          <Button className="mt-10">Proceed To Order</Button>
        </Form>
        <div className="border border-white p-10 basis-1/2 rounded-md">
          <h2 className="text-base lg:text-3xl mb-5">
            How you can get you paper done super fast
          </h2>
          <ul className="[&>li]:mb-3 text-xl">
            <li>1. Fill out the order form.</li>
            <li>2. Pay for your work.</li>
            <li>3. Stay in touch with your expert.</li>
            <li>4. Download the finished work.</li>
          </ul>
          <Image
            src={imgPaperSection}
            alt="Paper Section"
            height={100}
            width={100}
            className="ml-auto"
          />
        </div>
      </Container>
    </section>
  );
};

export default Service;
