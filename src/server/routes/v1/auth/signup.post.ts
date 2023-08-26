import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { supabase } from "../../../config/supabase";
import { Login } from "../../../types/login";



const signup = async (event:any) => {
    const body = await readBody(event) as Login;
    const {data, error} = await supabase.auth.signUp(body) as any;
    if(error) {
        return error;
    }
    return data;
}

export default defineEventHandler(signup);
