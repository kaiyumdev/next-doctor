import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="relative h-72">
        <Image
          className="absolute h-72 w-full left-0 top-0 object-cover"
          src={""}
          alt="service"
          width={1920}
          height={1080}
          style={{ width: "90vw" }}
        />
        <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] ">
          <h1 className="text-white text-3xl font-bold flex justify-center items-center ml-8">
            Details of
          </h1>
        </div>
      </div>
    </div>
  );
};

export default page;

// import { connectDB } from "@/lib/connectDB";

// export const POST = async (request) => {
//   const booking = await request.json();
//   const db = await connectDB();
//   const bookingsCollection = db.collection("bookings");
//   try {
//     const newBooking = await bookingsCollection.insertOne(booking);
//     return Response.json({ message: "service booked successfully" });
//   } catch (error) {
//     console.log(error);
//   }
// };
