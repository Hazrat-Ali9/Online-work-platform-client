"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import React from "react";
import { useSession } from "next-auth/react";
import Form from "@/components/ui/Form";
import FormInput from "@/components/ui/FormInput";
import { useAddCategoryMutation } from "@/redux/features/categories/categoriesApi";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import { Metadata } from "next/types";

const AddCategory = () => {
  const { data: session } = useSession();
  const role = (session as any)?.role;
  const items = [
    {
      name: "Dashboard",
      slug: `/dashboard`,
    },
    {
      name: "Categories",
      slug: `/dashboard/categories`,
    },
  ];

  const [addCategory] = useAddCategoryMutation();

  const handleSubmit = async (values: any) => {
    try {
      await addCategory(values).unwrap();
      toast.success("Category Added Successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="p-5">
      <BreadCrumb items={items} />
      <h1 className="my-5 text-2xl font-semibold">Add New Category</h1>
      <Form submitHandler={handleSubmit}>
        <FormInput
          name="name"
          required={true}
          label="Category Name"
          placeholder="Enter Your Category Name"
          className="text-white"
        />
        <Button type="submit" className="max-w-[200px]">
          Add Category
        </Button>
      </Form>
    </section>
  );
};

export default AddCategory;
