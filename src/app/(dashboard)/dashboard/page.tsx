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
  useProfileQuery,
  useProfileUpdateMutation,
} from "@/redux/features/profile/profileApi";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Metadata } from "next/types";


const AccountProfile = () => {
  const items = [
    {
      name: "Dashboard",
      slug: `/dashboard`,
    },
  ];

  const { data, isLoading } = useProfileQuery(undefined);
  const [updateProfile] = useProfileUpdateMutation();
  const onSubmit = async (values: any) => {
    try {
      const obj = { ...values };
      const file = obj["avatarUrl"];

      delete obj["avatarUrl"];
      const data = JSON.stringify(obj);
      const formData = new FormData();
      formData.append("file", file as Blob);
      formData.append("data", data);

      await updateProfile(formData).unwrap();
      toast.success("Profile Updated Successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const defaultValues = {
    name: data?.name || "",
    email: data?.email || "",
    dateOfBirth: data?.dateOfBirth || "",
    contactNo: data?.contactNo || "",
    presentAddress: data?.presentAddress || "",
    permanentAddress: data?.permanentAddress || "",
    occupation: data?.occupation || "",
    bloodGroup: data?.bloodGroup || "",
    gender: data?.gender || "MALE",
    avatarUrl: data?.avatarUrl || "",
  };

  return (
    <section className="p-5">
      <BreadCrumb items={items} />
      <h1 className="my-5 text-2xl font-semibold">Your Profile Information</h1>
      {!isLoading && data?.id && (
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <FormImageUpload name="avatarUrl" />
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

export default AccountProfile;
