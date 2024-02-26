'use client';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { List, Grid, Link, Skeleton, Box } from '@mui/material';
import PotentialJobListItem from '@/components/layout/potential-jobs/admin/list-item';

import { getPendingPotentialJobs } from '@/db/queries/potential-jobs';

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
    const [potentialJobs, setPotentialJobs] = useState<Item[]>([]);

    useEffect(() => {
        getPendingPotentialJobs().then((data: any) => {
            setPotentialJobs(data);
            setLoading(false);
        });
    }, []);

    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={6}>
                    <Typography component="h1" variant="h5" align="center" sx={{ py: 1 }}>
                        Pending Potential Jobs
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
                        <>
                            <Skeleton animation="wave" width={'100%'} height={90} />
                            <Skeleton animation="wave" width={'100%'} height={90} />
                            <Skeleton animation="wave" width={'100%'} height={90} />
                            <Skeleton animation="wave" width={'100%'} height={90} />
                            <Skeleton animation="wave" width={'100%'} height={90} />
                            <Skeleton animation="wave" width={'100%'} height={90} />
                        </>
                    )}
                    {potentialJobs.length === 0 && (
                        <Typography variant="h6" align="center" sx={{ p: 3 }}>
                            No potential jobs found.
                        </Typography>
                    )}
                    {potentialJobs.length > 0 && potentialJobs.map((item) => (
                        <PotentialJobListItem key={item.id} {...item} />
                    ))}
                </List>
            </Box>
        </>
    );
};

export default PotentialJobList;
