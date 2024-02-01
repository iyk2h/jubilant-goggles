const { findAllByDate } = require("../mongoDB/repository");
import { NextResponse } from "next/server";
import { sendEmail } from "../mailing/mailingService";
import { nowDate } from "@/app/utils/DateUtils";

async function runSchedule() {
  const date = nowDate().toISO();
  const list = await findAllByDate({ date: date });
  console.log("List length:", list.length);

  for (const item of list) {
    console.log("in list map");
    await sendEmail({
      email: item.email,
      code: item.code,
      locale: item.locale,
      departureDate_local_format: item.departureDate_local_format,
      destination: item.destination,
    });
  }
}

export async function GET() {
  await runSchedule();
  return NextResponse.json({
    status: 200,
  });
}