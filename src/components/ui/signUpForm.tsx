"use client";
import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { z } from "zod";
import { signUpSchema } from "@/utils/validation";
import { signUp } from "@/auth/actions";

import { Roboto } from "next/font/google";
import { Button } from "@/components/ui/button";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export default function SignUpForm() {
  const [error, setError] = useState<string>();
  const form = useForm<z.infer<typeof signUpSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    const error = await signUp(data);
    setError(error ?? undefined);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {error && <p className="text-destructive">{error}</p>}

          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input name="name" type="text" placeholder="Your Name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <div className="w-full flex justify-center mt-4">
            <Button
              type="submit"
              className="text-lg font-medium text-primary bg-white hover:bg-yellow-400 hover:text-primary hover:shadow-2xl hover:scale-105 active:scale-95 active:shadow-inner cursor-pointer transition-all duration-200 px-8 py-3 rounded-full w-full max-w-xs"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
