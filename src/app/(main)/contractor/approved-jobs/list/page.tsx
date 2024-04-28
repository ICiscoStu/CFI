'use client';
import { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Grid, Link, Box, Divider, Typography, Button } from '@mui/material';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { getApprovedJobs } from '@/db/queries/approved-jobs';
import { redirect, useRouter } from 'next/navigation';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LoadingButton from '@mui/lab/LoadingButton';

import { SelectChangeEvent } from '@mui/material/Select';


import { getMobileFactories } from '@/db/queries/mobile-factories';
import { getFieldUsersByContractor } from '@/db/queries/users';
import { ActivateJob } from '@/actions/active-jobs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

interface Item {
    createdAt: Date;
    updatedAt: Date;
    id: number;
    createdById: string;
    status: string;
    ActiveAt: string | null;
    vaultNumber: string;
    owner: string;
    city: string;
    state: string;
    vaultWidth: number;
    vaultHeight: number;
    vaultLength: number;
}

const ApprovedJobList = () => {


    const router = useRouter();
    const handleDispatch = (e: any) => {
        setSubmitting(true);
        const pStartDate = possibleStartDate!.isSame(cachedPossibleStartDate) ? null : possibleStartDate;
        const date = pStartDate!.format('YYYY-MM-DD HH:mm:ss.SSSSSSS');
        ActivateJob(currentItem.id, selectedMobileFactory, selectedFieldUser, date).then(() => {
            setSubmitting(false);
            setOpen(false);
            router.push('/contractor/approved-jobs/list');

        }).catch((error) => {
            console.error(error);
            setSubmitting(false);
        });
    }

    const [approvedJobs, setApprovedJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<any | null>(null);

    const [selectedMobileFactory, setSelectedMobileFactory] = useState<string>('');
    const [mobileFactories, setMobileFactories] = useState<IMobileFactory[]>([]);
    const [fieldUsers, setFieldUsers] = useState<any[]>([]);
    const [selectedFieldUser, setSelectedFieldUser] = useState<string>('');
    const [submitting, setSubmitting] = useState(false);

    const [possibleStartDate, setPossibleStartDate] = useState<moment.Moment | null>(null);
    const [cachedPossibleStartDate, setCachedPossibleStartDate] = useState<moment.Moment | null>(null);

    useEffect(() => {
        setLoading(true);
        getApprovedJobs().then((data: any) => {
            setApprovedJobs(data);
            setLoading(false);
        });

    }, []);

    useEffect(() => {

        if (open) {
            // Load data for dialog
            getMobileFactories().then((data: any) => {
                setMobileFactories(data);
            });
            getFieldUsersByContractor().then((data: any) => {
                setFieldUsers(data);
            });
        }

    }, [open]);


    const handleClickOpen = (item: any) => {
        setCurrentItem(item);
        setPossibleStartDate(moment(item.jobDetails.possibleStartDate));
        setCachedPossibleStartDate(moment(item.jobDetails.possibleStartDate));
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedMobileFactory(event.target.value);
    }

    const handleFieldChange = (event: SelectChangeEvent) => {
        setSelectedFieldUser(event.target.value);
    }

    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={6}>
                    <Typography component="h2" variant="h5" align="left">
                        Approved Jobs
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
                            {approvedJobs.length === 0 && (
                                <Typography variant="h6" align="center" sx={{ p: 3 }}>
                                    No Approved Jobs Found.
                                </Typography>
                            )}
                            {approvedJobs.length > 0 && approvedJobs.map((item) => (
                                <ListItem key={item.id}>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item xs={10}>
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
                                        <Grid item xs={2}>
                                            <ListItemSecondaryAction>
                                                <IconButton onClick={() => handleClickOpen(item)}>
                                                    <AssignmentTurnedInIcon />
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
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {"Submit for Dispatch"}
                </DialogTitle>
                <DialogContent>
                    {currentItem && (
                        <>
                            <Grid container spacing={1} >
                                <Grid item xs={4}>
                                    <Typography variant="h6" textAlign={"left"}>Vault Number: </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="body1">{currentItem.jobDetails.vaultNumber}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h6" textAlign={"left"}>Owner: </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="body1">{currentItem.jobDetails.owner}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h6" textAlign={"left"}>Location: </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="body1">City: {currentItem.jobDetails.city}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="body1">State: {currentItem.jobDetails.state}</Typography>
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
                                        <Typography variant="body1">Vault Width: {currentItem.jobDetails.vaultWidthFt}Ft {currentItem.jobDetails.vaultWidthIn}In</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">Vault Length: {currentItem.jobDetails.vaultLengthFt}Ft {currentItem.jobDetails.vaultLengthIn}In</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">Vault Height: {currentItem.jobDetails.vaultHeightFt}Ft {currentItem.jobDetails.vaultHeightIn}In </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">Wall SqFt: {currentItem.jobDetails.wallSqFt} SqFt</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">Ceiling SqFt: {currentItem.jobDetails.ceilingSqFt} SqFt</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">Total SqFt: {currentItem.jobDetails.totalSqFt} SqFt</Typography>
                                    </Grid>
                                </Grid >
                            </Grid >
                        </>
                    )}
                    <Divider sx={{
                        m: 2
                    }} />
                    <Grid item xs={12}>
                        <Typography variant="h6" textAlign={"left"}>Mobile Factory Selection:</Typography>
                    </Grid>
                    <Box sx={{ py: 1 }}>
                        {mobileFactories && (
                            <>
                                <FormControl fullWidth>
                                    <InputLabel id="mobile-factory-select-label">Mobile Factory</InputLabel>
                                    <Select
                                        labelId="mobile-factory-select-label"
                                        id="mobile-factory-select"
                                        value={selectedMobileFactory?.toString() || ''}
                                        label="Mobile Factory"
                                        onChange={handleChange}
                                        fullWidth
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {mobileFactories.map((item: any) => (
                                            <MenuItem key={item.id} value={item.tpId}>
                                                {item.name} | {item.plateNumber}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </>
                        )}
                    </Box>
                    <Grid item xs={12}>
                        <Typography variant="h6" textAlign={"left"}>Field Officer Selection:</Typography>
                    </Grid>
                    <Box sx={{ py: 1 }}>
                        {fieldUsers && (
                            <>
                                <FormControl fullWidth>
                                    <InputLabel id="mobile-factory-select-label">Field Officer</InputLabel>
                                    <Select
                                        labelId="mobile-factory-select-label"
                                        id="mobile-factory-select"
                                        value={selectedFieldUser?.toString() || ''}
                                        label="Field Officer"
                                        onChange={handleFieldChange}
                                        fullWidth
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {fieldUsers.map((item: any) => (
                                            <MenuItem key={item.id} value={item.User.id}>
                                                {item.User.fullName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </>
                        )}
                    </Box>
                    <Grid item xs={12}>
                        <Typography variant="h6" align="left">
                            Possible Start Date
                        </Typography>
                    </Grid>
                    <Box sx={{ py: 1 }}>
                        <DatePicker
                            sx={{ width: '100%' }}
                            value={possibleStartDate}
                            onChange={(newValue) => setPossibleStartDate(newValue)}
                            disablePast={true}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='error'>Cancel</Button>
                    <LoadingButton
                        size="large"
                        onClick={handleDispatch}
                        loading={submitting}
                        loadingIndicator="..."
                        variant="contained"
                        disabled={!selectedMobileFactory || !selectedFieldUser}
                    >
                        <span>Submit</span>
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ApprovedJobList;
