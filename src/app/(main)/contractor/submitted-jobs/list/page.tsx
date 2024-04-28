'use client';
import { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Chip, Grid, Link, Box, Divider, Typography } from '@mui/material';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';

import { getSubmittedJobs } from '@/db/queries/submitted-jobs';
import moment from 'moment';

const SubmittedJobList = () => {


    const handleResubmit = (id: number) => {
        // Handle resubmit action
    };

    const [submittedJobs, setSubmittedJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        getSubmittedJobs().then((data: any) => {
            setSubmittedJobs(data);
            setLoading(false);
        });
    }, []);

    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={7}>
                    <Typography component="h1" variant="h5" align="left">
                        Pending Approval Jobs
                    </Typography>
                </Grid>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={2} sx={{ textAlign: 'right', pr: 2 }}>
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
                                    No Submitted Jobs Found.
                                </Typography>
                            )}
                            {submittedJobs.length > 0 && submittedJobs.map((item) => (
                                <ListItem key={item.id}>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item xs={7}>
                                            <ListItemText
                                                primary={`Vault Number: ${item.jobDetails.vaultNumber}`}
                                                secondary={`Possible Start Date: ${moment(item.jobDetails.possibleStartDate).format('MM/DD/YYYY')}`}
                                            />
                                            <ListItemText
                                                secondary={`Owner: ${item.jobDetails.owner}`}
                                            />
                                            <ListItemText
                                                secondary={`City: ${item.jobDetails.city}, State: ${item.jobDetails.state}`}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Chip label={item.status} color={item.status === 'denied' ? 'error' : 'info'} />
                                        </Grid>
                                        {item.status === 'denied' && (
                                            <Grid item xs={2}>
                                                <ListItemSecondaryAction>
                                                    <IconButton onClick={() => handleResubmit(item.id)}>
                                                        <ContentPasteGoIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </Grid>
                                        )}
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

export default SubmittedJobList;
