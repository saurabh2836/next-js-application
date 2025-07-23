import ROUTES from "./routes";


export const DEFAULT_EMPTY = {
    title:"No Data Found",
    message:"Looks like the database is taking a nap.Wake it up with some new entries.",
    button:{
        text:"Add Data",
        href:ROUTES.HOME
    }
}

    export const DEFAULT_ERROR={
        title:"Something went wrong",
        message:"Even our code can have a bad day.Give it another shot.",
        button:{
            text:"Retry Request",
            href:ROUTES.HOME        
        },
    }


    export const EMPTY_QUESTION = {
        title:"Ahh,No Questions Yet !!",
        message:"Even our code can have a bad day.Give it another shot.",
        button:{
            text:"Ask a Question",
            href:ROUTES.ASK_QUESTION
        },
    }


    export const EMPTY_ANSWER = {  
        title:"No Answers Found !!",
        message:"The answer board is empty.Make it rain with your brilliant answer.",
    }

    export const EMPTY_TAG ={
        title:"No Tags Found !!",
        message:"The tag cloud is empty.Add some keywords to make it rain",
        button:{
            text:"Add Tags",
            href:ROUTES.TAGS
        },
    }

    export const EMPTY_COLLECTIONS = {
        title:"Collections Are empty",
        message:"Looks like have't created any collections yet.Start curating something",
        button:{
            text:"Save to Collection",
            href:ROUTES.COLLECTION,
        }
    }

    export const EMPTY_USERS = {
        title:"No Users Found",
        message:"You're Alone.The only one here.More uses are coming soon !"
    }




