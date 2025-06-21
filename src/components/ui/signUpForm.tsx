"use client";
import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { z } from "zod";
import { signUpSchema } from "@/utils/validation";

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

  return (
    <div>
      <Form {...form}>
        <form>
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
        </form>
      </Form>
    </div>
  );
}
