
import Grid from "@mui/material/Grid";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { UserButton } from "@clerk/nextjs";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid item xs={12} sm={12} md={12}
                sx={{
                    backgroundImage: 'url(/assets/images/CFI_logo_color.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: "white",
                    backgroundSize: {
                        xs: 'contain',
                        sm: 'auto',
                    },
                    backgroundPosition: 'center',
                    minHeight: '10%',
                    height: '20%',
                }}
            />
            <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square sx={{
                backgroundColor: "#242F7A",
                height: '80%'
            }}
            >
                <AppBar position="relative" sx={{ backgroundColor: "#b2b2b2" }} >
                    <Toolbar>
                        <div style={{ flexGrow: 1 }}></div>
                        <UserButton
                            showName={true}
                            afterSignOutUrl="/sign-in"
                            appearance={{
                                elements:{
                                    userButtonPopoverActionButton__manageAccount: "hidden",    
                                }
                            }}
                        />
                    </Toolbar>
                </AppBar>
                <Box
                    sx={{
                        my: 10,
                        mx: 6,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '70%'
                    }}
                >
                    {children}
                </Box>
            </Grid>
        </Grid>
    );
}