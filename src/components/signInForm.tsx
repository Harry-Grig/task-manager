"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { signInSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export default function SignInForm() {
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {};

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {error && <p className="text-destructive mb-4">{error}</p>}

          <div className="flex flex-col gap-6">
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
          </div>

          <div className="w-full flex justify-center mt-6">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="text-lg font-medium text-primary bg-white hover:bg-yellow-400 hover:text-primary hover:shadow-2xl hover:scale-105 active:scale-95 active:shadow-inner cursor-pointer transition-all duration-200 px-8 py-3 rounded-full w-full max-w-xs"
            >
              {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
