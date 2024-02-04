const { findAllByDate } = require("../../mongoDB/repository");
import { NextResponse } from "next/server";
import { sendEmail } from "../../mailing/mailingService";
import { nowDate } from "@/app/utils/DateUtils";

async function runSchedule() {
  const curDate = nowDate();
  const list = await findAllByDate(curDate);

  for (const item of list) {
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
