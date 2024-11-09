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

export default function IGDBGameCard() {

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [slug, setSlug] = useState("");
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/igdb', { method: 'POST' })
            const datas = await response.json();
            setLists(datas);
            setName(datas[0].name)
            console.log(datas);
            console.log(datas[0].image)
            console.log(datas[0].game_localizations[0].name);
            console.log(datas[2].game_localizations[0].name);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    if (isLoading) {
        return (
            <>
                <CircularProgress/>
            </>
        )
    } else {

        return (
            <>
                {lists.map(list =>
                    <div key={list.id}>
                        <Card sx={{ maxWidth: 235, }}>
                            <CardMedia
                                sx={{ height: 330, width: 235 }}
                                image={list.cover.url}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {list.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">ポスト</Button>
                                <Button size="small"
                                    endIcon={<LaunchRoundedIcon />}
                                    onClick={() => launchTwitch(list.slug)}
                                >twitch</Button>
                            </CardActions>
                        </Card>
                    </div>
                )}
            </>
        )
    }
}
