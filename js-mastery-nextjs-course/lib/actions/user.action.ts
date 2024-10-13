"use server";

import User from "@/database/user.model";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
  GetAllUsersParams,
  ToggleSaveQuestionParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";
import Answer from "@/database/answer.model";
import { BadgeCriteriaType } from "@/types";
import { assignBadges } from "../utils";
export async function getUserById(params: any) {
  try {
    connectToDatabase();
    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }
    // delete user from database
    // and questions,answers,comments,etc.

    // const userQuestionsIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    // delete user questions
    await Question.deleteMany({ author: user._id });
    // TODO : delete user aswers,comments etc.

    const deleteUser = await User.findByIdAndDelete(user._id);

    return deleteUser;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function getAllUsers(params:GetAllUsersParams){

  try {
    connectToDatabase();
    // const { page =1 , pageSize=20,filter,searchQuery} = params;
    const { searchQuery,filter,page =1 , pageSize=1} = params;
    const skipAmount = (page -1 ) * pageSize;

    const query:FilterQuery<typeof User>= {};

      if(searchQuery){
        query.$or=[
          {name:{$regex:new RegExp(searchQuery,'i')}},
          {username:{$regex:new RegExp(searchQuery,'i')}},
        ]
      }

      let sortOptions = {};

      switch (filter){

        case "new_users":
            sortOptions = { joinedAt:-1} 
          break;
        case "old_users":
          sortOptions = { joinedAt:1} 
            break;
        case "top_contributors":
          sortOptions = { reputation:-1} 
            break;

            default:
              break;
      }

     const users = await User.find(query)
     .skip(skipAmount)
      .limit(pageSize)
     .sort(sortOptions);

     const totalUser = await  User.countDocuments(query);

     const isNext = totalUser > skipAmount +users.length;

     return  {users,isNext};



  }catch(Error){
    console.log("error", Error);
    throw Error;
  }
}

export async function toggleSaveQuestion(params:ToggleSaveQuestionParams){
  try {
    connectToDatabase();
     const { userId,questionId,path } = params;
     const user = await User.findById(userId);

     if(!user){
      throw new Error("User not found");
     }
     const isQuestionSaved = user.saved.includes(questionId);
     // remove question from save list
     if(isQuestionSaved){
        await  User.findByIdAndUpdate(userId,{
          $pull: { saved: questionId }},
          {new:true}
        )
     }else{
      // add question to save list 
      await  User.findByIdAndUpdate(userId,{
        $addToSet: { saved: questionId }},
        {new:true}
      )
     }

     revalidatePath(path);
  }catch(Error){
    console.log("error", Error);
    throw Error;
  }
}

export async function getSavedQuestions(params:GetSavedQuestionsParams){

    try{
      connectToDatabase();

      const { clerkId,page=1,pageSize=10,filter,searchQuery} = params;

      const query : FilterQuery<typeof Question> = searchQuery 
          ?  { title:{$regex: new RegExp(searchQuery,'i')}}
          : { };


  let sortOptions = {};

  switch(filter){
        case"most_recent":
          sortOptions = { createdAt:-1}
        break;
        case"oldest":
          sortOptions = { createdAt:1}
        break;
        case"most_voted":
        sortOptions= { upvotes:-1}
        break;
        case"most_viewed":
        sortOptions = { views:-1}
        break;
        case"most_answered":
        sortOptions = { answer:-1}
        break;
        default:
        break;
  }

      const user = await User.findOne({clerkId}).populate({
        path: 'saved',
        match:query,
        options: {
          sort: sortOptions,
        },
        populate:[
          {path:'tags', model:Tag,select:"_id name"},
          { path:'author', model:User,select:'_id clerkId name picture'}
        ]
      })
      if(!user) {
        throw new Error('User not found');
      }


  
      const savedQuestions = user.saved;

      return { questions: savedQuestions };
    }catch(error){
      console.log("Error",error);
      throw error;
    }


}


export  async function getUserInfo(params:GetUserByIdParams){
  try{
    connectToDatabase();

    const {userId} = params;
    
    const user = await User.findOne({clerkId:userId});
    if(!user){
      throw new Error("User not found")
    }

    const totalQuestion = await Question.countDocuments({author:user._id});

    const totalAnswer = await Answer.countDocuments({author:user._id});


      const [questionUpvotes] = await Question.aggregate([
        {$match:{author:user._id}},
        { $project:{
          _id:null,
          upvotes:{ sizeOfArray: { 
            $cond: { 
              if: { $isArray: "$upvotes" }, 
              then: { $size: "$upvotes" }, 
              else: 0 
            } 
          }
        } 
        }},
        {
          $group:{
            _id:null,
            totalUpvotes:{$sum:"$upvotes"}
          }}
      ])

      const [questionViews] = await Question.aggregate([
        {$match:{author:user._id}},
        { $project:{
          _id:null,
          totalviews:{ sizeOfArray: { 
            $cond: { 
              if: { $isArray: "$views" }, 
              then: { $size: "$views" }, 
              else: 0 
            } 
          }
        } 
        }}
      ])
    

      const [answerUpvotes] = await Answer.aggregate([
        {$match:{author:user._id}},
        { $project:{
          _id:0,upvotes:{$size:"$upvotes"}
        }},
        {
          $group:{
            _id:null,
            totalUpvotes:{$sum:"$upvotes"}
          }}
      ])
        const criteria = [
          {type:'QUESTION_COUNT' as BadgeCriteriaType,count:totalQuestion},
          {type:'ANSWER_COUNT' as BadgeCriteriaType,count:totalAnswer},
          {type:'QUESTION_UPVOTES' as BadgeCriteriaType,count:questionUpvotes?.totalUpvotes || 0},
          {type:'ANSWER_UPVOTES' as BadgeCriteriaType,count:answerUpvotes?.totalUpvotes || 0 },
          {type:'TOTAL_VIEWS' as BadgeCriteriaType,count:questionViews?.totalViews || 0 },
        ]

        const badgeCounts = assignBadges({criteria});



    return {
      user,
      totalAnswer,
      totalQuestion,
      badgeCounts,
      reputation:user.reputation
    }

    }catch(error){
    console.log("Error",error);
    throw error;
  }
}

export async function getUserQuestion(params:GetUserStatsParams){

    try{
      connectToDatabase();

      const {userId,page=1,pageSize=1} = params;

      const skipAmount = (page -1 ) * pageSize;

      const totalQuestion = await Question.countDocuments({author:userId})
      const userQuestion = await Question.find({author:userId})
          .skip(skipAmount)
          .limit(pageSize)
          .sort({views:-1,upvotes:-1})
          .populate('tags','_id name')
          .populate('author','_id  clerkId name picture')

      const isNext = totalQuestion > skipAmount +userQuestion.length;
      return  { totalQuestion,questions:userQuestion,isNext};

    }catch(error){
      console.log("Error",error);
      throw error;
    }
}


export async function getUserAnswer(params:GetUserStatsParams){

  try{
    connectToDatabase();

    const {userId,page=1,pageSize=10} = params;
    const skipAmount = (page -1 ) * pageSize;


    const totalAnswer = await Answer.countDocuments({author:userId})
    const userAnswer = await Answer.find({author:userId})
        .skip(skipAmount)
        .limit(pageSize)
        .sort({upvotes:-1})
        .populate('question','_id title')
        .populate('author','_id  clerkId name picture')

        const isNext = totalAnswer > skipAmount +userAnswer.length;

    return  { totalAnswer,answers:userAnswer,isNext};
  }catch(error){
    console.log("Error",error);
    throw error;
  }
}