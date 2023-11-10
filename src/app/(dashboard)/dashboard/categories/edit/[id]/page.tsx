"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import FormInput from "@/components/ui/FormInput";
import {
  useCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/features/categories/categoriesApi";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Metadata } from "next/types";


type IEditAdminPageProps = {
  params: any;
};

const EditAdminPage = ({ params }: IEditAdminPageProps) => {
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
  const id: string = params.id;

  const { data, isLoading, isError } = useCategoryQuery(id);
  const [updateCategory] = useUpdateCategoryMutation();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <div>Something went wrong happend</div>;
  }

  const onSubmit = async (values: any, id: string) => {
    try {
      await updateCategory({ id, data: { ...values } }).unwrap();
      toast.success("Category Updated Successfully");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const defaultValues = {
    name: data?.name,
  };

  return (
    <section className="p-5">
      <BreadCrumb items={items} />
      <h1 className="my-5 text-2xl font-semibold">Edit Category</h1>
      {!isLoading && !isError && data?.id && (
        <Form
          submitHandler={(data) => onSubmit(data, id)}
          defaultValues={defaultValues}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 [&_input]:text-white [&_select]:text-white">
            <FormInput
              name="name"
              label="Name"
              placeholder="Enter Category Name"
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
