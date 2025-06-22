import { Roboto } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-primary via-blue-900 to-gray-900 min-h-screen flex items-center justify-center">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl max-w-2xl w-full mx-4 p-10 flex flex-col items-center">
        <h1
          className={`text-5xl font-bold text-center text-white mb-6 drop-shadow-lg ${roboto.className}`}
        >
          Manage Your Task With Ease
        </h1>
        <p
          className={`text-lg text-white/90 text-center mb-8 max-w-lg ${roboto.className}`}
        >
          A simple and intuitive task management app to help you stay organized
          and productive.
        </p>
        <div className="w-full border-t border-white/20 my-6"></div>
        <ul
          className={`text-white text-xl text-left space-y-4 w-full mb-8 ${roboto.className} font-bold`}
        >
          <li className="flex items-center gap-3">
            <span className="inline-block bg-yellow-400 rounded-full w-3 h-3"></span>
            Add & Track Your and Your Teams Tasks
          </li>
          <li className="flex items-center gap-3">
            <span className="inline-block bg-blue-400 rounded-full w-3 h-3"></span>
            Reminders & DeadLines
          </li>
          <li className="flex items-center gap-3">
            <span className="inline-block bg-green-400 rounded-full w-3 h-3"></span>
            Categories & Prioritize Tasks
          </li>
          <li className="flex items-center gap-3">
            <span className="inline-block bg-pink-400 rounded-full w-3 h-3"></span>
            Safe Connection & Data
          </li>
        </ul>
        <div className="flex flex-row justify-center space-x-4 w-full">
          <Link href="/sign-up">
            <Button
              className={`text-xl font-medium ${roboto.className} text-primary bg-white hover:bg-yellow-400 hover:text-primary hover:shadow-2xl hover:scale-105 active:scale-95 active:shadow-inner cursor-pointer transition-all duration-200 px-8 py-3 rounded-full`}
            >
              Get Started
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button
              className={`text-xl font-medium ${roboto.className} text-white bg-primary border border-white hover:bg-white hover:text-primary hover:shadow-2xl hover:scale-105 active:scale-95 active:shadow-inner cursor-pointer transition-all duration-200 px-8 py-3 rounded-full`}
            >
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
