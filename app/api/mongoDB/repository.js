"use server";

const { DateTime } = require("luxon");
const { MongoClient, ServerApiVersion } = require("mongodb");
import { nowDate } from "@/app/utils/DateUtils";
import { sendEmail } from "../mailing/mailingService";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to MongoDB
async function connectToMongoDB() {
  await client.connect();
}

// Close the MongoDB connection
async function closeMongoDB() {
  await client.close();
}

// Save function
export async function save({ input }) {
  try {
    await connectToMongoDB();

    const db = client.db("mailingService");
    const collection = db.collection("mailListWithCode");

    const filter = {
      code: input.code,
      state: input.state,
      email: input.email,
      departureDate: input.departureDate,
    };

    const todayStart = nowDate().toUTC(0).startOf("day");
    const todayEnd = nowDate().toUTC(0).endOf("day");
    const departDate = DateTime.fromISO(input.departureDate).toUTC(0);

    if (todayStart <= departDate && todayEnd >= departDate) {
      await sendEmail({
        email: input.email,
        code: input.code,
        locale: input.locale,
        departureDate_local_format: input.departureDate_local_format,
        destination: input.destination,
      });
      filter.state = "done";
    }

    const update = {
      $setOnInsert: input, // 이 필드는 문서가 삽입될 때만 설정됩니다.
    };

    const options = {
      upsert: true, // 문서가 존재하지 않을 경우에는 삽입하게 됩니다.
    };

    const result = await collection.updateOne(filter, update, options);

    if (result.upsertedCount > 0) {
      console.log("Document inserted:", result.upsertedId._id);
    } else {
      console.log("Document already exists");
    }
  } finally {
    await closeMongoDB();
  }
}

export async function findAllByCurDate() {
  try {
    await connectToMongoDB();

    const db = client.db("mailingService");
    const collection = db.collection("mailListWithCode");

    const date = nowDate().plus({ days: 1 }).toUTC(0).startOf("day");
    const day = date.endOf("day");

    console.log(date.toISO());
    console.log(day.plus({ seconds: 0 }).toISO());

    const result = await collection
      .find({
        departureDate: {
          $gte: date.toISO(), // 내일 00:00 이후
          $lt: day.plus({ seconds: -1 }).toISO(), // 내일 23:59:59 이전
        },
        state: "todo",
      })
      .toArray();

    await collection.updateMany(
      {
        departureDate: {
          $lt: day.toISO(),
          $gte: day.minus({ days: 1 }).toISO(),
        },
        state: "todo",
      },
      { $set: { state: "done" } }
    );

    console.log(nowDate().toISO(), "get mongo db list", result);
    return result;
  } finally {
    await closeMongoDB();
  }
}
export async function deleteBy({ input }) {
  try {
    await connectToMongoDB();

    const db = client.db("mailingService");
    const collection = db.collection("mailListWithCode");

    const filter = {
      code: input.code,
      state: input.state,
      email: input.email,
      departureDate: input.departureDate,
    };

    const result = await collection.deleteMany(filter);
  } finally {
    await closeMongoDB();
  }
}
