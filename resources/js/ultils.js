export function gqlErrors(err){
    const hasInternal = errors => errors.some(e => e.internal)
   const replaceInternal = (errors, err) => {
        return hasInternal(errors) ? (errors.filter(e => !e.internal)).concat(err) : errors
   }
   if(err?.networkError && err.networkError.statusCode == 419){
       throw new AuthError('Unauthenticated')
   }
    if(err?.graphQLErrors && err.graphQLErrors[0]?.extensions && err.graphQLErrors[0].extensions?.category == 'authorization'){
        throw new UnauthorizeError(err.graphQLErrors[0].message)
    }
    return replaceInternal(err?.graphQLErrors?.map((e) => {
        let message = ''
        let validationObject = {...e.extensions.validation};
        if(e.extensions.category == "validation"){
            for(const val in validationObject){
                message+= validationObject[val] + "<br>"
            }
        }
        else{
            message = e?.debugMessage
        }
        return {
            message: message || e.message,
            internal: !Boolean(e?.path?.length)
        }
    }) || [], {
        message: 'Some thing bad happened'
    }
    )
}

export class AuthError extends Error {

}
export class UnauthorizeError extends Error {

}

export const colorMap500  = {
    pink: "bg-pink-500",
    gray: "bg-gray-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    indigo: "bg-indigo-500",
    black: "bg-black"
};

export const colorMap100  = {
    pink: "bg-pink-100",
    gray: "bg-gray-100",
    yellow: "bg-yellow-100",
    purple: "bg-purple-100",
    red: "bg-red-100",
    green: "bg-green-100",
    blue: "bg-blue-100",
    indigo: "bg-indigo-100",
    black: "bg-black"
};

export const colorMap200  = {
    pink: "bg-pink-200",
    gray: "bg-gray-200",
    yellow: "bg-yellow-200",
    purple: "bg-purple-200",
    red: "bg-red-200",
    green: "bg-green-200",
    blue: "bg-blue-200",
    indigo: "bg-indigo-200",
    black: "bg-black"
};

export const colorGrid =
    [
        [ "red", "yellow", "gray"],
        ["green", "blue", "indigo"],
        ["purple", "pink", "black"]
    ]
