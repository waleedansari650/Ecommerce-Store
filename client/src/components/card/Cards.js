import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

function Cards() {
  return (
    <Grid container spacing={2}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Grid style={{margin : "3rem 0rem"}} item xs={12} sm={6} md={4} key={item}>
          <Card sx={{ maxWidth: 345 }} >
            <CardMedia
              component="img"
              height="140"
              image="https://images.unsplash.com/photo-1523199455310-87b16c0eed11?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8c2hpcnR8fHx8fHwxNzEwNzY1MjMw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Cards;
