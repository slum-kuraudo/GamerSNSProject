"use client";
import { use, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid2 from '@mui/material/Grid2';
import IGDBGameCard from './IGDBGameCard';

export default function GameCard() {


  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 15 }}>
        {/* <SearchField /> */}
        <Grid2 container spacing={1}>
          <IGDBGameCard />

        </Grid2>
      </Container>
    </>
  );
}
