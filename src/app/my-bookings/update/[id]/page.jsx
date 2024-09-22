// /* eslint-disable react-hooks/rules-of-hooks */
// "use client";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const page = ({ params }) => {
//   const { data } = useSession();
//   const [booking, setBooking] = useState([]);

//   const loadBooking = async () => {
//     const bookingDetail = await fetch(
//       `https://next-doctor-zcd4.vercel.app/my-bookings/api/booking/${params.id}`
//     );
//     const data = await bookingDetail.json();
//     setBooking(data.data);
//   };
//   const handleUpdateBooking = async (event) => {
//     event.preventDefault();
//     const updatedBooking = {
//       date: event.target.date.value,
//       phone: event.target.phone.value,
//       address: event.target.address.value,
//     };
//     const resp = await fetch(
//       `https://next-doctor-zcd4.vercel.app/my-bookings/api/booking/${params.id}`,
//       {
//         method: "PATCH",
//         body: JSON.stringify(updatedBooking),
//         headers: {
//           "content-type": "application/json",
//         },
//       }
//     );
//     if (resp.status === 200) {
//       toast.success("Updated Successfully");
//     }
//   };
//   useEffect(() => {
//     loadBooking();
//   }, [loadBooking]); // Add loadBooking to the dependency array

//   return (
//     <div className="container mx-auto">
//       <div className="relative  h-72">
//         <Image
//           className="absolute h-72 w-full left-0 top-0 object-cover"
//           src={""}
//           alt="service"
//           width={1920}
//           height={1080}
//           style={{ width: "90vw" }}
//         />
//         <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] ">
//           <h1 className="text-white text-3xl font-bold flex justify-center items-center ml-8">
//             Update Booking
//           </h1>
//         </div>
//       </div>
//       <div className="my-12 bg-slate-300 p-12">
//         <form onSubmit={handleUpdateBooking}>
// <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//   <div className="form-control">
//     <label className="label">
//       <span className="label-text">Name</span>
//     </label>
//     <input
//       defaultValue={data?.user?.name}
//       type="text"
//       name="name"
//       className="input input-bordered"
//     />
//   </div>
//   <div className="form-control">
//     <label className="label">
//       <span className="label-text">Date</span>
//     </label>
//     <input
//       defaultValue={booking.date}
//       type="date"
//       name="date"
//       className="input input-bordered"
//     />
//   </div>
//   <div className="form-control">
//     <label className="label">
//       <span className="label-text">Email</span>
//     </label>
//     <input
//       defaultValue={data?.user?.email}
//       type="text"
//       name="email"
//       placeholder="email"
//       className="input input-bordered"
//     />
//   </div>
//   <div className="form-control">
//     <label className="label">
//       <span className="label-text">Due amount</span>
//     </label>
//     <input
//       defaultValue={booking.price}
//       readOnly
//       type="text"
//       name="price"
//       className="input input-bordered"
//     />
//   </div>
//   <div className="form-control">
//     <label className="label">
//       <span className="label-text">Phone</span>
//     </label>
//     <input
//       defaultValue={booking.phone}
//       required
//       type="text"
//       name="phone"
//       placeholder="Your Phone"
//       className="input input-bordered"
//     />
//   </div>
//   <div className="form-control">
//     <label className="label">
//       <span className="label-text">Present Address</span>
//     </label>
//     <input
//       defaultValue={booking.address}
//       type="text"
//       name="address"
//       placeholder="Your Address"
//       className="input input-bordered"
//     />
//   </div>
// </div>
// <div className="form-control mt-6">
//   <input
//     className="btn btn-primary btn-block"
//     type="submit"
//     value="Order Confirm"
//   />
// </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default page;

"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

const BookingUpdatePage = ({ params }) => {
  const { data: sessionData } = useSession();
  const [booking, setBooking] = useState({});

  const loadBooking = useCallback(async () => {
    try {
      const response = await fetch(
        `https://next-doctor-zcd4.vercel.app/my-bookings/api/booking/${params.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch booking");
      }
      const data = await response.json();
      setBooking(data.data);
    } catch (error) {
      console.error("Error loading booking:", error);
      toast.error("Failed to load booking details");
    }
  }, [params.id]);

  const handleUpdateBooking = async (event) => {
    event.preventDefault();
    const updatedBooking = {
      date: event.target.date.value,
      phone: event.target.phone.value,
      address: event.target.address.value,
    };

    try {
      const resp = await fetch(
        `https://next-doctor-zcd4.vercel.app/my-bookings/api/booking/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedBooking),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (resp.ok) {
        toast.success("Updated Successfully");
        loadBooking(); // Reload the booking data after successful update
      } else {
        const errorData = await resp.json();
        toast.error(errorData.message || "Failed to update booking");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("An error occurred while updating the booking");
    }
  };

  useEffect(() => {
    loadBooking();
  }, [loadBooking]);

  return (
    <div className="container mx-auto">
      <div className="relative h-72">
        <Image
          className="absolute h-72 w-full left-0 top-0 object-cover"
          src={booking.img || "/placeholder-image.jpg"} // Use a placeholder image if booking.img is not available
          alt="service"
          width={1920}
          height={1080}
          style={{ width: "90vw" }}
        />
        <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] ">
          <h1 className="text-white text-3xl font-bold flex justify-center items-center ml-8">
            Update Booking
          </h1>
        </div>
      </div>
      <div className="my-12 bg-slate-300 p-12">
        <form onSubmit={handleUpdateBooking}>
          {/* Form fields remain the same */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                defaultValue={data?.user?.name}
                type="text"
                name="name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                defaultValue={booking.date}
                type="date"
                name="date"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                defaultValue={data?.user?.email}
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Due amount</span>
              </label>
              <input
                defaultValue={booking.price}
                readOnly
                type="text"
                name="price"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                defaultValue={booking.phone}
                required
                type="text"
                name="phone"
                placeholder="Your Phone"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Present Address</span>
              </label>
              <input
                defaultValue={booking.address}
                type="text"
                name="address"
                placeholder="Your Address"
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="form-control mt-6">
            <input
              className="btn btn-primary btn-block"
              type="submit"
              value="Order Confirm"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingUpdatePage;
