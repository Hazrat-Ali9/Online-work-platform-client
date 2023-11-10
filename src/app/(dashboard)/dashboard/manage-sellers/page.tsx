"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import { useDeleteUserMutation } from "@/redux/features/auth/authApi";
import { useSellersQuery } from "@/redux/features/seller/sellerApi";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import { Metadata } from "next/types";


const ManageSellersPage = () => {
  const { data: session } = useSession();
  const role = (session as any)?.role;
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
      toast.success("Seller deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const { data, isLoading, isError } = useSellersQuery(undefined);
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
    content = data?.data?.map((seller, index) => (
      <tr key={seller?.id}>
        <th>
          <label>{index + 1}</label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                {seller?.avatarUrl && (
                  <Image
                    height={56}
                    width={56}
                    src={seller?.avatarUrl}
                    alt={seller?.name}
                  />
                )}
              </div>
            </div>
            <div>
              <div className="font-bold">{seller?.name}</div>
              <div className="text-sm opacity-50">{seller?.presentAddress}</div>
            </div>
          </div>
        </td>
        <td>
          {seller?.email}
          <br />
          {seller?.occupation && (
            <span className="badge badge-ghost badge-sm">
              {seller?.occupation}
            </span>
          )}
        </td>
        <td>{format(new Date(seller?.dateOfBirth), "dd/MM/yyyy")}</td>
        <td>{seller?.contactNo}</td>
        <td>{seller?.bloodGroup}</td>
        <td>{seller?.gender}</td>
        <th>
          <Link
            href={`/dashboard/manage-sellers/edit/${seller?.id}`}
            className="btn btn-primary btn-xs mr-2"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(seller?.userId)}
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
      <h1 className="my-5 text-2xl font-semibold">Sellers Information</h1>
      <div className="overflow-x-auto">
        <table className="table text-black">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
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

export default ManageSellersPage;
