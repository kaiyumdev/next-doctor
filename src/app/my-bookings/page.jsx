// /* eslint-disable react-hooks/rules-of-hooks */
// "use client";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const page = () => {
//   const session = useSession();
//   console.log(session);
//   const [bookings, setBooking] = useState([]);
//   const loadData = async () => {
//     const resp = await fetch(
//       `https://next-doctor-zcd4.vercel.app/my-bookings/api/${session?.data?.user?.email}`
//     );
//     const data = await resp.json();
//     setBooking(data?.myBookings);
//   };

//   const handleDelete = async (id) => {
//     const deleted = await fetch(
//       `https://next-doctor-zcd4.vercel.app/my-bookings/api/booking/${id}`,
//       {
//         method: "DELETE",
//       }
//     );
//     const resp = await deleted.json();
//     console.log(resp);
//     if (resp?.response?.deletedCount > 0) {
//       toast.success(resp?.message);
//       loadData();
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, [loadData]); // Add loadData to the dependency array
//   return (
//     <div className="container mx-auto">
//       {/* <ToastContainer /> */}
//       <div className="relative  h-72">
//         <Image
//           className="absolute h-72 w-full left-0 top-0 object-cover"
//           src={"/assets/images/about_us/parts.jpg"}
//           alt="service"
//           width={1920}
//           height={1080}
//           style={{ width: "90vw" }}
//         />
//         <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] ">
//           <h1 className="text-white text-3xl font-bold flex justify-center items-center ml-8">
//             My Bookings
//           </h1>
//         </div>
//       </div>
//       <div className="mt-12">
//         <div className="overflow-x-auto">
//           <table className="table">
//             {/* head */}
//             <thead>
//               <tr>
//                 <th></th>
//                 <th>Service Name</th>
//                 <th>Price</th>
//                 <th>Booking Date</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* row 1 */}
//               {bookings?.map(({ serviceTitle, _id, date, price }) => (
//                 <tr key={_id}>
//                   <th>{0 + 1}</th>
//                   <td>{serviceTitle}</td>
//                   <td>{price}</td>
//                   <td>{date}</td>
//                   <td>
//                     <div className="flex items-center space-x-3">
//                       <Link href={`/my-bookings/update/${_id}`}>
//                         <button class="btn btn-primary">Edit</button>
//                       </Link>
//                       <button
//                         onClick={() => handleDelete(_id)}
//                         class="btn btn-error"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;

"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);

  const loadData = useCallback(async () => {
    if (session?.user?.email) {
      const resp = await fetch(
        `https://next-doctor-zcd4.vercel.app/my-bookings/api/${session.user.email}`
      );
      const data = await resp.json();
      setBookings(data?.myBookings);
    }
  }, [session?.user?.email]);

  const handleDelete = useCallback(
    async (id) => {
      const deleted = await fetch(
        `https://next-doctor-zcd4.vercel.app/my-bookings/api/booking/${id}`,
        {
          method: "DELETE",
        }
      );
      const resp = await deleted.json();
      if (resp?.response?.deletedCount > 0) {
        toast.success(resp?.message);
        loadData();
      }
    },
    [loadData]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="container mx-auto">
      <div className="relative h-72">
        <Image
          className="absolute h-72 w-full left-0 top-0 object-cover"
          src=""
          alt="service"
          width={1920}
          height={1080}
          style={{ width: "90vw" }}
        />
        <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
          <h1 className="text-white text-3xl font-bold flex justify-center items-center ml-8">
            My Bookings
          </h1>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Price</th>
              <th>Booking Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map(({ serviceTitle, _id, date, price }, index) => (
              <tr key={_id}>
                <td>{index + 1}</td>
                <td>{serviceTitle}</td>
                <td>{price}</td>
                <td>{date}</td>
                <td>
                  <div className="flex gap-4">
                    <Link
                      href={`/my-bookings/update/${_id}`}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(_id)}
                      className="btn btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
