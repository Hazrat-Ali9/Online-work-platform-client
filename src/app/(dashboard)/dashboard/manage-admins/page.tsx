"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import { useAdminsQuery } from "@/redux/features/admin/adminApi";
import { useDeleteUserMutation } from "@/redux/features/auth/authApi";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Metadata } from "next/types";


const ManageAdminsPage = () => {
  const { data: session } = useSession();
  const items = [
    {
      name: "Dashboard",
      slug: `/dashboard`,
    },
  ];

  const [deleteUser] = useDeleteUserMutation();
  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id).unwrap();
      toast.success("Buyer deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const { data, isLoading, isError } = useAdminsQuery(undefined);
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
    content = data?.data?.map((admin, index) => (
      <tr key={admin?.id}>
        <th>
          <label>{index + 1}</label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                {admin?.avatarUrl && (
                  <Image
                    height={56}
                    width={56}
                    src={admin?.avatarUrl}
                    alt={admin?.name}
                  />
                )}
              </div>
            </div>
            <div>
              <div className="font-bold">{admin?.name}</div>
              <div className="text-sm opacity-50">{admin?.presentAddress}</div>
            </div>
          </div>
        </td>
        <td>
          {admin?.email}
          <br />
          {admin?.occupation && (
            <span className="badge badge-ghost badge-sm">
              {admin?.occupation}
            </span>
          )}
        </td>
        <td>{format(new Date(admin?.dateOfBirth), "dd/MM/yyyy")}</td>
        <td>{admin?.contactNo}</td>
        <td>{admin?.bloodGroup}</td>
        <td>{admin?.gender}</td>
        <th>
          <Link
            href={`/dashboard/manage-admins/edit/${admin?.id}`}
            className="btn btn-primary btn-xs mr-2"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(admin?.userId)}
            className="btn btn-secondary btn-xs"
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
      <Link
        href={"/dashboard/manage-admins/add"}
        className="btn btn-primary max-w-[200px]"
      >
        Add New Admin
      </Link>
      <h1 className="my-5 text-2xl font-semibold">Admins Information</h1>
      <div className="overflow-x-auto">
        <table className="table text-black">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Name & Location</th>
              <th>Email & Occupation</th>
              <th>Date Of Birth</th>
              <th>Contact No</th>
              <th>Blood Group</th>
              <th>Gender</th>
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
