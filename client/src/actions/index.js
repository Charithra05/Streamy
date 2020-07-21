import streams from '../apis/streams';
import axios from 'axios';
import { SIGN_OUT ,SIGN_IN} from './actionTypes';

export const signIn=()=>{
    return{
        type:SIGN_IN,
    }
    
};

export const signOut=()=>{
    return{
        type:SIGN_OUT,
    }
}