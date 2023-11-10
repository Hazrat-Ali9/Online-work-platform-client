"use server";

import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { getBaseUrl } from "@/helpers/config/envConfig";

export const getNewAccessToken = async (token: string) => {
  const result = await axiosInstance({
    url: `${getBaseUrl()}/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    withCredentials: true,
  });
  return result;
};

export const login = async (credentials: {
  email: string | undefined;
  password: string | undefined;
}) => {
  const result = await axiosInstance({
    url: `${getBaseUrl()}/auth/login`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify({
      email: credentials?.email,
      password: credentials?.password,
    }),
    withCredentials: true,
  });
  return result;
};
