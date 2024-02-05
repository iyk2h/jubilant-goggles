const { findAllByDate, update } = require("../../mongoDB/repository");
import { NextResponse } from "next/server";
import { sendEmail } from "../../mailing/mailingService";
import { nowDate } from "@/app/utils/DateUtils";

async function runSchedule() {
  const curDate = nowDate();
  const list = await findAllByDate(curDate);

  for (const item of list) {
    try {
      await sendEmail({
        email: item.email,
        code: item.code,
        locale: item.locale,
        departureDate_local_format: item.departureDate_local_format,
        destination: item.destination,
      });

      // 메일 전송이 성공한 경우에만 update 함수를 실행합니다.
      await update({
        input: {
          code: item.code,
          state: item.state,
          email: item.email,
          departureDate: item.departureDate,
        },
      });
    } catch (error) {
      console.error(`Error ${curDate.toISO()} sending email:`, error);
    }
  }
}

export async function GET() {
  await runSchedule();
  return NextResponse.json({
    status: 200,
  });
}
