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

export const colorMap100  = {
    teal: "bg-teal-100",
    orange: "bg-orange-100",
    gray: "bg-gray-100",
    yellow: "bg-yellow-100",
    purple: "bg-purple-100",
    red: "bg-red-100",
    green: "bg-green-100",
    blue: "bg-blue-100",
    indigo: "bg-indigo-100"
};

export const colorMap200  = {
    teal: "bg-teal-200",
    orange: "bg-orange-200",
    gray: "bg-gray-200",
    yellow: "bg-yellow-200",
    purple: "bg-purple-200",
    red: "bg-red-200",
    green: "bg-green-200",
    blue: "bg-blue-200",
    indigo: "bg-indigo-200"
};
