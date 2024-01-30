import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

const { email_service, user, pass } = process.env;

export async function GET() {
  const transporter = nodemailer.createTransport({
    port: 587,
    service: email_service,
    secure: false,
    auth: {
      user: user,
      pass: pass,
    },
  });

  const mailOptions = {
    from: user,
    to: "yee0230@gmail.com",
    subject: "Nodemailer Test",
    text: "노드 패키지 nodemailer를 이용해 보낸 이메일임",
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email Sent : ", info);
    }
  });

  return NextResponse.json({ ok: true, test: "test", content: "contnet" });
}
