'use client';
import { 
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton, 
    Grid,
    Link,
    Box,
    Divider,
    Typography,
    Button
} from '@mui/material';
import { useEffect, useState } from 'react';
import IconCancel from '@/components/icon/icon-cancel';
import { getMobileFactoryList } from '@/actions/settings/mobile-factories';


interface IMobileFactoryProps {
    createdAt: Date;
    id: number;
    name: string;
    plateNumber: string;
    warehouseId: number;
}


const MobileFactories = () => {

    const [mobileFactories, setMobileFactories] = useState<IMobileFactoryProps[]>([]);
    
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        getMobileFactoryList().then((data) => {
            setMobileFactories(data);
            setLoading(false);
        });
    }, []);


    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={6}>
                    <Typography component="h1" variant="h4" align="left">
                        Mobile Factories
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" href="/admin/settings/users/add" fullWidth>
                        Add Vehicle
                    </Button>
                </Grid>

                <Grid item xs={3} sx={{ textAlign: 'right', pr: 2 }}>
                    <Link href="/admin/settings">
                        Back
                    </Link>
                </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Box sx={{
                height: '85%',
                overflow: 'hidden',
                overflowY: 'scroll',
            }}>
                <List>
                    {loading && (
                        <Typography variant="h6" align="center" sx={{ p: 3 }}>
                            Loading...
                        </Typography>
                    )}
                    {!loading && (
                        <>
                            {mobileFactories && mobileFactories.map((item:IMobileFactoryProps) => (
                                <ListItem key={item.id}>
                                    <Grid container alignItems="center" spacing={2} >
                                        <Grid item xs={10}>
                                            <ListItemText
                                                primary={item.name}
                                                secondary={`Plate Number: ${item.plateNumber}`}
                                            />
                                            <ListItemText
                                                secondary={`Warehouse Base: ${item.warehouseId}`}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <ListItemSecondaryAction>
                                                <IconButton >
                                                    <IconCancel className="h-10 w-10 py-2"/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            ))}
                        </>
                    )}
                </List>
            </Box>
        </>
    );
};

export default MobileFactories;