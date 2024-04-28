'use client';
import { useEffect, useState } from 'react';
import { Divider, Grid, Typography, Link, Button, Box } from '@mui/material';
import { getPotentialJob } from '@/db/queries/potential-jobs';
import { SubmitPotentialJob, updatePossibleStartDate } from '@/actions/contractor/potential-jobs';
import LoadingButton from '@mui/lab/LoadingButton';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

interface PotentialJob {
    vaultNumber: string;
    city: string;
    owner: string;
    state: string;
    vaultHeightFt: number;
    vaultWidthFt: number;
    vaultLengthFt: number;
    vaultHeightIn: number;
    vaultWidthIn: number;
    vaultLengthIn: number;
    wallSqFt: number;
    ceilingSqFt: number;
    totalSqFt: number;
    possibleStartDate: moment.Moment;
    createdBy: {
        id: string;
        fullName: string;
        userName: string;
    }
}
export default function PotentialJobDetails({ params }: { params: { id: string } }) {

    const id = Number(params.id);
    const [potentialJob, setPotentialJob] = useState<PotentialJob>();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [possibleStartDate, setPossibleStartDate] = useState<moment.Moment | null>(null);
    const [cachedPossibleStartDate, setCachedPossibleStartDate] = useState<moment.Moment | null>(null);
    const [enabledUpdate, setEnabledUpdate] = useState<boolean>(false);
    const [updating, setUpdating] = useState<boolean>(false);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePossibleStartDateChange = (newDate: any) => {
        if (!newDate.isSame(cachedPossibleStartDate)) {
            setPossibleStartDate(newDate);
            setEnabledUpdate(true);
        } else {
            setEnabledUpdate(false);
        }
    }

    useEffect(() => {
        getPotentialJob(id).then((data: any) => {
            setPossibleStartDate(moment(data.possibleStartDate));
            setCachedPossibleStartDate(moment(data.possibleStartDate));
            setPotentialJob(data);
            setLoading(false);
        });

    }, []);


    const handleSubmit = (e: any) => {
        setSubmitting(true);
        if (potentialJob) {
            SubmitPotentialJob(id).then((data: any) => {
                setSubmitting(false);
                handleClose();
            });
        }
    }

    const handlePossibleStartDateUpdate = () => {
        setUpdating(true);
        setSubmitting(true);
        updatePossibleStartDate(id, moment(possibleStartDate).format('YYYY-MM-DD HH:mm:ss.SSSSSSS')).then((data: any) => {
            setSubmitting(false);
            setUpdating(false);
            setEnabledUpdate(false);
            setCachedPossibleStartDate(possibleStartDate);
        });
    }

    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={8}>
                    <Typography component="h2" variant="h5" align="left">
                        Possible Job {id} {potentialJob && (
                            <>
                                - {potentialJob?.vaultNumber}
                            </>
                        
                        )}
                    </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'right', pr: 2 }}>
                    <Link href="/contractor/potential-jobs/list">
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
                        <Grid container spacing={1} >
                            <Grid item xs={4}>
                                <Typography variant="h6" textAlign={"left"}>Submitter: </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1">{potentialJob!.createdBy.fullName} ({potentialJob!.createdBy.userName})</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" textAlign={"left"}>Vault Number: </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1">{potentialJob!.vaultNumber}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" textAlign={"left"}>Owner: </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1">{potentialJob!.owner}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" textAlign={"left"}>Location: </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">City: {potentialJob!.city}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">State: {potentialJob!.state}</Typography>
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
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" textAlign="left">Vault Width: </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">{potentialJob!.vaultWidthFt} Ft {potentialJob!.vaultWidthIn} In</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" textAlign="left">Vault Length: </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">{potentialJob!.vaultLengthFt} Ft {potentialJob!.vaultLengthIn} In</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" textAlign="left">Vault Height: </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">{potentialJob!.vaultHeightFt} Ft {potentialJob!.vaultHeightIn} In </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" textAlign="left">Wall:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">{potentialJob!.wallSqFt} SqFt</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" textAlign="left">Ceiling:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">{potentialJob!.ceilingSqFt} SqFt</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" textAlign="left">Total:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">{potentialJob!.totalSqFt} SqFt</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid >
                        <Divider sx={{
                            m: 2
                        }} />
                        <Grid item xs={12}>
                            <Typography component="h4" variant="h6" align="left">
                                Possible Start Date
                            </Typography>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={9}>
                                <DatePicker
                                    sx={{ width: '100%' }}
                                    value={possibleStartDate}
                                    onChange={(newValue) => handlePossibleStartDateChange(newValue)}
                                    disablePast={true}
                                    disabled={submitting || updating}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <LoadingButton
                                    size="large"
                                    onClick={handlePossibleStartDateUpdate}
                                    loading={updating}
                                    sx={{ height: '100%' }}
                                    loadingIndicator="Updating"
                                    variant="contained"
                                    disabled={!enabledUpdate}
                                >
                                    Update
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Box>
            <Divider sx={{
                m: 2
            }} />
            <Grid item xs={12} sx={{ mt: 2 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} textAlign={'right'}>
                        <Button onClick={handleClickOpen} autoFocus variant="contained" disabled={submitting}>
                            Submit Job for Approval
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
                    {"Submit Job For Approval"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to submit this job for approval? <br />
                        (this process cannot be reversed).
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton
                        size="large"
                        onClick={handleSubmit}
                        loading={submitting}
                        loadingIndicator="..."
                        variant="contained"
                    >
                        <span>Submit </span>
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
};
