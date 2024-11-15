"use client"

import Axios from 'axios';
import { useEffect, useCallback } from 'react';

type ProfileInfoProps = {
    gameId: number;
}

export default function ProfileInfo ({ gameId }: ProfileInfoProps) {
    const fetchData = useCallback(() => {
        let requestBody = `fields name,cover.url,game_localizations.name,game_localizations.region; where id = ${gameId};`
        Axios.post('/api/igdb', { body: requestBody })
            .then((res) => {
                console.log(res.data);
            })
    }, [gameId])

    useEffect(() => {
        fetchData();
    }, [gameId])

    return (
        <>
            <h1>info.tsxだよー</h1>
        </>
    );
}