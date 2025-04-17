"use client";
import { Review } from "@/types";
import { useState } from "react";
import Link from "next/link";
import ReviewForm from "./review-form";

const Reviewalist = ({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  return (
    <div className="space-y-4">
      {!!reviews.length && <div>No Reviews Yet</div>}
      {userId ? (
        <ReviewForm userId={userId} productId={productId} />
      ) : (
        <div>
          Please
          <Link
            className="text-blue-700 px-2"
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
          >
            sign in
          </Link>{" "}
          to write a review
        </div>
      )}
    </div>
  );
};

export default Reviewalist;
