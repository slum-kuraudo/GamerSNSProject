"use client";

import ProfileInfo from "@/components/Profile/info";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Linkbar from "@/components/appbar/LinkBar";


export default function game() {

    const [gameId, setGameId] = useState(0);
    const params = useParams();

    useEffect(() => {
        if (params.slug) {
            setGameId(Number(params.slug));
        }
    }, [params.slug])

    return(
        <div>
            <Linkbar/>
            <ProfileInfo gameId={gameId}/>
        </div>
    )

}