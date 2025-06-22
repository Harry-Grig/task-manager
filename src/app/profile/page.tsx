import { db } from "@/utils/prisma";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export default function ProfilePage() {
  return (
    <div className="bg-gradient-to-tr from-blue-900 via-primary to-indigo-900 min-h-screen flex items-center justify-center">
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl shadow-xl max-w-lg w-full mx-4 p-10 flex flex-col items-center">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-yellow-400 via-pink-400 to-blue-400 border-4 border-white shadow-lg mb-6 flex items-center justify-center">
          <span className="text-5xl font-bold text-white drop-shadow-lg">
            👤
          </span>
        </div>
        <h2
          className={`text-3xl font-bold text-white text-center mb-2 tracking-tight ${roboto.className}`}
        >
          Your Profile
        </h2>
        <p
          className={`text-white/80 text-center mb-6 max-w-md ${roboto.className}`}
        >
          Welcome to your profile page. Here you can view and manage your
          account details, update your information, and see your activity.
        </p>
        <div className="w-full flex flex-col gap-4 items-center">
          <div className="w-full bg-white/30 rounded-xl p-4 flex flex-col gap-2 shadow">
            <div className="flex justify-between items-center">
              <span className="text-white/90 font-medium">Name:</span>
              <span className="text-white font-bold">John Doe</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/90 font-medium">Email:</span>
              <span className="text-white font-bold">john@example.com</span>
            </div>
          </div>
          <button className="mt-6 px-8 py-3 rounded-full bg-primary text-white font-medium text-lg shadow-lg hover:bg-yellow-400 hover:text-primary hover:scale-105 active:scale-95 active:shadow-inner transition-all duration-200">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
