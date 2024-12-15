import dotenv from 'dotenv';

dotenv.config();

export async function GET() {
    try {
        const res = await fetch(`https://api.clerk.com/v1/users?limit=10&offset=0&order_by=-created_at`, {
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