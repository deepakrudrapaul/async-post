import { defineEventHandler, getQuery, setResponseStatus, getHeader, H3Event } from 'h3';
import { supabase } from "../../../config/supabase";



const getCurrentUser = async (event:H3Event) => {
    const token = getHeader(event, 'x-auth-token');

    const {data, error} = await supabase.auth.getUser(token) as any;
    if(error) {
        return error;
    }
    return data;
}

export default defineEventHandler(getCurrentUser);
