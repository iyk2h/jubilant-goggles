"use server";

import { createTransport } from "nodemailer";
import mustache from "mustache";
import fs from "fs/promises";

export async function sendEmail({
  email,
  code,
  locale,
  departureDate_local_format,
  destination,
}) {
  const { NEXT_PUBLIC_USER, NEXT_PUBLIC_PASS } = process.env;

  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: NEXT_PUBLIC_USER,
      pass: NEXT_PUBLIC_PASS,
    },
  });

  let subject = "";
  let htmlPath = "";

  if (locale === "ko") {
    subject = "내일 여정이 시작됩니다! LagLess와 함께하세요.";
    htmlPath = "./public/emailForm/emailTempleteKO.html";
  } else {
    subject = "Your journey begins tomorrow! Join LagLess.";
    htmlPath = "./public/emailForm/emailTempleteEN.html";
  }

  const template = await fs.readFile(`${htmlPath}`, "utf-8");

  const htmlToSend = mustache.render(template, {
    Departure_Time: departureDate_local_format,
    Destination: destination,
    code: code,
  });

  const mailData = {
    from: {
      name: `LagLess`,
      address: NEXT_PUBLIC_USER,
    },
    to: email,
    subject: subject,
    html: htmlToSend,
  };

  try {
    const info = await transporter.sendMail(mailData);
    console.log("sent: ", info);
    return info;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}
