// // 'use client';

// // import { useRouter } from 'next/navigation';
// // import { LogOut } from 'lucide-react'; // Optional icon

// // export default function LogoutButton() {
// //   const router = useRouter();

// //   const handleLogout = async () => {
// //     await fetch('/api/admin/logout', { method: 'POST' });
// //     router.push('/login');
// //   };

// //   return (
// //     <button
// //       onClick={handleLogout}
// //       className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg shadow transition duration-200 ease-in-out"
// //     >
// //       <LogOut size={18} />
// //       <span>Logout</span>
// //     </button>
// //   );
// // }
// "use client";

// import { LogOut } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function LogoutButton() {
//   const router = useRouter();

//   async function handleLogout() {
//     // Call your logout API or clear cookies/localStorage here
//     await fetch("/api/logout", { method: "POST" });

//     // Redirect after logout
//     router.push("/login");
//   }

//   return (
//     <button
//       onClick={handleLogout}
//       className="flex items-center gap-2 text-red-600 hover:bg-red-50 w-full px-4 py-3 rounded-md transition font-semibold"
//     >
//       <LogOut className="w-5 h-5" />
//       Logout
//     </button>
//   );
// }
'use client';

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/login');
  };
  

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-red-600 hover:bg-red-50 w-full px-4 py-3 rounded-md transition font-semibold"
    >
      <LogOut className="w-5 h-5" />
      Logout
    </button>
  );
}
