"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import FormSelect from "@/components/ui/FormSelect";
import { statusOptions } from "@/constants/globals";
import {
  useTestmonialsQuery,
  useUpdateTestimonialMutation,
} from "@/redux/features/testimonial/testimonialApi";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Metadata } from "next/types";

const ManageReviews = () => {
  const { data: session } = useSession();
  const role = (session as any)?.role;
  const items = [
    {
      name: "Dashboard",
      slug: `/dashboard`,
    },
  ];

  const [updateTestimonial] = useUpdateTestimonialMutation();
  const handleSubmit = async (data: any) => {
    try {
      await updateTestimonial(data);
      toast.success("Testimonial updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const { data, isLoading, isError } = useTestmonialsQuery(undefined);
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

  if (!isLoading && !isError && data && data?.data.length === 0) {
    content = (
      <tr>
        <td>No testimonial found</td>
      </tr>
    );
  }

  if (!isLoading && !isError && data && data?.data.length > 0) {
    content = data?.data?.map((testimonial, index) => {
      const { description, status, createdAt, id } = testimonial;
      const user = (testimonial as any)?.user;
      const defaultValues = {
        status,
      };

      if (user) {
        let userObj: Record<string, any> = {};
        let userKeys: String = "";
        Object?.keys(user).forEach((key) => {
          if (user && user[key] !== null && user[key] !== undefined) {
            userObj = user[key];
            userKeys = key;
          }
        });

        return (
          <tr key={id}>
            <th>
              <label>{index + 1}</label>
            </th>
            <td>
              <div className="flex items-center space-x-3">
                {userObj?.avatarUrl && (
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      {userObj?.avatarUrl && (
                        <Image
                          height={56}
                          width={56}
                          src={userObj?.avatarUrl}
                          alt={userObj?.name}
                        />
                      )}
                    </div>
                  </div>
                )}
                <div>
                  <div className="font-bold">{userObj?.name}</div>
                  <div className="text-sm opacity-50">
                    {userObj?.presentAddress}
                  </div>
                </div>
              </div>
            </td>
            <td>{format(new Date(createdAt), "dd/MM/yyyy")}</td>
            <td>{description}</td>
            <td className="w-[15%]">
              <Form
                defaultValues={defaultValues}
                submitHandler={(data) => handleSubmit({ ...data, id })}
              >
                <FormSelect
                  name="status"
                  className="bg-primary text-white max-w-xl"
                  options={statusOptions}
                />
                <Button type="submit" className="btn btn-primary btn-xs mt-0">
                  Update
                </Button>
              </Form>
            </td>
            <th>
              {/* <Link
              href={`/dashboard/manage-testimonials/edit/${testimonial?.id}`}
              className="btn btn-primary btn-xs mr-2"
            >
              Edit
            </Link> */}
              <button className="btn btn-secondary btn-xs">Delete</button>
            </th>
          </tr>
        );
      }
    });
  }

  return (
    <section className="p-5">
      <BreadCrumb items={items} />
      <h1 className="my-5 text-2xl font-semibold">Users Feedback</h1>
      <div className="overflow-x-auto">
        <table className="table text-black">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageReviews;
