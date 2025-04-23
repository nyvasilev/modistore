const StripePayment = ({
  priceInCents,
  orderId,
  clientSecret,
}: {
  priceInCents: Number;
  orderId: string;
  clientSecret: string;
}) => {
  console.log("stripe");
  return <>STRIPE FORM</>;
};

export default StripePayment;
