"use client";

import { useAddTaskReviewMutation } from "@/redux/features/taskReview/taskReviewApi";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddReview = ({ taskId }: { taskId?: string }) => {
  //   const { data: session } = useSession();

  const [addTaskReview] = useAddTaskReviewMutation();

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      rating: Number(rating),
      comment,
      taskId,
    };
    try {
      await addTaskReview(data).unwrap();
      toast.success("Review Added Successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleReviewSubmit}>
      <textarea
        name="comment"
        className="mt-10 text-white textarea textarea-primary w-80 h-32 "
        placeholder="Write your review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="rating block my-2">
        {[...Array(5)].map((_, i) => (
          <input
            key={i}
            type="radio"
            name={`rating-2`}
            className="mask mask-star-2 bg-orange-400"
            value={i + 1}
            onClick={() => setRating(Number(i + 1))}
            checked={rating === i + 1}
          />
        ))}
      </div>
      <button className="btn btn-primary mt-2">Add a Review</button>
    </form>
  );
};

export default AddReview;
