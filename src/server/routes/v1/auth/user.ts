import { defineEventHandler, getQuery, setResponseStatus } from 'h3';
import { supabase } from "../../../config/supabase";



const getCurrentUser = async () => {
    const {data, error} = await supabase.auth.getUser() as any;
    if(error) {
        return error;
    }
    return data;
}

export default defineEventHandler(getCurrentUser);
