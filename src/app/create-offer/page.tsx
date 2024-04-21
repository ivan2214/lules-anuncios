"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OfferSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { createOffer } from "@/actions/offer";
import { FormError } from "@/components/form-error";
import { FormSucces } from "@/components/form-succes";
import { Loader2Icon } from "lucide-react";
import ImageUpload from "@/components/image-upload";

export type OfferFormValues = z.infer<typeof OfferSchema>;

const CreateOfferPage = () => {
  const [error, setError] = useState<string | undefined>("");

  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const defaultValues: OfferFormValues = {
    title: "",
    description: "",
    price: 0,
    categories: [],
    images: [],
    storeId: "",
  };

  const form = useForm<OfferFormValues>({
    defaultValues,
    resolver: zodResolver(OfferSchema),
  });

  function onSubmit(values: OfferFormValues) {
    setError("");
    setSuccess("");

    startTransition(() => {
      createOffer(values).then((res) => {
        setError(res.error);
        setSuccess(res.success);
      });
    });
  }
  return (
    <section className="w-full h-full justify-start flex flex-col gap-y-5">
      <h1 className="text-3xl font-bold">Create Product Offer</h1>
      <p className="text-gray-500 font-light">
        Fill in the form below to create a new product offer.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* add form categories array here */}
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <Input placeholder="Categories" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <section>
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Imagenes</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value?.map((image) => image?.url)}
                        disabled={isPending}
                        onChange={(url) => {
                          field.onChange([...field.value, { url }]);
                        }}
                        onRemove={(url) => {
                          field.onChange([
                            ...field.value.filter(
                              (current) => current?.url !== url
                            ),
                          ]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </section>
          <FormError message={error} />
          <FormSucces message={success} />

          <Button variant="default" disabled={isPending} type="submit">
            {isPending && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Creating..." : "Create Offer"}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default CreateOfferPage;
