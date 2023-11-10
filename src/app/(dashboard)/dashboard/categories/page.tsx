"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import {
  useCategoriesQuery,
  useDeleteCategoryMutation,
} from "@/redux/features/categories/categoriesApi";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";


const ManageAdminsPage = () => {
  const { data: session } = useSession();
  const role = (session as any)?.role;
  const items = [
    {
      name: "Dashboard",
      slug: `/dashboard`,
    },
  ];

  const { data, isLoading, isError } = useCategoriesQuery(undefined);
  const [deleteCategory] = useDeleteCategoryMutation();
  // decide what to render

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (confirm) {
      try {
        await deleteCategory(id).unwrap();
        toast.success("Category deleted successfully");
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  let content = null;
  if (isLoading) {
    content = (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  }
  if (!isLoading && isError) {
    content = (
      <tr>
        <td>Something went wrong happend</td>
      </tr>
    );
  }
  if (!isLoading && !isError && data && data?.data.length > 0) {
    content = data?.data?.map((category, index) => (
      <tr key={category?.id}>
        <th>
          <label>{index + 1}</label>
        </th>
        <td>{category?.name}</td>
        <td>{format(new Date(category?.createdAt), "dd/MM/yyyy")}</td>
        <th>
          <Link
            href={`/dashboard/categories/edit/${category?.id}`}
            className="btn btn-primary btn-xs mr-2"
          >
            Edit
          </Link>
          <button
            className="btn btn-secondary btn-xs"
            onClick={() => handleDelete(category?.id)}
          >
            Delete
          </button>
        </th>
      </tr>
    ));
  }

  return (
    <section className="p-5">
      <BreadCrumb items={items} />
      <h1 className="my-5 text-2xl font-semibold">Categories</h1>
      <Link href={`/dashboard/categories/add`} className="btn btn-primary mb-5">
        Add Category
      </Link>
      <div className="overflow-x-auto">
        <table className="table text-black">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageAdminsPage;
