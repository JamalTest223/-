import { getMeController } from "@/src/interfaces/controllers/user/getMeController";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const userInformation = await getMeController(req, res);
    if (!userInformation)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
      console.log(userInformation,'userInformation')
    return NextResponse.json({
      success: true,
      user: userInformation,
      message: "User found successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.statusCode | 500 }
    );
  }
}
