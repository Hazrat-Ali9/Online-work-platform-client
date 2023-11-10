"use client";

import BreadCrumb from "@/components/ui/BreadCrumb";
import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import FormTextArea from "@/components/ui/FormTextArea";
import { useCreateTestimonialMutation } from "@/redux/features/testimonial/testimonialApi";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";


const AddFeedBack = () => {
  const { data: session } = useSession();
  const role = (session as any)?.role;
  const items = [
    {
      name: "Dashboard",
      slug: `/dashboard`,
    },
  ];

  const [addFeedback] = useCreateTestimonialMutation();

  const handleSubmit = async (data: any) => {
    try {
      const result = await addFeedback({
        description: data.description,
        userId: (session as any)?.userId,
      }).unwrap();
      toast.success("Feedback added successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="p-5">
      <BreadCrumb items={items} />
      <h1 className="my-5 text-2xl font-semibold">Add a Feedback</h1>
      <Form submitHandler={handleSubmit}>
        <FormTextArea
          className="max-w-md h-40 text-white"
          name="description"
          label="Feedback"
          placeholder="Enter your feedback"
          required
        />
        <Button type="submit" className="mt-3 max-w-[200px]">
          Add Feedback
        </Button>
      </Form>
    </section>
  );
};

export default AddFeedBack;
