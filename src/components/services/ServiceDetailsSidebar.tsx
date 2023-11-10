import React from "react";
import FormSelect from "../ui/FormSelect";
import { RemainingDays } from "@/constants/globals";
import StickyBox from "react-sticky-box";
import Form from "../ui/Form";
import { useAddOrderMutation } from "@/redux/features/order/orderApi";
import Button from "../ui/Button";
import toast from "react-hot-toast";

const ServiceDetailsSidebar = ({
  price,
  taskId,
  sellerId,
}: {
  price?: string;
  taskId?: string;
  sellerId?: string;
}) => {
  const [order] = useAddOrderMutation();

  const orderItem = [
    {
      taskId,
      sellerId,
      quantity: 1,
      price,
    },
  ];
  
  const handleSubmit = async (data: any) => {
    try {
      await order({ orderItem }).unwrap();
      toast.success("Order has been placed successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <StickyBox
      offsetTop={20}
      offsetBottom={20}
      className="md:basis-[40%] w-full"
    >
      <Form
        submitHandler={handleSubmit}
        className="bg-neutral p-5 w-full md:basis-1/2 text-white rounded-md"
      >
        <h2 className="text-3xl font-normal mb-5">
          {price} $ / {RemainingDays[0].label}
        </h2>
        {/* <FormSelect
              name="type"
              label="Type of service"
              options={content as any}
              className="max-w-full"
              required={true}
            /> */}
        <FormSelect
          name="time"
          label="Time of service"
          options={RemainingDays as any}
          className="max-w-full"
          required={true}
        />
        <Button className="mt-10">Proceed To Order</Button>
      </Form>
    </StickyBox>
  );
};

export default ServiceDetailsSidebar;
