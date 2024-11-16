import dotenv from 'dotenv';
import { NextResponse } from 'next/server';

dotenv.config();

export async function POST(request){
    try {
        const { body } = await request.json();
        const res = await fetch('https://api.igdb.com/v4/games', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Client-ID': `${process.env.TWITCH_CLIENT_ID}`,
                'Authorization': `Bearer ${process.env.TWITCH_APP_ACCESS_TOKEN}`,
            },
            body: body,
        });
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}

