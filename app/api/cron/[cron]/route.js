const { findAllByDate } = require("../../mongoDB/repository");
const { DateTime } = require("luxon");
import { NextResponse } from "next/server";
import { sendEmail } from "../../mailing/mailingService";

async function runSchedule() {
  let date = DateTime.fromISO("2024-01-19T22:35:00.000Z");
  const list = await findAllByDate({ date: date.toISO() });
  list.map(async (item) => {
    await sendEmail({
      email: item.email,
      msg: item.departureDate,
      code: item.state,
    });
  });
}

export async function GET() {
  await runSchedule();
  return NextResponse.json({
    status: 200,
  });
}
