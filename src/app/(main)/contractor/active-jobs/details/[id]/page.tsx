'use client';
import { useEffect, useState } from 'react';
import { Divider, Grid, Typography, Link, Button, Box, Select, MenuItem, InputLabel, FormControl, TextField } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';

import { getActiveJob } from '@/db/queries/active-jobs';
import { startJob } from '@/actions/active-jobs';
import { completeJob } from '@/actions/active-jobs';
import { calculateJobRequirements } from '@/utils/math';


import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { getFieldUsersByContractor } from '@/db/queries/users';
import { set } from 'zod';
import { start } from 'repl';


export default function ActiveJobDetails({ params }: { params: { id: string } }) {

    const id = Number(params.id);
    const [ActiveJob, setActiveJob] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [users, setUsers] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<any>();
    const [selectedItemQty, setSelectedItemQty] = useState<any>();
    const [jobRequirements, setJobRequirements] = useState<any>();
    const [additionalItems, setAdditionalItems] = useState<any[]>([]);
    const [startedJobdetails, setStartedJobDetails] = useState<any>();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        getFieldUsersByContractor().then((data: any) => {
            setUsers(data);
        });

    };

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedItem(event.target.value);
    }

    const handleClose = () => {
        setAdditionalItems([]);
        setSelectedItem('');
        setSelectedItemQty('');
        setOpen(false);
    };

    const handleAddItem = () => {
        setAdditionalItems([...additionalItems, { item: selectedItem, qty: selectedItemQty }])
        setSelectedItem('');
        setSelectedItemQty('');
    }

    useEffect(() => {
        getActiveJob(id).then((data: any) => {
            setActiveJob(data);
            
            setJobRequirements(calculateJobRequirements(data.wallSqFt, data.ceilingSqFt, data.totalSqFt));
            setLoading(false);
        });

    }, []);


    const handleSubmit = (e: any) => {
        setSubmitting(true);

    }

    const handleStartJob = (e: any) => {
        setSubmitting(true);
        startJob(id).then((data: any) => {
            setStartedJobDetails(data);
            
            setSubmitting(false);
        });
    }
    const handleCompleteJob = (e: any) => {
        setSubmitting(true);

    }

    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={8}>
                    <Typography component="h2" variant="h5" align="left">
                        Active Job {id}
                    </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'right', pr: 2 }}>
                    <Link href="/contractor/active-jobs/list">
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
                        {(ActiveJob.status === 'Active' || ActiveJob.status === 'Started')&& (
                            <>
                                <Grid container spacing={1} >

                                    {ActiveJob.status === 'Active' && (
                                        <>
                                            <Grid item xs={12}>
                                                <Button onClick={handleStartJob} variant="contained" color="success" fullWidth>
                                                    Start Job
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button onClick={handleClickOpen} variant="contained" color='info' fullWidth>
                                                    Inventory Pickup
                                                </Button>
                                            </Grid>
                                        </>
                                    )}
                                    {ActiveJob.status === 'Started' && (
                                        <>
                                            <Grid item xs={12}>
                                                <Typography variant="body1">Job Started: </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Button onClick={handleCompleteJob} variant="contained" color="success" fullWidth>
                                                    Complete Job
                                                </Button>
                                            </Grid>
                                        </>
                                    )}
                                </Grid>
                                <Divider sx={{
                                    m: 2
                                }} />
                            </>
                        )}
                        <Grid container spacing={1} >
                            <Grid item xs={4}>
                                <Typography variant="h6" textAlign={"left"}>Vault Number: </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1">{ActiveJob.vaultNumber}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" textAlign={"left"}>Owner: </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1">{ActiveJob.owner}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" textAlign={"left"}>Location: </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">City: {ActiveJob.city}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">State: {ActiveJob.state}</Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{
                            m: 2
                        }} />
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="h6" textAlign={"left"}>Vault Dimensions</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Vault Width: {ActiveJob.vaultWidthFt}Ft {ActiveJob.vaultWidthIn}In</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Vault Length: {ActiveJob.vaultLengthFt}Ft {ActiveJob.vaultLengthIn}In</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Vault Height: {ActiveJob.vaultHeightFt}Ft {ActiveJob.vaultHeightIn}In </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Wall SqFt: {ActiveJob.wallSqFt} SqFt</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Ceiling SqFt: {ActiveJob.ceilingSqFt} SqFt</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Total SqFt: {ActiveJob.totalSqFt} SqFt</Typography>
                                </Grid>
                            </Grid >
                        </Grid >
                        <Divider sx={{
                            m: 2
                        }} />
                        <Grid item xs={12} sx={{ pb: 2 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={3}>
                                    <Typography variant="h6" textAlign={"left"}>Inventory</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid container xs={6} sx={{ pl: 1 }}>
                                <Grid item xs={12} sx={{ pb: 2 }}>
                                    <Typography variant="body1" textAlign={"left"}>Estimated Job Requirements:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Wall Base:</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="body1">{jobRequirements.total.totalVaultWallBase}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Ceiling Base:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">{jobRequirements.total.totalCeilingBase}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Top Coat:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">{jobRequirements.total.totalTopCoat}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" >Wall Part B:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">{jobRequirements.total.totalPartBWall}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Ceiling Part B:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">{jobRequirements.total.totalPartBCeiling}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Crack Fill:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">20</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Packs of Glass:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">{jobRequirements.total.totalGlass}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container xs={6}>
                                <Grid item xs={12} sx={{ pb: 2 }}>
                                    <Typography variant="body1" textAlign={"left"}>Mobile Factory Inventory: <strong>{ActiveJob.MobileFactoryId} </strong></Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" >Wall Base A:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">10</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Ceiling Base A:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1"> 10</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Top Coat:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">2</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" >Wall B:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">1</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Ceiling B:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">1</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Crack Fill:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">2</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Packs of Glass:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">10</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Box>
            <Divider sx={{
                m: 2
            }} />
            <Grid item xs={12} sx={{ mt: 2 }}>
                <Grid container spacing={2} justifyContent={"end"}>
                    <Grid item xs={5}>
                        <Button href='/contractor/active-jobs/list' variant="contained" color='info' fullWidth>
                            OK
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {"Pickup Inventory Items"}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={1} sx={{ mt: 1 }} >
                        {additionalItems && additionalItems.map((item, index) => (
                            <Grid container spacing={0} key={index} sx={{ mb: 1 }}>
                                <Grid item xs={8}>
                                    <Typography variant="body1">{item.item}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="body1">{item.qty}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="contained">Remove</Button>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                    <Divider sx={{
                        my: 2
                    }} />
                    <Grid container spacing={1}>
                        <Grid item xs={8}>
                            <FormControl fullWidth>
                                <InputLabel id="mobile-factory-select-label">Inventory Item</InputLabel>
                                <Select
                                    labelId="mobile-factory-select-label"
                                    id="mobile-factory-select"
                                    value={selectedItem || ''}
                                    label="Select Official"
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Wall Base">
                                        <em>Wall Base</em>
                                    </MenuItem>
                                    <MenuItem value="Ceiling Base">
                                        <em>Ceiling Base</em>
                                    </MenuItem>
                                    <MenuItem value="Top Coat">
                                        <em>Top Coat</em>
                                    </MenuItem>
                                    <MenuItem value="Glass">
                                        <em>Glass</em>
                                    </MenuItem>
                                    <MenuItem value="Part B Wall">
                                        <em>Part B Wall</em>
                                    </MenuItem>
                                    <MenuItem value="Part B Ceiling">
                                        <em>Part B Ceiling</em>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl>
                                <TextField
                                    fullWidth
                                    label="Quantity"
                                    name='Quantity'
                                    value={selectedItemQty || ''}
                                    onChange={(e) => setSelectedItemQty(e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl sx={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                                <Button
                                    onClick={handleAddItem}
                                    variant="contained"
                                    fullWidth
                                    disabled={!selectedItem || !selectedItemQty}
                                >
                                    Add
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
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
