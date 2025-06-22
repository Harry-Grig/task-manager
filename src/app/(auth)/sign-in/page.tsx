import { Roboto } from "next/font/google";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SignInForm from "@/components/signInForm";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export default function SignIn() {
  return (
    <div className="bg-gradient-to-br from-primary via-blue-900 to-gray-900 min-h-screen flex items-center justify-center">
      <Card className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl max-w-md w-full mx-4 p-8 flex flex-col items-center">
        <CardHeader className="w-full flex flex-col items-center p-0 mb-2">
          <CardTitle className={`text-3xl text-white text-center font-bold tracking-tight ${roboto.className}`}>Sign In</CardTitle>
        </CardHeader>
        <CardDescription className={`text-white/80 text-center mb-6 ${roboto.className}`}>Enter your credentials to access your account</CardDescription>
        <CardContent className="w-full flex flex-col items-center">
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
