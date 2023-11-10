import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { envConfig } from "./helpers/config/envConfig";

// const rolesRedirect: Record<string, unknown> = {
//   buyer: `${envConfig.siteUrl}/`,
//   seller: `${envConfig.siteUrl}/dashboard`,
//   admin: `${envConfig.siteUrl}/dashboard`,
// };

const excludePathsForBuyerAndSeller: string[] = [
  "/dashboard/manage-buyers",
  "/dashboard/manage-sellers",
  "/dashboard/manage-admins",
  "/dashboard/manage-reviews",
  "/dashboard/categories",
];

const excludePathsForAdminBuyerAndSeller = ["/dashboard/manage-admins"];

const excludePathsForBuyer: string[] = [
  "/dashboard/manage-orders",
  "/dashboard/manage-tasks",
];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
  });

  const role = token?.role as string;

  const isSeller = role === "seller";
  const isBuyer = role === "buyer";
  const isSuperAdmin = role === "super_admin";

  if (!isSuperAdmin && excludePathsForAdminBuyerAndSeller.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (isBuyer && excludePathsForBuyer.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (
    (isSeller || isBuyer) &&
    excludePathsForBuyerAndSeller.includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (!token && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  } else if (token && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/dashboard/:page*", "/service:page*"],
};

// if (
//   (role === "admin" && pathname.startsWith("/admin")) ||
//   (role === "seller" && pathname.startsWith("/seller"))
// ) {
//   return NextResponse.next();
// }

// if (pathname === "/" && role && role in rolesRedirect) {
//   return NextResponse.redirect(rolesRedirect[role] as string);
// }
