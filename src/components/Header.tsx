import { Button } from "@/components/ui/button";
import UserButtons from "@/components/AuthUserAction";
import SearchBar from "@/components/SearchBar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Header() {
  const session = await getServerSession(authOptions);
  console.log({ session });

  return (
    <div className="bg-primary flex justify-between p-4">
      <h1>logo</h1>

      <section className="flex ">
        <SearchBar />
        <UserButtons />
      </section>
    </div>
  );
}
