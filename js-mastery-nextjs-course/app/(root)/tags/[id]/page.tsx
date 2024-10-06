import QuestionCard from '@/components/cards/QuestionsCard'
import NoResult from '@/components/shared/NoResult'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { IQuestion } from '@/database/question.model'
import { getQuestionByTags } from '@/lib/actions/tag.actions'
import { URLProps } from '@/types'
import React from 'react'

const page = async ({params,searchParams}:URLProps) => {
  
    const result = await getQuestionByTags({
        tagId:params.id,
        page:1,
        searchQuery:searchParams.q
    })
  
  console.log("result",result);
    return (
        <>
        <h1 className="h1-bold text-dark100_light900 "> {result.tagTitle}</h1>

      <div className="mt-11 w-full">
            <LocalSearchbar
            route="/"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            otherClasses="flex-1"
            placeholder="Search for tag"
            />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((questions:IQuestion) => (
            <QuestionCard
              key={questions._id}
              _id={questions._id}
              title={questions.title}
              tags={questions.tags}
              author={questions.author}
              upvotes={questions.upvotes}
              views={questions.views}
              answers={questions.answer}
              createdAt={questions.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no question to show "
            description="Be the first to break the silence ! Ask a Question and kickstart the  discussion.our query could be the next big thing others learn from. Get  involved !"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  )
}

export default page