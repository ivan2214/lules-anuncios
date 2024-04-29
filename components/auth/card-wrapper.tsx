import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { Header } from "@components/auth/header";
import { Social } from "@components/auth/social";
import { BackButton } from "@components/auth/back-button";
import Link from "next/link";
import { Button } from "../ui/button";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  hederLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  footer?: boolean;
  footerHref?: string;
  footerLabel?: string;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

export default function CardWrapper({
  children,
  hederLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  footer = true,
  footerHref,
  footerLabel,
  className,
}: CardWrapperProps) {
  return (
    <Card className={cn("w-[400px] shadow-md", className)}>
      <CardHeader>
        <Header label={hederLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
      {footer && footerHref && footerLabel && (
        <CardFooter>
          <section className="flex w-full items-center flex-col gap-2">
            <span className="text-sm font-normal">{footerLabel}</span>
            <Button variant="link" className="w-full font-normal" size="sm">
              <Link href={footerHref}>Hace click aqui</Link>
            </Button>
          </section>
        </CardFooter>
      )}
    </Card>
  );
}
