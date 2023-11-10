"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import FormImageUpload from "@/components/ui/FormImageUpload";
import FormInput from "@/components/ui/FormInput";
import FormSelect, { SelectOptions } from "@/components/ui/FormSelect";
import { useCategoriesQuery } from "@/redux/features/categories/categoriesApi";
import {
  useTaskQuery,
  useTaskUpdateMutation,
} from "@/redux/features/tasks/tasksApi";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { Metadata } from "next/types";


type IEditSellerPageProps = {
  params: any;
};

const EditTaskPage = ({ params }: IEditSellerPageProps) => {
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
  const id: string = params.id;

  const { data, isLoading, isError } = useTaskQuery(id);
  const [updateTask] = useTaskUpdateMutation();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <div>Something went wrong happend</div>;
  }
  if (!isLoading && !isError && data) {
    content = <div>{JSON.stringify(data)}</div>;
  }

  const {
    data: categories,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useCategoriesQuery(undefined);

  let categoryOptions: SelectOptions[] = [];
  if (isCategoryLoading) {
    categoryOptions = [{ label: "Loading...", value: "loading" }];
  }
  if (!isCategoryLoading && isCategoryError) {
    categoryOptions = [{ label: "Error", value: "error" }];
  }
  categoryOptions = categories?.data?.map((category) => ({
    label: category.name,
    value: category.id,
  })) as SelectOptions[];

  const onSubmit = async (values: any) => {
    try {
      const obj = { ...values };
      const file = obj["imageUrl"];

      delete obj["imageUrl"];
      const data = JSON.stringify(obj);
      const formData = new FormData();
      formData.append("file", file as Blob);
      formData.append("data", data);

      await updateTask({ formData, id }).unwrap();
      toast.success("Task Updated Successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const defaultValues = {
    title: data?.title,
    description: data?.description,
    categoryId: data?.categoryId,
    address: data?.address,
    price: data?.price,
    imageUrl: data?.imageUrl,
  };

  return (
    <section className="p-5">
      <BreadCrumb items={items} />
      <h1 className="my-5 text-2xl font-semibold">Update Task Information</h1>
      {!isLoading && !isError && data?.id && (
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <FormImageUpload
            name="imageUrl"
            className="w-full h-60 rounded-sm"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 [&_input]:text-white [&_select]:text-white">
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
          </div>
          <Button type="submit" className="w-24">
            Save
          </Button>
        </Form>
      )}
    </section>
  );
};

export default EditTaskPage;
