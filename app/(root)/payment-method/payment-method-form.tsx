"use client";
import { userRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { paymentMethodShema } from "@/lib/validators";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PAYMENT_METHOD } from "@/lib/constants";

const PaymentMethodForm = ({
  prefferedPaymentMethod,
}: {
  prefferedPaymentMethod: string | null;
}) => {
  const router = userRouter();
  const toast = useToast();

  const form = useForm<z.infer<typeof paymentMethodShema>>({
    resolver: zodResolver(paymentMethodShema),
    defaultValues: {
      type: prefferedPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  });

  const [isPending, startTransitions] = useTransition();

  return (
    <>
      <CheckoutSteps current={2} />
    </>
  );
};

export default PaymentMethodForm;
