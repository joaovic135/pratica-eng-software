import lista from "./listar"
import AppAppBar from '@/components/appAppBar'
import AppFooter from '@/components/appFooter'
import * as React from 'react';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import { Box, Grid, Paper, 
    Typography, Link, 
    Container, Toolbar, AppBar, 
    Button, CssBaseline, Card,
    CardActions, CardContent, CardMedia, 
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


export default function Index() {
    return (
        <>
            
            <CssBaseline />
            <AppAppBar></AppAppBar>
            <main>
                {/* Hero unit */}
                <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
                >
                
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {cards.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                        <CardMedia
                            component="div"
                            sx={{
                            // 16:9
                            pt: '56.25%',
                            }}
                            image="https://source.unsplash.com/random?wallpapers"
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                            Heading
                            </Typography>
                            <Typography>
                            This is a media card. You can use this section to describe the
                            content.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">View</Button>
                            <Button size="small">Edit</Button>
                        </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                </Container>
            </main> 
            <AppFooter></AppFooter>
        </>
    );
}