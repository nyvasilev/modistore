import { cn } from "@/lib/utils";

const ProductPrice = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  const stringValue = value.toFixed(2);
  const [initValue, floatValue] = stringValue.split(".");

  return (
    <div className={cn("text-2l", className)}>
      <span className="text-xs align-super">$</span>
      {initValue}
      <span className="text-xs align-super">.{floatValue}</span>
    </div>
  );
};

export default ProductPrice;
