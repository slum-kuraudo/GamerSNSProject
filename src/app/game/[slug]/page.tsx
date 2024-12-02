"use client";
import Axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface Game {
    id: string;
    name: string;
    cover: {
        image_id: string;
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

        let requestBody = `fields name,cover.url,cover.image_id,game_localizations.name,game_localizations.region; where id = ${params.slug};`
        Axios.post('/api/igdb', { body: requestBody })
            .then((res) => {
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

    "//images.igdb.com/igdb/image/upload/t_thumb/co4xgh.jpg"
    return (
        <div>
            <h1>info.tsxだよー</h1>
            {gameInfo.map((Game) =>
                <div key={Game.id}>
                    <Image
                        src={"https://images.igdb.com/igdb/image/upload/t_1080p/" + Game.cover.image_id + ".jpg"}
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