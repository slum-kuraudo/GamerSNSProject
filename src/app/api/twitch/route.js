import dotenv from 'dotenv';
import { NextResponse } from 'next/server';

dotenv.config();

export async function POST(response){

    try {
        const res = await fetch('https://api.twitch.tv/helix/games?igdb_id=115', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Client-ID': `${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}`,
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TWITCH_APP_ACCESS_TOKEN}`,
            },
            body: "fields name,cover.url; where id = 36926;"
            ,
        });
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}