"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Linkbar from "@/components/appbar/LinkBar";
import Axios from "axios";
import Image from "next/image";

interface Game {
    id: string;
    name: string;
    cover: {
        url: string;
    };
    game_localizations: {
        name: string;
        region: number;
    }
}


export default function game() {

    const [gameId, setGameId] = useState(0);
    const [gameInfo, setGameInfo] = useState<Game[]>([]);
    const params = useParams();


    const fetchData = useCallback(() => {
        
        let requestBody = `fields name,cover.url,game_localizations.name,game_localizations.region; where id = ${params.slug};`
        console.log(requestBody);
        Axios.post('/api/igdb', { body: requestBody })
            .then((res) => {
                console.log(res.data);
                setGameInfo(res.data)
            })
    }, [])


    useEffect(() => {
        let ignore = false;
        async function startFetch() {
            if (!ignore) {
                fetchData();
            }
        }
        startFetch();
        return () => { ignore = true; }
    }, [])

    return (
        <div>
            <Linkbar />
            <h1>info.tsxだよー</h1>
            {gameInfo.map((Game) =>
                <div key={Game.id}>
                    <Image
                        src={"https:" + Game.cover.url}
                        alt={"sample"}
                        sizes='100vw'
                        style={{
                            width: '20%', height: '20%'
                        }}
                        width={500}
                        height={300} />
                    <h2>{Game.name}</h2>
                </div>
            )}

        </div>
    )

}