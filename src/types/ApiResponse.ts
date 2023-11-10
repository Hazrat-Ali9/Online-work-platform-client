import { Gender } from ".";

export type User = {
  id: string;
  email: string;
  role: string;
  password?: string;
  needsPasswordChange: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Admin = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  dateOfBirth: Date;
  gender: Gender;
  contactNo: string;
  presentAddress: string;
  permanentAddress: string;
  occupation: string;
  bloodGroup: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type Seller = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  dateOfBirth: Date;
  gender: Gender;
  contactNo: string;
  presentAddress: string;
  permanentAddress: string;
  occupation: string;
  bloodGroup: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type Buyer = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  dateOfBirth: Date;
  gender: Gender;
  contactNo: string;
  presentAddress: string;
  permanentAddress: string;
  occupation: string;
  bloodGroup: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type TaskReview = {
  id: string;
  rating: string;
  comment: string;
  buyerId: string;
  createdAt: Date;
  updatedAt: Date;
  taskId: string;
};

export type Task = {
  id: string;
  imageUrl: string;
  title: string;
  sellerId: string;
  price: string;
  description: string;
  categoryId: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  taskReviews?: TaskReview[];
};

export type Category = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Order = {
  id: string;
  buyerId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  buyer?: Buyer;
};

export type OrderItem = {
  id: string;
  orderId: string;
  taskId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  sellerId: string | null;
};

export type Testimonial = {
  id: string;
  status: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  // user?: User;
};

export type ILoginUserResponse = {
  accessToken?: string;
  refreshToken?: string;
  needsPasswordChange?: boolean;
};
