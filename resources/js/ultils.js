export function gqlErrors(err){
    const hasInternal = errors => errors.some(e => e.internal)
   const replaceInternal = (errors, err) => {
        return hasInternal(errors) ? (errors.filter(e => !e.internal)).concat(err) : errors
   }
   if(err?.networkError && err.networkError.statusCode == 419){
       throw new AuthError('Unauthenticated')
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

export const colorMap500  = {
    teal: "bg-teal-500",
    orange: "bg-orange-500",
    gray: "bg-gray-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    indigo: "bg-indigo-500"
};
