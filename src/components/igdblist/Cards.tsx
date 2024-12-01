import Container from '@mui/material/Container';
import Grid2 from '@mui/material/Grid2';
import IGDBGameCard from './IGDBGameCard';
import TagSearch from './TagSearch';
export default function GameCard() {


  return (
    <>
      <Grid2 container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 18 }} sx={{ mt: 15 }}>
        <IGDBGameCard />
      </Grid2>

    </>
  );
}
