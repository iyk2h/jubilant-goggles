const { findAllByDate } = require("../mailing/repository/mailingRepository");
const { DateTime } = require("luxon");
import { NextResponse } from "next/server";

async function runSchedule() {
  try {
    console.log("test start");
    let date = DateTime.fromISO("2024-01-18T22:35:00.000Z");
    for (let i = 0; i < 10; i++) {
      console.log("The answer to life, the universe, and everything!");
      await findAllByDate({ date: date.toISO() });
      date = date.plus({ days: 1 });
    }
    console.log("test end ");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function GET() {
  await runSchedule();
  return NextResponse.json({ ok: true, test: "test", content: "contnet" });
}
