'use client';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { List, Grid, Link, Box, ListItem, ListItemText, ListItemSecondaryAction, IconButton, } from '@mui/material';

import { getSubmittedJobs } from '@/db/queries/submitted-jobs';

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
    const [submittedJobs, setSubmittedJobs] = useState<any[]>([]);

    useEffect(() => {
        getSubmittedJobs().then((data: any) => {
            setSubmittedJobs(data);
            setLoading(false);
        });
    }, []);

    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={6}>
                    <Typography component="h1" variant="h5" align="left">
                        Submitted Jobs
                    </Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right', pr: 2 }}>
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
                            {submittedJobs.length === 0 && (
                                <Typography variant="h6" align="center" sx={{ p: 3 }}>
                                    No Submitted jobs found.
                                </Typography>
                            )}
                            {submittedJobs.length > 0 && submittedJobs.map((item) => (
                                <ListItem key={item.id}>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item xs={10}>
                                            <ListItemText
                                                primary={`Submitter: ${item.submittedBy.fullName} (${item.submittedBy?.userName})`}
                                                secondary={`Possible Start Date: ${moment(item.jobDetails.possibleStartDate).format('MM/DD/YYYY')}`}
                                            />
                                            <ListItemText
                                                secondary={`Vault Number: ${item.jobDetails.owner}`}
                                            />
                                            <ListItemText
                                                secondary={`Vault Number: ${item.jobDetails.vaultNumber}, City: ${item.jobDetails.city}, State: ${item.jobDetails.state}`}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <ListItemSecondaryAction>
                                                <IconButton href={`/admin/submitted-jobs/details/${item.id}`}>
                                                    <AssignmentIcon />
                                                </IconButton>
                                                <IconButton >
                                                    <CancelIcon />
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
