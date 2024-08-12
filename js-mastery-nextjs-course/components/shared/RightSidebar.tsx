import React from "react";
import Link from "next/link";
import Image from "next/image";
import RenderTag from "./RenderTag";

const hotQuestions = [
  { _id: 1, title: "How Do I use express as a custom server in NEXTJS ?" },
  { _id: 2, title: "Cascading Deletes in SQLAlchemy?" },
  { _id: 3, title: "How to Perfectly Ceneer a Div with Tailwind Css ?" },
  {
    _id: 4,
    title:
      "Best practices for data fetching in a NEXT.js application with Server-Side Rendering (SSR) ?  ",
  },
  { _id: 5, title: "Redux Toolkit Not Updating State as Expected " },
];

const popularTags = [
  { _id: 1, name: "javascript", totalQuestions: 5 },
  { _id: 2, name: "Rust", totalQuestions: 12 },
  { _id: 3, name: "Python", totalQuestions: 22 },
  { _id: 4, name: "Php", totalQuestions: 31 },
];
const RightSidebar = () => {
  return (
    <section
      className="background-light900_dark200 light-border 
    custom-scrollbar  shadow-light-300 border-1 sticky right-0 top-0
     flex h-screen w-[350px] flex-col justify-between overflow-y-auto p-6  
     pt-36 max-xl:hidden dark:shadow-none "
    >
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Question</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors "
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags </h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
