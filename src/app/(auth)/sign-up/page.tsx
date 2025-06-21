import { Roboto } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "@/components/ui/signUpForm";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export default function SignUp() {
  return (
    <div className="bg-gradient-to-br from-primary via-blue-900 to-gray-900 min-h-screen flex items-center justify-center">
      <Card className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl max-w-md w-full mx-4 p-8 flex flex-col items-center">
        <CardHeader className={`text-3xl text-white text-center font-bold mb-2 ${roboto.className}`}>
          Create new Account
        </CardHeader>
        <CardDescription className={`text-white/80 text-center mb-6 ${roboto.className}`}>
          Enter Personal Information
        </CardDescription>
        <CardContent className="w-full flex flex-col items-center">
          <SignUpForm />
        </CardContent>
        <CardFooter className="w-full flex justify-center mt-4">
          <Button className={`text-lg font-medium ${roboto.className} text-primary bg-white hover:bg-yellow-400 hover:text-primary hover:shadow-2xl hover:scale-105 active:scale-95 active:shadow-inner cursor-pointer transition-all duration-200 px-8 py-3 rounded-full w-full max-w-xs`}>
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
