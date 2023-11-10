"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import FormDatePicker from "@/components/ui/FormDatePicker";
import FormImageUpload from "@/components/ui/FormImageUpload";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import { bloodGroupOptions, genderOptions } from "@/constants/globals";
import {
  useAdminQuery,
  useAdminUpdateMutation,
} from "@/redux/features/admin/adminApi";
import { useSession } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";

import { Metadata } from "next/types";


type IEditAdminPageProps = {
  params: any;
};

const EditAdminPage = ({ params }: IEditAdminPageProps) => {
  const { data: session } = useSession();
  const items = [
    {
      name: "Dashboard",
      slug: `/dashboard`,
    },
    {
      name: "Manage Admins",
      slug: `/dashboard/manage-admins`,
    },
  ];
  const id: string = params.id;

  const { data, isLoading, isError } = useAdminQuery(id);
  const [updateAdmin] = useAdminUpdateMutation();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <div>Something went wrong happend</div>;
  }

  const onSubmit = async (values: any) => {
    try {
      const obj = { ...values };
      const file = obj["avatarUrl"];

      delete obj["avatarUrl"];
      const data = JSON.stringify(obj);
      const formData = new FormData();
      formData.append("file", file as Blob);
      formData.append("data", data);

      await updateAdmin({ formData, id }).unwrap();
      toast.success("Admin Updated Successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const defaultValues = {
    name: data?.name,
    email: data?.email,
    dateOfBirth: data?.dateOfBirth,
    contactNo: data?.contactNo,
    presentAddress: data?.presentAddress,
    permanentAddress: data?.permanentAddress,
    occupation: data?.occupation,
    bloodGroup: data?.bloodGroup,
    gender: data?.gender,
    avatarUrl: data?.avatarUrl,
  };

  return (
    <section className="p-5">
      <BreadCrumb items={items} />
      <h1 className="my-5 text-2xl font-semibold">Update Admin Information</h1>
      {!isLoading && !isError && data?.id && (
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <FormImageUpload name="avatarUrl" required={true} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 [&_input]:text-white [&_select]:text-white">
            <FormInput
              name="name"
              required={true}
              label="Name"
              placeholder="Enter Your Name..."
            />
            <FormInput
              name="email"
              required={true}
              label="Email"
              placeholder="Enter Your Email..."
              readonly={true}
            />
            <FormSelect
              name="gender"
              label="Your Gender"
              placeholder="Select Your Gender"
              required
              options={genderOptions}
            />
            <FormInput
              name="contactNo"
              required={true}
              label="Contact No."
              placeholder="Enter Your Contact No..."
            />
            <FormInput
              name="presentAddress"
              required={true}
              label="Your Present Address"
              placeholder="Enter Your Present Address..."
            />
            <FormInput
              name="permanentAddress"
              label="Your Permanent Address"
              placeholder="Enter Your Permanent Address..."
            />
            <FormInput
              name="occupation"
              label="Your Occupation"
              placeholder="Enter Your Occupation..."
            />
            <FormSelect
              name="bloodGroup"
              label="Your Blood Group"
              placeholder="Select Your Blood Group"
              options={bloodGroupOptions}
            />
            <FormDatePicker
              name="dateOfBirth"
              required={true}
              label="Date Of Birth"
              placeholder="Enter Your Date Of Birth..."
            />
          </div>
          <Button type="submit" className="w-24">
            Save
          </Button>
        </Form>
      )}
    </section>
  );
};

export default EditAdminPage;
