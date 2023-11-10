"use client";

import Form from "@/components/ui/Form";
import FormInput from "@/components/ui/FormInput";
import React from "react";

import { Metadata } from "next/types";



const ConatctUsPage = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="flex py-32">
      <div className="m-auto w-full md:w-3/5">
        <div>
          <div className="m-auto bg-white max-w-lg p-8 md:p-12 my-10 rounded-lg shadow-2xl ">
            <Form submitHandler={handleSubmit}>
              <div>
                <label htmlFor="fullName" className="p4-5 px-1 font-thin">
                  Full Name:
                </label>
                <FormInput
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  className="px-4 py-3 max-w-full mt-2 border-2 rounded-md text-sm outline-none focus:border-1 focus:border-purple-600 "
                />
                <div className="text-red-600 font-semibold text-xs">
                  {/* <ErrorMessage name="fullName" /> */}
                </div>
              </div>
              <div className="flex flex-col mb-5">
                <label htmlFor="email" className="pt-5 px-1 font-thin">
                  Email:
                </label>
                <FormInput
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="px-4 py-3 max-w-full mt-2 border-2 rounded-md text-sm outline-none focus:border-1 focus:border-purple-600 "
                />
                <div className="text-red-600 font-semibold text-xs">
                  {/* <ErrorMessage name="email" /> */}
                </div>
              </div>
              <div className="flex flex-col ">
                <label htmlFor="message" className=" px-1 font-thin">
                  Message:
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Your Message Here"
                  className="px-4 py-3 w-full border-2 mt-2 rounded-md text-sm outline-none focus:border-1 focus:border-purple-600 "
                />
              </div>
              <button
                type="submit"
                className="mt-4 mb-3 w-full bg-primary hover:text-black text-white py-2 rounded-md transition duration-100"
              >
                Submit
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConatctUsPage;
