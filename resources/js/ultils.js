export function gqlErrors(err){
    const hasInternal = errors => errors.some(e => e.internal)
   const replaceInternal = (errors, err) => {
        return hasInternal(errors) ? (errors.filter(e => !e.internal)).concat(err) : errors
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
