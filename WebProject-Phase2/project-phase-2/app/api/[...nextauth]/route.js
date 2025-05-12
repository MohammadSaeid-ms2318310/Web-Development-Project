import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
const handler = NextAuth({
    providers: [
    GithubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    }),
]});
// After configuring the next-auth handler, export it as
// GET and POST handlers for the /api/auth/[...nextauth] route
export { handler as GET, handler as POST };