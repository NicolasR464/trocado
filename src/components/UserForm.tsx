"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";

// const form = useForm();

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Un pseudo doit avoir au moins 3 caractères.",
  }),
});

export default function ProfileForm(userId: any) {
  // console.log(userId);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // console.log(form.watch("address"));

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  function fetchAddresses(e: any) {
    console.log(e);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-80  flex  flex-col max-w-screen"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pseudo</FormLabel>
              <FormControl>
                <Input placeholder="votre pseudo" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse postale</FormLabel>
              <FormControl>
                <Input
                  placeholder="votre adresse postale"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    fetchAddresses(e.target.value);
                  }}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="self-center" type="submit">
          enregistrer
        </Button>
      </form>
    </Form>
  );
}
