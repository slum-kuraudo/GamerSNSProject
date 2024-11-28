import Axios from "axios";
import { useEffect, useState } from "react";

interface UserNameProps {
    firstname: string
    username: string
}

export default function UserProfile({ firstname, username }: UserNameProps) {
    interface UserData {
        id: string;
        email: string;
        // 他のユーザーデータのプロパティをここに追加
    }
    console.log(username);

    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await Axios.get(`/api/clerk?username=${username}`);
                setUserData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [username]);

    return (
        <div>
            <h1>User Profile</h1>
            <p>Username: {username}</p>
            {userData && (
                <div>
                    <p>User ID: {userData.id}</p>
                    <p>Email: {userData.email}</p>
                    {/* 他のユーザーデータを表示 */}
                </div>
            )}
        </div>
    )


}