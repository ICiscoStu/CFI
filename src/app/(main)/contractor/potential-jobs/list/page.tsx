'use client';
import { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Chip, Grid, Link, Box, Divider, Typography } from '@mui/material';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import moment from 'moment';

import { getPotentialJobs } from '@/db/queries/potential-jobs';

interface Item {
    createdAt: Date;
    updatedAt: Date;
    id: number;
    createdById: string;
    status: string;
    approvedAt: string | null;
    vaultNumber: string;
    owner: string;
    city: string;
    state: string;
    vaultWidth: number;
    vaultHeight: number;
    vaultLength: number;
}

const PotentialJobList = () => {

    const [potentialJobs, setPotentialJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        getPotentialJobs().then((data: any) => {
            setPotentialJobs(data);
            setLoading(false);
        });
    }, []);

    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={6}>
                    <Typography component="h1" variant="h4" align="left">
                        Possible Jobs
                    </Typography>
                </Grid>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'right', pr: 2 }}>
                    <Link href="/">
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
                            {potentialJobs.length === 0 && (
                                <Typography variant="h6" align="center" sx={{ p: 3 }}>
                                    No Possible Jobs Found.
                                </Typography>
                            )}
                            {potentialJobs.length > 0 && potentialJobs.map((item) => (
                                <ListItem key={item.id}>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item xs={10}>
                                            <ListItemText
                                                primary={`Vault Number: ${item.jobDetails.vaultNumber}`}
                                                secondary={`Owner: ${item.jobDetails.owner}`}
                                            />
                                            <ListItemText
                                                secondary={`Possible Start Date: ${moment(item.jobDetails.possibleStartDate).format('MM/DD/YYYY')}`}
                                            />
                                            <ListItemText
                                                secondary={`City: ${item.jobDetails.city}, State: ${item.jobDetails.state}`}
                                            />
                                        </Grid>

                                        <Grid item xs={2}>
                                            <ListItemSecondaryAction>
                                                <IconButton href={`/contractor/potential-jobs/details/${item.id}`}>
                                                    <ContentPasteGoIcon />
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

export default PotentialJobList;
