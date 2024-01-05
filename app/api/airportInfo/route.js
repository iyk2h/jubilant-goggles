import { NextResponse, NextRequest } from "next/server";
import { stopover } from "./Stopover";

const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

export async function POST(req) {
  const body = await req.json();
  const { airline, flightNumber, date } = body;

  if (airline && flightNumber && date) {
    const parseUrl = `https://www.flightview.com/flight-tracker/${airline}/${flightNumber}?date=${date}`;

    const key = `${date}_${airline}${flightNumber}`;

    try {
      // Use lowercase 'json' here
      const response = await stopover(key, parseUrl);

      // Check if response is valid
      if (response !== null && response) {
        return NextResponse.json(response);
      } else {
        return new Response(JSON.stringify({ error: "Not Found" }), {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      // 오류 발생 시 에러 응답 및 로깅
      logger.error(`API request failed: ${JSON.stringify(req.body)}`);
      logger.error(`Internal Server Error: ${error.message}`, {
        stack: error.stack,
      });

      return NextResponse.json(
        { error: "Internal Server Error" },
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }
}
