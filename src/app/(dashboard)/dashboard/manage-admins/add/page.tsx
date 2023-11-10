"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import FormInput from "@/components/ui/FormInput";
import { useRegisterAdminMutation } from "@/redux/features/auth/authApi";
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
      name: "Manage Admins",
      slug: `/dashboard/manage-admins`,
    },
  ];

  const [register] = useRegisterAdminMutation();

  const handleSubmit = async (values: any) => {
    try {
      const data = JSON.stringify(values);

      const formData = new FormData();
      formData.append("file", "");
      formData.append("data", data);

      await register(formData);
      toast.success("Admin created Successfully");
    } catch (error) {
      toast.error("Failed to Register");
    }
  };

  return (
    <section className="p-5">
      <BreadCrumb items={items} />
      <h1 className="my-5 text-2xl font-semibold">Add New Admin</h1>
      <Form submitHandler={handleSubmit}>
        <FormInput
          name="admin.name"
          required={true}
          label="Admin Name"
          placeholder="Enter Admin Name"
          className="text-white"
        />
        <FormInput
          name="email"
          required={true}
          label="Email"
          placeholder="Enter Admin Email"
          className="text-white"
        />
        <FormInput
          name="password"
          required={true}
          label="Password"
          placeholder="Enter Admin Password"
          className="text-white"
          type="password"
        />
        <Button type="submit" className="max-w-[200px]">
          Add Admin
        </Button>
      </Form>
    </section>
  );
};

export default CreateAdminPage;
