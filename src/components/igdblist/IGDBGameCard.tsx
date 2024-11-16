import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import CircularProgress from '@mui/joy/CircularProgress';
import { launchTwitch } from "./launchTwitch";
import { Skeleton } from "@mui/material";
import Axios from "axios";
import { useRouter } from "next/navigation";

interface Game {
    id: string;
    name: string;
    cover: {
        url: string;
    };
    slug: string;
    game_localizations: {
        name: string;
        region: number;
    }
}

export default function IGDBGameCard() {

    const router = useRouter();

    const [games, setGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        let requestBody = "fields name,cover.url,slug,game_localizations.name,game_localizations.region; where rating > 90; limit 20;"
        await Axios.post('/api/igdb', { body: requestBody })
            .then((res) => {
                setGames(res.data);
                setIsLoading(true);
            })
    }

    useEffect(() => {
        fetchData();
    }, [])


    //https://mui.com/material-ui/react-skeleton/


    return (
        <>
            {games.map((Game) =>
                <div key={Game.id}>
                    <Card sx={{ maxWidth: 235, mt: 3 }}>
                        {isLoading ? (
                            <CardMedia
                                sx={{ height: 330, width: 235 }}
                                image={Game.cover.url}
                                title={Game.slug}
                            />) : (
                            <Skeleton variant="rectangular" width={235} height={330} />
                        )}
                        <CardContent>
                            {isLoading ? (
                                <Typography gutterBottom variant="h5" component="div"
                                    sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                >
                                    {Game.name}
                                </Typography>
                            ) : (
                                <Skeleton animation="wave" height={10} />
                            )}
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => router.push(`/game/${Game.id}`)}>ポスト</Button>
                            <Button size="small"
                                endIcon={<LaunchRoundedIcon />}
                                onClick={() => launchTwitch(Game.slug)}
                            >twitch</Button>
                        </CardActions>
                    </Card>
                </div>
            )}
        </>
    )
}
