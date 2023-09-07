import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { supabase } from "../../../config/supabase";
import { Provider } from "@supabase/supabase-js";




const login = async (event:any) => {
    const body = await readBody(event) as {provider: Provider};
    const {data, error} = await supabase.auth.signInWithOAuth({provider:body}.provider) as any;
    if(error) {
        return error;
    }
    return data;
}

export default defineEventHandler(login);
