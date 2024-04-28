'use client';
import PotentialJobCreateForm from '@/components/layout/potential-jobs/create-form';
import { Divider, Grid, Typography, Link } from '@mui/material';

import { createPotentialJob } from '@/actions/contractor/potential-jobs';


const PotentialJobCreate = () => {
    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={8}>
                    <Typography component="h2" variant="h5" align="left">
                        Potential Job Submission
                    </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'right', pr: 2 }}>
                    <Link href="/">
                        Back
                    </Link>
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />
            <PotentialJobCreateForm formAction={createPotentialJob} />
        </>
    );
};

export default PotentialJobCreate;
