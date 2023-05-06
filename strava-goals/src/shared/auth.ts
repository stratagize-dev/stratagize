import {getServerSession} from "next-auth";
import {AuthOptions} from "next-auth/src";
import CustomSession from "@/shared/types/auth/CustomSession";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export const getServerCustomSession = () => getServerSession<AuthOptions, CustomSession>(authOptions);