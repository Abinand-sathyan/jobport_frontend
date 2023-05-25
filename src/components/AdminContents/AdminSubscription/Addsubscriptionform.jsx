// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { message } from "antd";
// import { Link } from "react-router-dom";
// import { InfinitySpin } from "react-loader-spinner";
// import { Addsubscription } from "../../../apis/adminapi";
// import moment from "moment";

// const Addsubscriptionform = () => {
//   const [isloading, setIsloading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("AdminToken");

//   const validateaField = (data) => {
//     let errors = {};

//     if (!data.limits.trim()) {
//       errors.limits = "limits is required";
//     }

//     if (!data.name.trim()) {
//       errors.name = "name is required";
//     }

//     if (!data.duration.trim()) {
//       errors.duration = "duration is required";
//     }

//     if (!data.fee.trim()) {
//       errors.fee = "submiton fee is required";
//     }

//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = (events) => {
//     events.preventDefault();
//     let data = new FormData(events.currentTarget);

//     data = {
//       limits: data.get("limits"),
//       duration: data.get("duration"),
//       fee: data.get("fee"),
//       name: data.get("name"),
//     };

//     try {
//       if (validateaField(data)) {
//         setIsloading(true);
//         if (token) {
//           (async function invoke() {
//             await Addsubscription(token, data).then((res) => {
//               if (res.data.success) {
//                 setIsloading(false);
//                 message.success("subscription added succesfully");
//                 navigate("/admin/subscription");
//               } else {
//                 setIsloading(false);
//                 setError(res.data.message);
//                 message.error(res.data.message).then(() => {
//                   setError(null);
//                 });
//               }
//             });
//           })();
//         }
//       } else {
//       }
//     } catch (erroe) {}
//   };

//   const months = [
//     { month: "1 month" },
//     { month: "2 month" },
//     { month: "3 month" },
//     { month: "4 month" },
//     { month: "5 month" },
//     { month: "6 month" },
//     { month: "7 month" },
//     { month: "8 month" },
//     { month: "9 month" },
//     { month: "10 month" },
//     { month: "11 month" },
//     { month: "12 month" },
//   ];

//   return (
//     <form
//       className="bg-white mx-auto my-6 flex flex-col w-full   max-w-2xl "
//       onSubmit={handleSubmit}
//     >
//       <div className="py-6">
//         <div className="flex bg-white rounded-lg  overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
//           <div className="w-full p-8 ">
//             <p className="text-2xl font-semibold text-center myb-4 text-siteviolet">
//               ADD SUBSCRIPTION
//             </p>

//           <div className="mt-4 text-left">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Posting Limits
//               </label>
//               <input
//                 className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
//                 type="number"
//                 id="limits"
//                 name="limits"
//               ></input>
//             </div>
//             {errors.limits && (
//               <span className="error text-red-400">{errors.limits}</span>
//             )}

//             <div className="mt-4 text-left">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Subscription Name
//               </label>
//               <input
//                 className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
//                 type="text"
//                 id="name"
//                 name="name"
//               ></input>
//             </div>
//             {errors.name && (
//               <span className="error text-red-400">{errors.name}</span>
//             )}
//             <div className="mt-4">
//               <div className="flex justify-between">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Duration of subscription
//                 </label>
//               </div>
//               <select
//                 className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
//                 id="duration"
//                 name="duration"
//               >
//                 {months.map((data) => (
//                   <option value={data.value}>{data.month}</option>
//                 ))}
//               </select>
//             </div>
//             {errors.duration && (
//               <span className="error text-red-400">{errors.duration}</span>
//             )}
//             <div className="mt-4">
//               <div className="flex justify-between">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Subscription Fee
//                 </label>
//               </div>
//               <input
//                 className=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
//                 type="number"
//                 id="fee"
//                 name="fee"
//               ></input>
//             </div>
//             {errors.fee && (
//               <span className="error text-red-400">{errors.fee}</span>
//             )}
//             {error && (
//               <div className="error text-center w-full p-2 bg-red-600 bg-opacity-30 text-red-500">
//                 {error}
//               </div>
//             )}
//             {isloading ? (
//               <div className="mb-4 mt-10 flex justify-center ">
//                 <InfinitySpin width="200" color="#194569" />
//               </div>
//             ) : (
//               <div className="mt-8">
//                 <button className="bg-violet-800 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
//                   Add Subscription
//                 </button>
//               </div>
//             )}
//             <div className="mt-4 flex items-center justify-between"></div>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Addsubscriptionform;
