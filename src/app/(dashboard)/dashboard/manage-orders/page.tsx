"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import {
  useOrdersQuery,
  useRemoveOrderMutation,
  useUpdateOrderMutation,
} from "@/redux/features/order/orderApi";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Metadata } from "next/types";


const ManageOrdersPage = () => {
  const { data: session } = useSession();
  const role = (session as any)?.role;
  const items = [
    {
      name: "Dashboard",
      slug: `/dashboard`,
    },
  ];

  const { data, isLoading, isError } = useOrdersQuery(undefined);
  const [updateOrder] = useUpdateOrderMutation();
  const [removeOrder] = useRemoveOrderMutation();
  // decide what to render
  const handleUpdateOrder = async (status: any, id: string) => {
    const data = {
      status,
      id,
    };
    try {
      await updateOrder(data).unwrap();
      toast.success("Order updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleRemoveOrder = async (id: string) => {
    try {
      await removeOrder(id).unwrap();
      toast.success("Order removed successfully");
    } catch (error) {
      toast.error("Something went wrong");
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
  if (!isLoading && !isError && data && data?.length > 0) {
    content = data?.map((order, index) => (
      <tr key={order?.id}>
        <th>
          <label>{index + 1}</label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            {order?.buyer?.avatarUrl && (
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  {order?.buyer?.avatarUrl && (
                    <Image
                      height={56}
                      width={56}
                      src={order?.buyer?.avatarUrl}
                      alt={order?.buyer?.name}
                    />
                  )}
                </div>
              </div>
            )}
            <div>
              <div className="font-bold">{order?.buyer?.name}</div>
              <div className="text-sm opacity-50">
                {order?.buyer?.presentAddress}
              </div>
            </div>
          </div>
        </td>
        <td>{order?.id}</td>
        <td>{format(new Date(order?.createdAt), "dd/MM/yyyy")}</td>
        <td>{order?.status}</td>
        <th className="flex flex-col gap-y-2">
          <button
            className="btn btn-primary btn-xs mb-2 lg:mb-0"
            onClick={() => handleUpdateOrder("completed", order.id)}
          >
            Order Completed
          </button>
          <button
            onClick={() => handleUpdateOrder("cancel", order.id)}
            className="btn btn-secondary btn-xs"
          >
            Cancel Order
          </button>
          <button
            onClick={() => handleRemoveOrder(order.id)}
            className="btn btn-secondary btn-xs"
          >
            Remove Order
          </button>
        </th>
      </tr>
    ));
  }

  return (
    <section className="p-5">
      <BreadCrumb items={items} />
      <h1 className="my-5 text-2xl font-semibold">
        Manage Orders ({data?.length})
      </h1>
      <div className="overflow-x-auto">
        <table className="table text-black">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Name, Addres & Image</th>
              <th>Order Id</th>
              <th>Order Date</th>
              <th>Order Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageOrdersPage;
