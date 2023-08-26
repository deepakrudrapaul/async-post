import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { supabase } from "../../../config/supabase";



const getSesson = async () => {
    const {data, error} = await supabase.auth.getSession() as any;
    if(error) {
        return error;
    }
    return data;
}

export default defineEventHandler(getSesson);
