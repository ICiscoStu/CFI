
import { SignIn } from "@clerk/nextjs";
import Grid from "@mui/material/Grid";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function Page() {
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={12}
                sm={12}
                md={12}
                sx={{
                    backgroundImage: 'url(/assets/images/CFI_logo_color.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: "white",
                    backgroundSize: {
                        xs: 'contain',
                        sm: 'auto',
                    },
                    backgroundPosition: 'center',
                    minHeight: '15%',
                }}
            />
            <Grid 
                item 
                xs={12} 
                sm={12} 
                md={12} 
                component={Paper} 
                elevation={6} 
                sx={{
                    backgroundColor: "#242F7A",
                }} 
                square
            >
                <Box
                    sx={{
                        my: 10,
                        mx: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '75%'
                    }}
                >
                    <SignIn
                        appearance={{
                            elements: {
                                logoBox: "hidden",
                                footer: "hidden",
                                headerSubtitle: "hidden"
                            },
                            variables: {
                                colorPrimary: '#D3D112',
                                colorTextOnPrimaryBackground: "#242F7A"
                            }
                        }}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}