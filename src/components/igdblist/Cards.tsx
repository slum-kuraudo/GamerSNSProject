"use client";
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid2 from '@mui/material/Grid2';






export default function GameCard() {

  const [name, setName] = useState();
  const [image, setImage] = useState();

  async function fetchGameTitle() {
    const response = await fetch('/api/game', { method: 'POST' })
    const data = await response.json();
    console.log(data);
    setName(data[0].name);
    setImage(data[0].cover.url);
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 15, width: '100%', ml: 'auto', mr: 'auto', backgroundColor: 'aqua' }}>
        {/* <SearchField /> */}
        <Grid2 container spacing={5}>
          <Grid2 size="auto">
            <Card sx={{ maxWidth: 235, }}>
              <CardMedia
              sx={{ height: 330, width:235 }}
                image={image}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {name}
                </Typography>
                {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  ジャンルを書く
                </Typography> */}

              </CardContent>
              <CardActions>
                <Button size="small" onClick={fetchGameTitle}>fetch</Button>
                <Button size="small">Share</Button>
                <Button size="small">twitch</Button>
              </CardActions>
            </Card>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
