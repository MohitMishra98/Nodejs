import { NextResponse, NextRequest } from "next/server";
import User from "@/src/models/userModel";
import { sendEmail } from "@/src/helpers/mailer";
import { connect } from "@/src/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json({
        error: "user with email not found",
        status: 400,
      });
    }

    await sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json({
      message: "reset password email send successfully",
      status: 200,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
