"use server";

const { DateTime } = require("luxon");
const { MongoClient, ServerApiVersion } = require("mongodb");

const id = process.env.NEXT_PUBLIC_MONGO_DB_ID;
const key = process.env.NEXT_PUBLIC_MONGO_DB_KEY;
const uri = `mongodb+srv://${id}:${key}@lagless.qiykr3r.mongodb.net/?retryWrites=true&w=majority`;

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

    // await collection.deleteMany({ email: "test@gmail.com" });
  } finally {
    await closeMongoDB();
  }
}

export async function findAllByDate({ date }) {
  try {
    await connectToMongoDB();

    const db = client.db("mailingService");
    const collection = db.collection("mailListWithCode");

    const yesterday = DateTime.fromISO(date).startOf("day");

    console.log("day", yesterday.toISO());
    console.log("yester", yesterday.minus({ days: 1 }).toISO());

    const result = await collection
      .find({
        departureDate: {
          $lt: yesterday.toISO(), // 어제보다 이전
          $gte: yesterday.minus({ days: 1 }).toISO(), // 오늘 00:00 이후
        },
        state: "todo",
      })
      .toArray();

    console.log("get mongo db list", result);
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
