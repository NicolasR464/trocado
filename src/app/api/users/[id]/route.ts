import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("PUT API 🔥");

  const userId = params.id;
  const formData = await req.formData();
  const address = formData.get("address") as string;
  console.log(address);

  // PUT PRISMA
  try {
    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        address,
      },
    });
    // console.log(updateUser);
    return NextResponse.json({ message: "RESPONSE PUT" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "PRISMA ERROR" }, { status: 500 });
  }
}
