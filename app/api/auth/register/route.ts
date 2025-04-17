// pages/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { RegisterRequestBody } from "@/types/user.type";
import { registerController } from "@/src/interfaces/controllers/auth/registerController";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterRequestBody;
    console.log(body);
    const { email, password, name } = body;

    const controller = await registerController({ email, password, name });

    const result = { user: controller.user, token: controller.token };
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        data: result,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.statusCode | 500 }
    );
  }
}
