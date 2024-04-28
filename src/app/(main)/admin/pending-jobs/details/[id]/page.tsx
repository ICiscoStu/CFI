'use client';
import { Fragment, useEffect, useState } from 'react';
import { Divider, Grid, Typography, Link, Button, Box, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { getPendingDispatchJob } from '@/db/queries/active-jobs';
import { calculateJobRequirements } from '@/utils/math';
import { dispatchJob } from '@/actions/active-jobs';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import { getMobileFactory } from '@/db/queries/mobile-factories';
import moment from 'moment';
import JobEstimates from '@/components/layout/estimates/JobEstimates';
import { getInventoryItems } from '@/db/queries/inventory-items';
import { getWarehouses } from '@/db/queries/warehouses';
import { set } from 'zod';



export default function PendingDispatchJobDetails({ params }: { params: { id: string } }) {

    const id = Number(params.id);
    const [pendingJob, setPendingJob] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [jobEstimates, setJobEstimates] = useState<any>({});
    const [mobileFactory, setMobileFactory] = useState<any>();
    const [mobileFactoryId, setMobileFactoryId] = useState<any>();

    const [open, setOpen] = useState(false);
    const [openAddInventory, setOpenAddInventory] = useState(false);

    const [inventoryItems, setInventoryItems] = useState<any[]>([]);

    const [additionalItems, setAdditionalItems] = useState<any>({
        ceilingBase: "",
        crackFill: "",
        glass: "",
        partBCeiling: "",
        partBWall: "",
        topCoat: "",
        wallBase: ""
    });

    const [itemsAdded, setItemsAdded] = useState(false);
    const [warehouses, setWarehouses] = useState<any[]>([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState<any>();
    const [selectedWarehouseName, setSelectedWarehouseName] = useState<any>();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickAddInventoryOpen = () => {
        setOpenAddInventory(true);
        getInventoryItems().then((inventoryItems: any) => {
            setInventoryItems(inventoryItems);
        });
        getWarehouses().then((warehouses: any) => {
            setWarehouses(warehouses);
        });
    };

    const handleCloseAddInventory = () => {

        if (!itemsAdded) {
            setAdditionalItems({
                ceilingBase: "",
                crackFill: "",
                glass: "",
                partBCeiling: "",
                partBWall: "",
                topCoat: "",
                wallBase: ""
            });
            setSelectedWarehouse('');
        }
        setOpenAddInventory(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getMobileFactoryQuantity = (identifier: string) => {
        if (mobileFactory && mobileFactory.mobileFactoryInventory) {
            const item = mobileFactory.mobileFactoryInventory.find((item: any) => item.inventoryItem === identifier);
            return item ? item.quantity : 0;
        }
        return 0;
    }

    useEffect(() => {
        getPendingDispatchJob(id).then((data: any) => {
            setPendingJob(data);
            setMobileFactoryId(data.MobileFactoryId);
            const estimates = calculateJobRequirements(data.wallSqFt, data.ceilingSqFt, data.totalSqFt);
            setJobEstimates(estimates);
            setLoading(false);
        });

    }, []);

    useEffect(() => {
        if (mobileFactoryId) {
            getMobileFactory(mobileFactoryId).then((data: any) => {
                setMobileFactory(data);
            });
        }
    }, [mobileFactoryId]);

    const handleDispatch = (e: any) => {
        setSubmitting(true);
        dispatchJob(id).then(() => {
            setSubmitting(false);
            setOpen(false);
        });
    }

    const handleAddAdditionalInventory = (e: any) => {
        setItemsAdded(true);
        setOpenAddInventory(false);
    }

    const handleMatchEstimates = (e: any) => {
        const newItems = { ...additionalItems };
        inventoryItems.forEach((item: any) => {
            if (item.identifier !== 'crackFill') {
                newItems[item.identifier] = jobEstimates.total[item.identifier] - getMobileFactoryQuantity(item.identifier) < 0 ? 0 : jobEstimates.total[item.identifier] - getMobileFactoryQuantity(item.identifier);
            }
        });
        setAdditionalItems(newItems);
    }

    const handleWareHouseChange = (event: any) => {
        setSelectedWarehouse(event.target.value);
        setSelectedWarehouseName(warehouses.find((item: any) => item.id === event.target.value).name);

    }

    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={8}>
                    <Typography component="h2" variant="h5" align="left">
                        Job Id: {id} {pendingJob && pendingJob.vaultNumber && (
                            <>
                                - {pendingJob.vaultNumber}
                            </>
                        )}
                    </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'right', pr: 2 }}>
                    <Link href="/admin/pending-jobs/list">
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
                        {pendingJob && (
                            <>
                                <Grid container spacing={1} >

                                    <Grid item xs={4}>
                                        <Typography variant="body1" textAlign={"left"}> <strong>Possible Start Date: </strong></Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Typography variant="body1" >{moment(pendingJob.possibleStartDate).format('MM/DD/YYYY')}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="body1" textAlign={"left"}> <strong>Vault Number:</strong> </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body1">{pendingJob.vaultNumber}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="body1" textAlign={"left"}><strong>Owner:</strong> </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body1">{pendingJob.owner}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="body1" textAlign={"left"}> <strong>Location:</strong> </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="body1">City: {pendingJob.city}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant="body1">State: {pendingJob.state}</Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{
                                    m: 2
                                }} />
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="body1" textAlign={"left"}> <strong>Vault Number:</strong> </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={4}>
                                                <Typography variant="body1">Vault Width: {pendingJob.vaultWidthFt}Ft {pendingJob.vaultWidthIn}In</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography variant="body1">Vault Length: {pendingJob.vaultLengthFt}Ft {pendingJob.vaultLengthIn}In</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography variant="body1">Vault Height: {pendingJob.vaultHeightFt}Ft {pendingJob.vaultHeightIn}In </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={4}>
                                                <Typography variant="body1">Wall SqFt: {pendingJob.wallSqFt} </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography variant="body1">Ceiling SqFt: {pendingJob.ceilingSqFt} </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography variant="body1">Total SqFt: {pendingJob.totalSqFt} </Typography>
                                            </Grid>
                                        </Grid >
                                    </Grid>
                                </Grid >
                                {itemsAdded && (
                                    <>
                                        <Divider sx={{
                                            my: 2
                                        }} />
                                        <Grid container spacing={0} sx={{color: 'red'}}>
                                            <Grid item xs={12} sx={{ pb: 1 }}>
                                                <Typography variant="body1" textAlign={"left"}> <strong>Pick Up Additional Inventory</strong> </Typography>
                                            </Grid>
                                            <Grid container spacing={0}>
                                                <Grid item xs={3}>
                                                    <Grid item xs={12}>
                                                        <Typography variant="body2" textAlign="left" sx={{ color: "white" }}>**</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="body2" textAlign="left" >{selectedWarehouseName}</Typography>
                                                    </Grid>
                                                    <Divider sx={{
                                                        mb: 1
                                                    }} />
                                                    <Grid item xs={12}>
                                                        <Typography variant="caption" textAlign="center" sx={{ color: "white" }}>Items</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Grid container spacing={0}>
                                                            <Grid item xs={6}>
                                                                <Typography variant="caption" textAlign="center">Crack Fill: </Typography>
                                                            </Grid>
                                                            <Grid item xs={6} textAlign={'center'}>
                                                                <Typography variant="caption" textAlign="right" fontSize={'1rem'}> {additionalItems.crackFill || 0}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="center">Wall </Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="center">Ceiling </Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="center">Glass</Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="center">Top</Typography>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Typography variant="body2" textAlign="center">Part B's</Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="center">Base </Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="center">Base </Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="left" sx={{ color: "white" }}>**</Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="center">Coat</Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="center">Wall</Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="center">Ceiling</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Divider sx={{
                                                        mb: 1
                                                    }} />
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body1" textAlign="center">{additionalItems!.wallBase} </Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body1" textAlign="center">{additionalItems!.ceilingBase} </Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body1" textAlign="center">{additionalItems!.glass}</Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body1" textAlign="center">{additionalItems!.topCoat}</Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body1" textAlign="center">{additionalItems!.partBWall} </Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body1" textAlign="center">{additionalItems!.partBCeiling} </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid >
                                    </>
                                )}
                                <Divider sx={{
                                    my: 2
                                }} />
                                {!jobEstimates && (
                                    <Typography variant="h6" align="center" sx={{ p: 3 }}>
                                        Loading...
                                    </Typography>
                                )}
                                {jobEstimates && (
                                    <JobEstimates jobEstimates={jobEstimates} />
                                )}
                                <Divider sx={{
                                    my: 2
                                }} />
                                {mobileFactory && (
                                    <>
                                        <Grid container spacing={0}>
                                            <Grid item xs={12} sx={{ pb: 1 }}>
                                                <Typography variant="body1" textAlign={"left"}> <strong>Current Inventory:</strong> </Typography>
                                            </Grid>
                                            <Grid container spacing={0}>
                                                <Grid item xs={3}>
                                                    <Grid item xs={12}>
                                                        <Typography variant="body2" textAlign="left" >{mobileFactory.name}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="body2" textAlign="left" >{mobileFactory.tpId}</Typography>
                                                    </Grid>
                                                    <Divider sx={{
                                                        mb: 1
                                                    }} />
                                                    <Grid item xs={12}>
                                                        <Typography variant="caption" textAlign="center" sx={{ color: "white" }}>Items</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Grid container spacing={0}>
                                                            <Grid item xs={6}>
                                                                <Typography variant="caption" textAlign="center">Crack Fill: </Typography>
                                                            </Grid>
                                                            <Grid item xs={6} textAlign={'center'}>
                                                                {mobileFactory.mobileFactoryInventory.map((item: any, index: number) => (
                                                                    <div key={index}>
                                                                        {item.inventoryItem === 'crackFill' && (
                                                                            <Typography variant="caption" textAlign="right" fontSize={'1rem'}> {item.quantity}</Typography>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="center">Wall </Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="center">Ceiling </Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="center">Glass</Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="center">Top</Typography>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Typography variant="body2" textAlign="center">Part B's</Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="center">Base </Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="center">Base </Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="left" sx={{ color: "white" }}>**</Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="center">Coat</Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="center">Wall</Typography>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Typography variant="body2" textAlign="center">Ceiling</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Divider sx={{
                                                        mb: 1
                                                    }} />
                                                    <Grid container spacing={0}>
                                                        {mobileFactory.mobileFactoryInventory.map((item: any, index: number) => (
                                                            <Fragment key={index}>
                                                                {item.inventoryItem !== 'crackFill' && (
                                                                    <Grid item xs={2}>
                                                                        <Typography variant="body1" textAlign="center" key={index}>{item.quantity}</Typography>
                                                                    </Grid>
                                                                )}
                                                            </Fragment>
                                                        ))}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid >
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </Box>
            <Divider sx={{
                my: 2
            }} />
            <Grid item xs={12} sx={{ mt: 2 }}>
                <Grid container spacing={0}>
                    <Grid item xs={5} md={9} textAlign={'right'}>
                        <Button
                            onClick={handleClickOpen}
                            disabled={true}
                            variant="contained"
                            color='success'
                            
                        >
                            Export
                        </Button>
                    </Grid>
                    <Grid item xs={4} md={2} textAlign={'right'}>
                        <Button
                            onClick={handleClickAddInventoryOpen}
                            disabled={openAddInventory}
                            variant="contained"
                        >
                            {itemsAdded ? 'Edit' : 'Add '} Inventory
                        </Button>
                    </Grid>
                    <Grid item xs={3} md={1} textAlign={'right'}>
                        <Button
                            onClick={handleClickOpen}
                            disabled={open}
                            variant="contained"
                            color="error"
                        >
                            Dispatch
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
                    {"Dispatch"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to dispatch this Job? <br />
                        (this process cannot be reversed).
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='error'>Cancel</Button>
                    <LoadingButton
                        size="large"
                        onClick={handleDispatch}
                        loading={submitting}
                        loadingIndicator="..."
                        variant="contained"
                    >
                        <span>Dispatch</span>
                    </LoadingButton>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openAddInventory}
                onClose={handleCloseAddInventory}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Add inventory for pickup"}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={0} rowSpacing={1} justifyContent={'center'} alignItems={'center'}>
                        <Grid item xs={3} >
                            <Typography variant="body1" textAlign="center"> Item</Typography>
                        </Grid>
                        <Grid item xs={3} >
                            <Typography variant="body1" textAlign="center"> Estimated</Typography>
                        </Grid>
                        <Grid item xs={3} >
                            <Typography variant="body1" textAlign="center"> In Mobile Factory</Typography>
                        </Grid>
                        <Grid item xs={3} >
                            <Typography variant="body1" textAlign="center"> Additional</Typography>
                        </Grid>
                        {inventoryItems && inventoryItems.map((item: any, index: number) => (
                            <Fragment key={index}>
                                <Grid item xs={3} >
                                    <Typography variant="body1" textAlign="center"> {item.name}</Typography>
                                </Grid>
                                <Grid item xs={3} >
                                    <Typography variant="body1" textAlign="center"> {item.identifier === 'crackFill' ? 'N/A' : jobEstimates.total[item.identifier]}</Typography>
                                </Grid>
                                <Grid item xs={3} >
                                    <Typography variant="body1" textAlign="center">{getMobileFactoryQuantity(item.identifier)}</Typography>
                                </Grid>
                                <Grid item xs={3} >
                                    <TextField
                                        id="outlined-basic"
                                        label="quantity"
                                        variant="outlined"
                                        value={additionalItems[item.identifier]}
                                        onChange={(e) => {
                                            setAdditionalItems({
                                                ...additionalItems,
                                                [item.identifier]: e.target.value
                                            });
                                        }}
                                    />
                                </Grid>
                            </Fragment>
                        ))}
                    </Grid>
                    <Grid item xs={12} textAlign={'center'} sx={{ pt: 2 }}>
                        <Button
                            onClick={handleMatchEstimates}
                            variant="contained"
                            color='success'
                        >
                            Match Estimates
                        </Button>
                    </Grid>
                    <Divider sx={{
                        my: 2
                    }} />
                    <Grid item xs={12}>
                        <Typography variant="h6" textAlign={"left"}>Warehouse Pickup:</Typography>
                    </Grid>
                    <Box sx={{ py: 2 }}>
                        {warehouses && (
                            <>
                                <FormControl fullWidth>
                                    <InputLabel id="warehouse-select-label">Warehouse</InputLabel>
                                    <Select
                                        labelId="warehouse-select-label"
                                        id="warehouse-select"
                                        value={selectedWarehouse?.toString() || ''}
                                        label="Select Warehouse"
                                        onChange={handleWareHouseChange}
                                        fullWidth
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {warehouses.map((item: any) => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddInventory} color='error'>Cancel</Button>
                    <LoadingButton
                        size="large"
                        onClick={handleAddAdditionalInventory}
                        loading={submitting}
                        loadingIndicator="..."
                        variant="contained"
                        disabled={!additionalItems || !selectedWarehouse}
                    >
                        <span>Add Inventory</span>
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
};
