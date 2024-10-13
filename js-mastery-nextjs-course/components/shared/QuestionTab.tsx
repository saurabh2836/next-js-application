import { getUserQuestion } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types'
import React from 'react'
import QuestionCard from '../cards/QuestionsCard';
import Pagination from './Pagination';


interface Props extends SearchParamsProps {
     userId:string;
     clerkId?:string | null

}


const QuestionTab = async({searchParams,userId,clerkId}:Props) => {

        const result = await getUserQuestion({
            userId,
            page:searchParams.page ? +searchParams.page : 1    
  })


  return (
    <>
        {result?.questions.map((questions) =>(
            <QuestionCard
                key={questions._id}
                _id={questions._id}
                clerkId={clerkId}
                title={questions.title}
                tags={questions.tags}
                author={questions.author}
                upvotes={questions.upvotes}
                views={questions.views}
                answers={questions.answer}
                createdAt={questions.createdAt}
              />
        ))}
          <div className="mt-10">
              <Pagination
                        pageNumber = {searchParams?.page ? +searchParams.page: 1}
                        isNext = {result.isNext}
                />
                </div>
    </>
  )
}

export default QuestionTab