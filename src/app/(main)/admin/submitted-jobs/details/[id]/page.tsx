'use client';
import { useEffect, useState } from 'react';
import { Divider, Grid, Typography, Link, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { getSubmittedJob } from '@/db/queries/submitted-jobs';

import { ApproveJob } from '@/actions/cfi/submitted-jobs';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import moment from 'moment';



export default function SubmittedJobDetails({ params }: { params: { id: string } }) {

    const id = Number(params.id);
    const [submittedJob, setSubmittedJob] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getSubmittedJob(id).then((data: any) => {
            setSubmittedJob(data);
            setLoading(false);
        });

    }, []);


    const handleApprove = (e: any) => {
        setSubmitting(true);
        if (submittedJob) {
            ApproveJob(submittedJob.id).then(() => {
                setSubmitting(false);
                setOpen(false);
            });
        }
    }

    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={8}>
                    <Typography component="h2" variant="h5" align="left">
                        Submitted Job: {id} {submittedJob && (
                            <>
                                - {submittedJob.jobDetails.vaultNumber}
                            </>
                        )}
                    </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'right', pr: 2 }}>
                    <Link href="/admin/submitted-jobs/list">
                        Back
                    </Link>
                </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ height: '530px', overflow: 'hidden', overflowY: 'scroll' }}>
                {loading && (
                    <Typography variant="h6" align="center" sx={{ p: 3 }}>
                        Loading...
                    </Typography>
                )}
                {!loading && (
                    <>
                        {submittedJob && (
                            <>
                                <Grid container spacing={1} >
                                    <Grid item xs={4}>
                                        <Typography variant="h6" textAlign={"left"}>Submitter: </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body1">{submittedJob.submittedBy.fullName} ({submittedJob.submittedBy.userName})</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="h6" textAlign={"left"}>Vault Number: </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body1">{submittedJob.jobDetails.vaultNumber}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="h6" textAlign={"left"}>Owner: </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body1">{submittedJob.jobDetails.owner}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="h6" textAlign={"left"}>Location: </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="body1">City: {submittedJob.jobDetails.city}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="body1">State: {submittedJob.jobDetails.state}</Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{
                                    m: 2
                                }} />
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" textAlign={"left"}>Vault Dimensions:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid item xs={12}>
                                            <Typography variant="body1">Vault Width: {submittedJob.jobDetails.vaultWidthFt}Ft {submittedJob.jobDetails.vaultWidthIn}In</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body1">Vault Length: {submittedJob.jobDetails.vaultLengthFt}Ft {submittedJob.jobDetails.vaultLengthIn}In</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body1">Vault Height: {submittedJob.jobDetails.vaultHeightFt}Ft {submittedJob.jobDetails.vaultHeightIn}In </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid item xs={12}>
                                            <Typography variant="body1">Wall SqFt: {submittedJob.jobDetails.wallSqFt} SqFt</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body1">Ceiling SqFt: {submittedJob.jobDetails.ceilingSqFt} SqFt</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body1">Total SqFt: {submittedJob.jobDetails.totalSqFt} SqFt</Typography>
                                        </Grid>
                                    </Grid >
                                </Grid >
                                <Divider sx={{
                                    m: 2
                                }} />
                                <Grid container spacing={1}>
                                    <Grid item xs={8}>
                                        <Typography variant="h6" textAlign={"left"}>Possible Start Date: </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="h6"><strong>{moment(submittedJob.jobDetails.possibleStartDate).format('MM/DD/YYYY')}</strong></Typography>
                                    </Grid>
                                </Grid >
                            </>
                        )}
                    </>
                )}
            </Box>
            <Divider sx={{
                m: 2
            }} />
            <Grid item xs={12} sx={{ mt: 2 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} textAlign={'right'}>
                        <Button
                            onClick={handleClickOpen}
                            disabled={open}
                            variant="contained"
                        >
                            Approve Job
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Approve Job"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to approve this Job? <br />
                        (this process cannot be reversed).
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='error'>Cancel</Button>
                    <LoadingButton
                        size="large"
                        onClick={handleApprove}
                        loading={submitting}
                        loadingIndicator="..."
                        variant="contained"
                    >
                        <span>Approve</span>
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
};
