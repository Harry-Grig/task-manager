"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    try {
      setError(undefined); // Clear previous errors
      const error = await signUp(data);

      // Αν επιστραφεί error string, το εμφανίζουμε
      if (error) {
        setError(error);
      }
      // Αν δεν υπάρχει error, το redirect θα γίνει από το server action
    } catch (err: any) {
      // Αγνοούμε το NEXT_REDIRECT error γιατί είναι φυσιολογικό
      if (err?.digest?.startsWith("NEXT_REDIRECT")) {
        // Αυτό είναι το redirect - δεν κάνουμε τίποτα
        return;
      }

      // Μόνο για άλλα errors
      console.error("Form submission error:", err);
      setError("An unexpected error occurred");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {error && <p className="text-destructive mb-4">{error}</p>}

          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Your Name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="m@example.com"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="••••••••"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="••••••••"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex justify-center mt-6">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="text-lg font-medium text-primary bg-white hover:bg-yellow-400 hover:text-primary hover:shadow-2xl hover:scale-105 active:scale-95 active:shadow-inner cursor-pointer transition-all duration-200 px-8 py-3 rounded-full w-full max-w-xs"
            >
              {form.formState.isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
