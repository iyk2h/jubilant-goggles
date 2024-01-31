"use server";

import { createTransport } from "nodemailer";

export async function sendEmail({ email, msg, code }) {
  const { NEXT_PUBLIC_EMAIL_SERVICE, NEXT_PUBLIC_USER, NEXT_PUBLIC_PASS } =
    process.env;

  console.log("send : ", email, msg, code);

  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: NEXT_PUBLIC_USER,
      pass: NEXT_PUBLIC_PASS,
    },
  });

  const mailData = {
    from: {
      name: `LagLess`,
      address: NEXT_PUBLIC_USER,
    },
    to: email,
    subject: `${msg} form message`,
    text: `${code} test message ${Math.random()}`,
  };

  return await transporter
    .sendMail(mailData)
    .then((info) => {
      console.log("sent: ", info);
      return info;
    })
    .catch((error) => {
      console.error("Error occurred:", error);
      throw error;
    });
}
