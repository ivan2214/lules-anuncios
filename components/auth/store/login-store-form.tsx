"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginStoreSchema } from "@schemas/index";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";

import CardWrapper from "@components/auth/card-wrapper";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { FormError } from "@components/form-error";
import { FormSucces } from "@components/form-succes";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { loginStore } from "@/actions/login-store";

export type LoginStoreFormValues = z.infer<typeof LoginStoreSchema>;

export type ResponseServerAction = {
  error?: string;
  success?: string;
};

export const LoginStoreForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";

  const [error, setError] = useState<string | undefined>("");
  const [viewPassword, setViewPassword] = useState(false);

  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginStoreFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginStoreSchema),
  });

  function onSubmit(values: LoginStoreFormValues) {
    setError("");
    setSuccess("");

    startTransition(() => {
      loginStore(values).then((res?: ResponseServerAction) => {
        if (res?.error) {
          setError(res.error);
        }
        if (res?.success) {
          setSuccess(res.success);
        }
      });
    });
  }

  return (
    <CardWrapper
      hederLabel="Bienvenido"
      backButtonLabel="Aun no tienes una tienda? Crea una aqui"
      backButtonHref="/auth/store/register"
      footer
      footerHref="/auth/store/register"
      footerLabel="Crea una tienda"
      className="bg-slate-900 text-white"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 text-white">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="email"
                      placeholder="example@me.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4 text-white">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between space-x-2">
                      <Input
                        disabled={isPending}
                        type={viewPassword ? "text" : "password"}
                        placeholder="********"
                        {...field}
                      />
                      {viewPassword ? (
                        <EyeClosedIcon
                          className="cursor-pointer"
                          onClick={() => setViewPassword(!viewPassword)}
                        />
                      ) : (
                        <EyeOpenIcon
                          className="cursor-pointer"
                          onClick={() => setViewPassword(!viewPassword)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSucces message={success} />

          <Button type="submit" className="w-full">
            Iniciar Sesion
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
