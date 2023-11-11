"use client";

import { useTasksQuery } from "@/redux/features/tasks/tasksApi";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import Container from "../ui/Container";

const Tasks = () => {
  const { search } = useAppSelector((state) => state.filter);
  const query = search ? `?search=${search}` : "";
  const { data, isLoading, isError } = useTasksQuery(query);

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  if (!isLoading && isError) content = <div>Something went wrong</div>;
  if (!isLoading && !isError && data && data?.data?.length > 0) {
    content = data?.data?.map((task, index) => {
      
      const taskReviewsLength = (task as any)?.taskReviews?.length;
      const taskReviewsSum = (task as any)?.taskReviews?.reduce(
        (acc: any, curr: Record<string, any>) => {
          return acc + curr.rating.toString();
        },
        0
      )

      const avgRating =
      taskReviewsLength > 0
          ? Math.ceil((taskReviewsSum / taskReviewsLength))
          : 0;

        console.log(avgRating);
        

      return (
        <div
          key={task.id}
          data-aos="zoom-in-up"
          data-aos-easing="ease-in-back"
          data-aos-delay={`${index * 100}`}
          data-aos-duration="1000"
          data-aos-once="true"
        >
          <Image
            src={task.imageUrl}
            width={1000}
            height={400}
            layout="responsive"
            alt="experts-image"
          />
          <div className="flex mt-4 items-center">
            <h2 className="font-semibold mr-3">{task.title}</h2>
            <div className="rating">
              {Array(avgRating)
                .fill(0)
                .map((_, index) => (
                  <input
                    key={index}
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400 h-3 w-4"
                  />
                )).slice(0,4)}
            </div>
            <span className="inline-block text-sm ml-3">${task.price}</span>
          </div>
          <p className="text-sm mt-3">{task.description}</p>
          <Button className="mb-4">
            <Link href={`/services/${task.id}`}>Get Service</Link>
          </Button>
        </div>
      );
    });
  }

  return (
    <section className="py-10 md:py-20" id="task-section">
      <Container>
        <div className="flex justify-between mb-10 flex-col md:flex-row">
          <div
            className="md:basis-[60%] text-center md:text-left"
            data-aos="fade-down"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-duration="1000"
            data-aos-easing="ease-in-sine"
          >
            <h1 className="text-white text-xl text-center md:text-left md:text-4xl font-bold mb-5">
              Tasks Near You
            </h1>
            <p className="text-sm md:text-base">
              We make sure your expert suits your academic needs. All our
              writers pass several application tests and undergo thorough
              training before they start working.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-10">
          {content}
        </div>
      </Container>
    </section>
  );
};

export default Tasks;
