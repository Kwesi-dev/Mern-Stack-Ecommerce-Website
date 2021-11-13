import { loginStart, loginFailure, loginSuccess, logout } from './userSlice' 
import { publicRequest } from '../requestMethods'

export const userLogin= async (dispatch, user) => {
    dispatch(loginStart())
    try{
        const res = await publicRequest.post('/auth/login', user)
        dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFailure())
    }
}
export const userLogout = async (dispatch) => {
    try{
        dispatch(logout())
    }catch(err){}
}