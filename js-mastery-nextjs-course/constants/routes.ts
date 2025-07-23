const ROUTES ={
    HOME: '/',
    SIGN_IN:"/sign-in",
    SIGN_UP: '/sign-up',
    ASK_QUESTION: '/ask-question',
    COLLECTION:"/collection",
    TAGS: '/tags',
    JOBS:"/jobs",
    PROFILE:(id:string) => `/profile/${id}`,
    QUESTION: (id:string) => `/question/${id}`,
    TAG:(id:string) => `/tag/${id}`,
    SIGN_IN_WITH_OAUTH: '/sign-in-with-oauth',
}

export default ROUTES;

