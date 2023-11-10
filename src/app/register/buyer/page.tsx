"use client";

import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import FormInput from "@/components/ui/FormInput";
import {
  useRegisterBuyerMutation,
  useRegisterSellerMutation,
} from "@/redux/features/auth/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Metadata } from "next/types";


const RegisterPage = () => {
  const router = useRouter();

  const [register] = useRegisterBuyerMutation();

  const handleSubmit = async (values: any) => {
    try {
      const data = JSON.stringify(values);

      const formData = new FormData();
      formData.append("file", "");
      formData.append("data", data);

      await register(formData);
      toast.success("Registration Successfully Completed, Please Login");
      // router.push("/login");
    } catch (error) {
      toast.error("Failed to Register");
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">
            Register as a Buyer
          </h2>
          <p className="text-xs mt-4 text-[#002D74]">
            Please register to continue
          </p>

          <Form submitHandler={handleSubmit} className="flex flex-col gap-4">
            <FormInput
              className="p-2 rounded-xl border mt-8"
              name="buyer.name"
              placeholder="Name"
            />
            <FormInput
              className="p-2 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
            />
            <div className="relative">
              <FormInput
                className="p-2 rounded-xl border w-full"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <Button
              type="submit"
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              Register
            </Button>
          </Form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
            <Link href="/register/seller">Register as a Seller</Link>
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Already has an account?</p>
            <Link
              href={"/login"}
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
