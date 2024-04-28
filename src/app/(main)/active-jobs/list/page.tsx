'use client';
import { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Chip, Grid, Link, Box, Divider, Typography } from '@mui/material';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';

import { getPotentialJobsCountByUser } from '@/db/queries/potential-jobs';
import { getActiveJobsByUser } from '@/db/queries/active-jobs-old';

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


    const handleInventory = (item: Item) => {
        // Handle inventory action
        console.log(item);
    }

    const handleEdit = (item: Item) => {
        // Handle edit action
        console.log(item);
    };

    const handleDelete = (item: Item) => {
        // Handle delete action
    };

    const handleView = (item: Item) => {
        // Handle view action
    };

    const [activeJobs, setActiveJobs] = useState<any[]>([]);
    const [pendingJobs, setPendingJobs] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        setLoading(true);
        getPotentialJobsCountByUser().then((data: any) => {
            setPendingJobs(data);
        });

        getActiveJobsByUser().then((data: any) => {
            setActiveJobs(data);
            setLoading(false);
        });

    }, []);

    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={6}>
                    <Typography component="h1" variant="h4" align="left">
                        Active Jobs
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Chip label={`Pending jobs: ${pendingJobs}`} color={pendingJobs === 0 ? 'success' : 'warning'} />
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
                            {activeJobs.length === 0 && (
                                <Typography variant="h6" align="center" sx={{ p: 3 }}>
                                    No Active Jobs Found.
                                </Typography>
                            )}
                            {activeJobs.length > 0 && activeJobs.map((item) => (
                                <ListItem key={item.id}>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item xs={5}>
                                            <ListItemText
                                                primary={`Vault Number: ${item.potentialJob.vaultNumber}`}
                                                secondary={`Owner: ${item.potentialJob.owner}`}
                                            />
                                            <ListItemText
                                                secondary={`City: ${item.potentialJob.city}, State: ${item.potentialJob.state}`}
                                            />
                                        </Grid>

                                        <Grid item xs={2}>
                                            <ListItemSecondaryAction>
                                                <IconButton href={`/active-jobs/details/${item.id}`}>
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
