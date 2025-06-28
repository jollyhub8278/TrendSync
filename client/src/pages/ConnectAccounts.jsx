// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ConnectedAccounts = () => {
//   const [accounts, setAccounts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchAccounts = async () => {
//     try {
//       const token = localStorage.getItem("token"); // or however you store it
//       if (!token) {
//         setError("You are not authenticated");
//         return;
//       }
//       const res = await axios.get(
//         "https://trendsync-1d7b.onrender.com/api/social/facebook/accounts",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setAccounts(res.data.accounts);
//     } catch (err) {
//       setError("Failed to fetch accounts");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAccounts();
//   }, []);

//   if (loading) return <p>Loading accounts...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Connected Accounts</h2>
//       {accounts.length === 0 ? (
//         <p>No social media accounts found for your email.</p>
//       ) : (
//         accounts.map((acc, index) => (
//           <div key={index} className="border p-4 mb-3 rounded-lg shadow-sm">
//             <p>
//               <strong>Page Name:</strong> {acc.pageName}
//             </p>
//             <p>
//               <strong>Page ID:</strong> {acc.pageId}
//             </p>
//             {acc.igAccount ? (
//               <p>
//                 <strong>Instagram:</strong> {acc.igAccount.id}
//               </p>
//             ) : (
//               <p>
//                 <em>No Instagram connected</em>
//               </p>
//             )}
//             <p className="text-green-600 font-semibold mt-2">
//               ✅ Is this your account?
//             </p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ConnectedAccounts;


import React from "react";
import { useNavigate } from "react-router-dom";

const ConnectAccounts = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/"); // takes to MainLayout (dashboard)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md text-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Connect Your Social Accounts</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded bg-blue-100">📸 Instagram</div>
          <div className="p-4 border rounded bg-blue-100">🐦 Twitter</div>
          <div className="p-4 border rounded bg-blue-100">📘 Facebook</div>
          <div className="p-4 border rounded bg-blue-100">🔗 LinkedIn</div>
        </div>
        <button
          onClick={handleContinue}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ConnectAccounts;
