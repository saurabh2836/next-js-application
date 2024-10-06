
"use server"
import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";


export async function viewQuestion(params:ViewQuestionParams){

    try{
        await connectToDatabase();
        const { questionId,userId } = params;
            console.log("questionId",questionId);
            console.log("userId",userId);
        // update view count for that question 
        await Question.findByIdAndUpdate (questionId,{$inc:{views:1}});

        if(userId){
            const existingInterfaction = await Interaction.findOne({
                user:userId,
                action:"view",
                question:questionId
            })
            console.log("existingInterfaction",existingInterfaction);
            if(existingInterfaction) return console.log("User has already viewed.")

                // Create interaction
            await Interaction.create({
                user:userId,
                action:"view",
                qustion:questionId
            })
            console.log("Interaction",Interaction);

        }
    }catch(error){
        console.log("error",error);
        throw error;
    }

}