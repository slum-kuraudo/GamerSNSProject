import dotenv from 'dotenv';
import { NextResponse } from 'next/server';

dotenv.config();

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');
        const res = await fetch(`https://api.clerk.com/v1/users/?limit=1&offset=0&order_by=-created_at&${username}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
            }
        });

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}