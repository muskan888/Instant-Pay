import { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import { use } from "react";

export async function createOnRampTransaction(amount:number, provider:string){
    //extract user
    const session=await getServerSession(authOptions);
    const token=Math.random().toString();
    //check user id
    const userId=session.user.id;
    if(!userId){
        return{
            message:"User not logged in"
        }
    }

    await prisma.onRampTransaction.create({
        data:{
             userId: Number(userId),
             amount: amount*100,
             status:"Processing",
             startTime:new Date(),
             provider,
             token: token

        }
    })

    return {
        message: "On ramp transaction added "
    }
    


}