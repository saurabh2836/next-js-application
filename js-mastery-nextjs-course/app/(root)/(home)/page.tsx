import LocalSearchbar from "@/components/shared/search/LocalSearchbar";

import { Button } from "@/components/ui/button";
import Filter from "@/components/shared/Filter";

import Link from "next/link";
import { HomePageFilters } from "@/constants/filter";
import HomeFilters from "@/components/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionsCard";

const questions = [
  {
    _id: 1,
    title: "Cascading Deletes in SQLAlchemy ? ",
    tags: [
      { _id: '1', name: "python" },
      { _id: '2', name: "sql" },
    ],
    author: {
      _id:'1',
      name:'saurabh kamble',
      picture:"saurabh.jpg"
    },
    upvotes: 10,
    views: 100,
    answers: [],
    createdAt: new Date("2021-09-01T12:00:00.00Z"),
  },
  {
    _id: 2,
    title: "How to center a div ? ",
    tags: [
      { _id: '1', name: "html" },
      { _id: '2', name: "css" },
    ],
    author: {
      _id:'1',
      name:'saurabh kamble',
      picture:"/saurabh.jpg"
    },
    upvotes: 10,
    views: 100,
    answers: [],
    createdAt: new Date("2021-09-01T12:00:00.00Z"),
  },
  {
    _id: 3,
    title: "Cascading Deletes in SQLAlchemy ? ",
    tags: [
      { _id: '1', name: "python" },
      { _id: '2', name: "sql" },
    ],
    author: {
      _id:'1',
      name:'saurabh kamble',
      picture:"/saurabh.jpg"
    },
    upvotes: 10,
    views: 100,
    answers:[],
    createdAt: new Date("2021-09-01T12:00:00.00Z"),

  },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900 "> All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient  text-light-900 min-h-[46px] px-4 py-3">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
          placeholder="Search for questions"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map(
            (questions) =>
              <QuestionCard 
               key={questions._id}
               _id={questions._id}
               title={questions.title}
               tags={questions.tags}
               author={questions.author}
               upvotes={questions.upvotes}
               views={questions.views}
               answers={questions.answers}
               createdAt={questions.createdAt}

              />
          )
        ) : (
        <NoResult 
          title="There's no question to show "
          description = "Be the first to break the silence ! Ask a Question and kickstart the
        discussion.our query could be the next big thing others learn from. Get  involved !"
           link="/ask-question"
           linkTitle="Ask a Question"
          />
        )
        }
      </div>
    </>
  );
}
