"use client"

import Axios from 'axios';
import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';

type ProfileInfoProps = {
    gameId: number;
}

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

export default function ProfileInfo({ gameId }: ProfileInfoProps) {
    const [gameInfo, setGameInfo] = useState<Game[]>([]);
    const fetchData = useCallback(() => {
        let requestBody = `fields name,cover.url,game_localizations.name,game_localizations.region; where id = ${gameId};`
        Axios.post('/api/igdb', { body: requestBody })
            .then((res) => {
                console.log(res.data);
                setGameInfo(res.data)
            })
    }, [gameId])

    useEffect(() => {
        fetchData();
    }, [gameId])
    

    return (
        <>
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
                    <h2>{3 === Game.game_localizations.region ?  Game.game_localizations.name : Game.name}</h2>
                </div>
            )}
        </>
    );
}