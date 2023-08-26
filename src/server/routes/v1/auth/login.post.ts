import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { supabase } from "../../../config/supabase";
import { Login } from "../../../types/login";



const login = async (event:any) => {
    const body = await readBody(event) as Login;
    const {data, error} = await supabase.auth.signInWithPassword(body) as any;
    if(error) {
        return error;
    }
    return data;
}

export default defineEventHandler(login);
