
"use server"

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { AnswerVoteParams, CreateAnswerParams, DeleteAnswerParams, GetAnswersParams } from "./shared.types";
import Answer from "@/database/answer.model";
import { revalidatePath } from "next/cache";
import Interaction from "@/database/interaction.model";

export async function createAnswer(params:CreateAnswerParams){
    try {
        connectToDatabase();
        const { content,author,question,path} = params;
        const newAnswer = await Answer.create({content,author,question});
        
        //Add the answer to the question's answer array 
        await Question.findByIdAndUpdate(question , {
            $push:{ answer:newAnswer.question}
        })
        revalidatePath(path);

    }catch(error){
        console.log("error",error);
        throw error;
    }
}

export async function getAnswers(params:GetAnswersParams){
    try{
            connectToDatabase();
            
            const { questionId} = params;
            const answer = await Answer.find({question:questionId})
            .populate("author","_id clerkId name picture")
            .sort({createdAt:-1})
            return {answer}
    }catch(error){
        console.log("error",error);
        throw error 
    }
}

export async function upvoteAnswer(params: AnswerVoteParams){
    try {
      connectToDatabase();
  
      const {
        answerId,userId,hasupVoted,hasdownVoted,path
      } = params;
  
      let updateQuery = {};
      
      if(hasupVoted){
        updateQuery = { $pull:{ upvotes:userId}};
      } else if (hasdownVoted){
        updateQuery = { 
          $pull:{ downvotes:userId},
          $push:{upvotes:userId}
      }
    }else{
      updateQuery = { $addToSet:{ upvotes:userId}}
    }
  
    const  answer = await Answer.findByIdAndUpdate(answerId,updateQuery,{new:true});
  
      if(!answer){
        throw new Error(`Answer not found`);
      }
  
    }catch(error){
      console.log("Error",error)
      throw error;
    }
  }

  export async function downvoteAnswer(params: AnswerVoteParams){
    try {
      connectToDatabase();
      const {
        answerId,userId,hasupVoted,hasdownVoted,path
      } = params;
  
      let updateQuery = {};
      if(hasdownVoted){
        updateQuery = { $pull:{ downvote:userId}};
      } else if (hasupVoted){
        updateQuery = { 
          $pull:{ upvotes:userId},
          $push:{downvotes:userId}
      }
    }else{
      updateQuery = { $addToSet:{ downvotes:userId}}
    }
  
    const  answer = await Answer.findByIdAndUpdate(answerId,updateQuery,{new:true});
  
      if(!answer){
        throw new Error(`Answer not Found`);
      }
      revalidatePath(path)
    }catch(error){
      console.log("Error",error)
      throw error;
    }
  }


export async function deleteAnswer (params:DeleteAnswerParams){
  try {
    connectToDatabase();
    const { answerId,path} = params;

    const answer = await Answer.findById(answerId);

    console.log("answer",answer);
    if(!answer){
      throw new Error("Answer not Found");
    }

    await answer.deleteOne({_id:answerId});

    await Question.updateMany({_id:answer.question},{$pull:{
      answers:answerId
    }});


    await Interaction.deleteMany({answer:answerId});
    
    revalidatePath(path);
  }catch(error){
    console.log("Error",error)
    throw error;
  }
}