export { default } from "next-auth/middleware";

export const config = { matcher: ["/","/events/:path*","/add-event","/edit-event/:path*"] };
