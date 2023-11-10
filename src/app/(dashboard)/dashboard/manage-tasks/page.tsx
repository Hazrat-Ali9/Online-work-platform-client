"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import { useDeleteUserMutation } from "@/redux/features/auth/authApi";
import {
  useTaskDeleteMutation,
  useTasksQuery,
} from "@/redux/features/tasks/tasksApi";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Metadata } from "next/types";


const ManageTasksPage = () => {
  const { data: session } = useSession();
  const role = (session as any)?.role;
  const items = [
    {
      name: "Dashboard",
      slug: `/dashboard`,
    },
  ];

  const [taskDelete] = useTaskDeleteMutation();
  const handleDelete = async (id: string) => {
    try {
      await taskDelete(id).unwrap();
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const query = "";
  const { data, isLoading, isError } = useTasksQuery(query);
  // decide what to render
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
    content = data?.data?.map((task, index) => (
      <tr key={task?.id}>
        <th>
          <label>{index + 1}</label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                {task?.imageUrl && (
                  <Image
                    height={56}
                    width={56}
                    src={task?.imageUrl}
                    alt={task?.title}
                  />
                )}
              </div>
            </div>
          </div>
        </td>
        <td>{task?.title}</td>
        <td>{task?.description}</td>
        <td>{format(new Date(task?.createdAt), "dd/MM/yyyy")}</td>
        <td>{task?.price}</td>
        <td>{task?.address}</td>
        <th>
          <Link
            href={`/dashboard/manage-tasks/edit/${task?.id}`}
            className="btn btn-primary btn-xs mr-2 mb-2"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(task?.id)}
            className="btn btn-secondary btn-xs mb-2"
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
      <h1 className="my-5 text-2xl font-semibold">Tasks Information</h1>
      <Link
        href={`/dashboard/manage-tasks/add`}
        className="btn btn-primary my-3"
      >
        Create Task
      </Link>
      <div className="overflow-x-auto">
        <table className="table text-black">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Price</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageTasksPage;
