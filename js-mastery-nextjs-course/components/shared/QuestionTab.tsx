import { getUserQuestion } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types'
import React from 'react'
import QuestionCard from '../cards/QuestionsCard';


interface Props extends SearchParamsProps {
     userId:string;
     clerkId?:string | null

}


const QuestionTab = async({searchProps,userId,clerkId}:Props) => {

        const result = await getUserQuestion({
            userId,
            page:1      
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
    </>
  )
}

export default QuestionTab