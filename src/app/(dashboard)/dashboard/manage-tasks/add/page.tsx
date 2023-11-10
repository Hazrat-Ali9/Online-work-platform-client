"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import FormImageUpload from "@/components/ui/FormImageUpload";
import FormInput from "@/components/ui/FormInput";
import FormSelect, { SelectOptions } from "@/components/ui/FormSelect";
import { useCategoriesQuery } from "@/redux/features/categories/categoriesApi";
import { useProfileQuery } from "@/redux/features/profile/profileApi";
import { useCreateTaskMutation } from "@/redux/features/tasks/tasksApi";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { Metadata } from "next/types";


const CreateAdminPage = () => {
  const { data: session } = useSession();
  const role = (session as any)?.role;
  const items = [
    {
      name: "Dashboard",
      slug: `/dashboard`,
    },
    {
      name: "Manage Tasks",
      slug: `/dashboard/manage-tasks`,
    },
  ];

  const [createTask] = useCreateTaskMutation();
  const { data: profile } = useProfileQuery(undefined);
  const {
    data: categories,
    isLoading,
    isError,
  } = useCategoriesQuery(undefined);

  let categoryOptions: SelectOptions[] = [];
  if (isLoading) {
    categoryOptions = [{ label: "Loading...", value: "loading" }];
  }
  if (!isLoading && isError) {
    categoryOptions = [{ label: "Error", value: "error" }];
  }
  categoryOptions = categories?.data?.map((category) => ({
    label: category.name,
    value: category.id,
  })) as SelectOptions[];

  const handleSubmit = async (values: any) => {
    try {
      values.sellerId = profile.id;
      const obj = { ...values };
      const file = obj["imageUrl"];

      delete obj["imageUrl"];
      const data = JSON.stringify(obj);
      const formData = new FormData();
      formData.append("file", file as Blob);
      formData.append("data", data);

      await createTask(formData);
      toast.success("Task created Successfully");
    } catch (error) {
      toast.error("Failed to Register");
    }
  };

  return (
    <section className="p-5">
      <BreadCrumb items={items} />
      <h1 className="my-5 text-2xl font-semibold">Create New Task</h1>
      <Form submitHandler={handleSubmit}>
        <FormImageUpload name="imageUrl" className="w-full h-60 rounded-sm" />
        <FormInput
          name="title"
          required={true}
          label="Title"
          placeholder="Enter Task Title"
          className="text-white max-w-full"
        />
        <FormSelect
          options={categoryOptions?.length > 0 ? categoryOptions : []}
          name="categoryId"
          label="Category"
          required={true}
          className="text-white max-w-full"
        />
        <FormInput
          name="description"
          required={true}
          label="Description"
          placeholder="Enter your task description here"
          className="text-white max-w-full"
        />
        <FormInput
          name="address"
          required={true}
          label="Address"
          placeholder="Enter Your Address Here"
          className="text-white max-w-full"
        />
        <FormInput
          name="price"
          required={true}
          label="Price"
          placeholder="Enter your price here"
          className="text-white max-w-full"
        />
        <Button type="submit" className="max-w-[200px]">
          Create Task
        </Button>
      </Form>
    </section>
  );
};

export default CreateAdminPage;
