"use client";

import { useState } from "react";

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
  pseudo: z.string().min(2, {
    message: "Un pseudo doit avoir au moins 3 caractères.",
  }),
  address: z.string().min(2, {
    message: "Un pseudo doit avoir au moins 3 caractères.",
  }),
});

export default function ProfileForm({ userId }: any) {
  const [addresses, setAddresses] = useState<any>([]);
  const [selectedAddresses, setSelectedAddresses] = useState<object>({});

  const additionalFieldsStyle: React.CSSProperties =
    addresses.length > 0
      ? {
          opacity: 1,
          zIndex: 0,
          maxHeight: "500px",
          transition: "opacity 0.5s, maxHeight 0.5s",
        }
      : {
          opacity: 0,
          maxHeight: 0,
          zIndex: -1,
          transition: "opacity 0.5s, maxHeight 0.5s",
        };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pseudo: "",
      address: "",
    },
  });

  // console.log(form.watch("address"));

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const { address, pseudo } = values;

    const formData = new FormData();
    formData.append("address", address);
    formData.append("pseudo", pseudo);

    const response = await fetch("/api/users/" + userId, {
      method: "PUT",
      body: formData,
    });

    const data = await response.json();
    console.log(data);
  }

  async function fetchAddresses(input: any) {
    const response = await fetch("/api/address?query=" + input);
    const data = await response.json();

    console.log(data);
    setAddresses(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-96  flex  flex-col max-w-screen"
      >
        <FormField
          control={form.control}
          name="pseudo"
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
        <div>
          <FormField
            control={form.control}
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
          {addresses.length > 0 && (
            <div className="border mt-0 -translate-y-3 rounded-b-md border-primary border-t-0 p-3">
              <span style={additionalFieldsStyle} className="p-2 font-medium">
                Cliquez sur votre adresse ci-dessous👇
              </span>
              {addresses.map((address: any, index: number) => (
                <p
                  className="p-2 hover:bg-secondary cursor-pointer rounded-md"
                  key={index}
                >
                  {" "}
                  {address?.properties?.label}
                </p>
              ))}
            </div>
          )}
        </div>

        <Button className="self-center" type="submit">
          enregistrer
        </Button>
      </form>
    </Form>
  );
}
