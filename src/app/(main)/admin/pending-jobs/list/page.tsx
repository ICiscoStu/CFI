'use client';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { List, Grid, Link, Box, ListItem, ListItemText, ListItemSecondaryAction, IconButton, } from '@mui/material';

import { getPendingDispatchJobs } from '@/db/queries/active-jobs';

import AssignmentIcon from '@mui/icons-material/Assignment';
import CancelIcon from '@mui/icons-material/Cancel';
import moment from 'moment';

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
    createdBy: {
        fullName: string
        userName: string
    };
}

const PotentialJobList = () => {

    const [loading, setLoading] = useState(true);
    const [pendingJobs, setPendingJobs] = useState<any[]>([]);

    useEffect(() => {
        getPendingDispatchJobs().then((data: any) => {
            setPendingJobs(data);
            setLoading(false);
        });
    }, []);

    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={8}>
                    <Typography component="h1" variant="h5" align="left">
                        Pending Jobs for Dispatch
                    </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'right', pr: 2 }}>
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
                            {pendingJobs.length === 0 && (
                                <Typography variant="h6" align="center" sx={{ p: 3 }}>
                                    No Pending jobs found.
                                </Typography>
                            )}
                            {pendingJobs.length > 0 && pendingJobs.map((item) => (
                                <ListItem key={item.id}>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item xs={10}>
                                            <ListItemText
                                                primary={`Vault Number: ${item.jobDetails.vaultNumber}`}
                                                sx={{ py: 0, my: 0}}
                                                                                                                    />
                                            <ListItemText
                                                primary={`Mobile Factory: ${item.mobileFactoryId}`}
                                                secondary={`Possible Start Date: ${moment(item.jobDetails.possibleStartDate).format('MM/DD/YYYY')}`}
                                                sx={{ py: 0, my: 0}}
                                            />
                                            <ListItemText
                                                secondary={`Vault Number: ${item.jobDetails.vaultNumber}, Owner: ${item.jobDetails.owner}`}
                                                sx={{ py: 0, my: 0}}
                                            />
                                            <ListItemText
                                                secondary={`${item.jobDetails.city}, ${item.jobDetails.state}`}
                                                sx={{ py: 0, my: 0}}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <ListItemSecondaryAction>
                                                <IconButton href={`/admin/pending-jobs/details/${item.id}`}>
                                                    <AssignmentIcon />
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
