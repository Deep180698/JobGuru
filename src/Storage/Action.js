import AppConstants from './AppConstants'

export const authFunc =(item)=>{
    return{
        type:AppConstants.AsyncKeyLiterals.IS_AUTH,
        Data:item,
        token:item.token
    }
}