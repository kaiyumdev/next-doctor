import { connectDB } from "@/lib/connectDB";
export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const bookingsCollection = db.collection("bookings");
  try {
    const resp = await bookingsCollection.deleteOne({
      _id: new ObjectId(params.id),
    });
    return Response.json({
      message: "deleted the booking",
      response: resp,
    });
  } catch (error) {
    return Response.json({ message: "Something Went Wrong" });
  }
};
