"use client";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import SearchField from '../appbar/SearchField';


export default function GameCard() {
  return (
    <>
        <Container maxWidth="xl" sx={{ mt: 15, width: '100%', ml: 'auto', mr:'auto', backgroundColor:'aqua'}}>
          {/* <SearchField /> */}
          <Grid2 container spacing={5}>
            <Grid2 size="auto">
              <Card sx={{ maxWidth: 345, }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid2>
          </Grid2>
        </Container>
    </>
  );
}
