export const getBaseUrl = (): string => {
  // return process.env.BACKEND_URL || "http://localhost:5000/api/v1";
  return "https://online-work-platform-backend.vercel.app/api/v1";
};

export const envConfig = {
  siteUrl: process.env.NEXTAUTH_URL || "https://online-work-platform.vercel.app",
};
