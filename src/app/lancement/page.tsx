import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import type { Session } from "next-auth";
import { redirect } from "next/navigation";
import UserForm from "@/components/UserForm";
import Link from "next/link";

interface Session {
  user: {
    name: string;
    email: string;
    image: string;
    isNewUser: boolean;
    role: string | undefined;
    address: string | undefined;
    userId: string | undefined;
  };
}

export default async function lancement() {
  const session: Session | null = await getServerSession(authOptions);
  console.log("ON BOARDING PAGE 🔥");

  console.log(session);

  //   if (session?.user?.isNewUser === false) redirect("/");
  return (
    <div className="w-screen flex flex-col items-center justify-center  p-5">
      <h1 className="text-2xl">
        Bienvenue sur Trocado
        {session?.user?.name && ", " + session?.user.name.split(" ")[0]} !{" "}
      </h1>

      <UserForm userId={session?.user?.userId} />
      <Link className="link underline" href="/">
        plus tard
      </Link>
    </div>
  );
}
