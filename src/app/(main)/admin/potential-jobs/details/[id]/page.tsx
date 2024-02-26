'use client';
import { useEffect, useState } from 'react';
import { Divider, Grid, Typography, Link, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { getMobileFactories, getPotentialJob, getMobileFactoryInventory } from '@/db/queries/potential-jobs';
import { createPurchaseOrder } from '@/actions/active-jobs';

export default function PotentialJobDetails({ params }: { params: { id: string } }) {

    const id = Number(params.id);
    const [data, setData] = useState({
        vaultNumber: '',
        city: '',
        owner: '',
        state: '',
        vaultHeight: '',
        vaultWidth: '',
        vaultLength: '',
        wallSqFt: '',
        ceilingSqFt: '',
        totalSqFt: '',
        createdBy: {
            fullName: '',
            userName: ''
        }
    });
    const [selectedMobileFactory, setSelectedMobileFactory] = useState<number>();
    const [mobileFactories, setMobileFactories] = useState<IMobileFactory[]>([]);
    const [mobileFactoryInventory, setMobileFactoryInventory] = useState<any>([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        getPotentialJob(id).then((data: any) => {
            setData(data);
        });

        getMobileFactories().then((data: IMobileFactory[]) => {
            setMobileFactories(data);
        });

    }, []);

    useEffect(() => {
        if (selectedMobileFactory && selectedMobileFactory != 0) {
            getMobileFactoryInventory(selectedMobileFactory).then((data: any) => {
                setMobileFactoryInventory(data);
                setDataLoaded(true);
            });
        } else {
            setMobileFactoryInventory([]);
            setDataLoaded(false);
        }
    }, [selectedMobileFactory]);

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedMobileFactory(parseInt(event.target.value));
    }

    const handleApprove = (e: any) => {
    }

    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={8}>
                    <Typography component="h2" variant="h5" align="left">
                        Potential Job Submission: {id}
                    </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'right', pr: 2 }}>
                    <Link href="/admin/potential-jobs/list">
                        Back
                    </Link>
                </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ height: '530px', overflow: 'hidden', overflowY: 'scroll' }}>
                <Grid container spacing={1} >
                    <Grid item xs={4}>
                        <Typography variant="h6" textAlign={"left"}>Submitter: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="body1">{data.createdBy.fullName} ({data.createdBy.userName})</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6" textAlign={"left"}>Vault Number: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="body1">{data.vaultNumber}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6" textAlign={"left"}>Owner: </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="body1">{data.owner}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6" textAlign={"left"}>Location: </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">City: {data.city}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">State: {data.state}</Typography>
                    </Grid>
                </Grid>
                <Divider sx={{
                    m: 2
                }} />
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h6" textAlign={"left"}>Vault Dimensions:</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">Vault Height: {data.vaultHeight}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">Vault Width: {data.vaultWidth}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">Vault Length: {data.vaultLength}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">Wall Sq Footage</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">Ceiling Sq Footage</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">Total Sq Footage</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">{data.wallSqFt}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">{data.ceilingSqFt}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">{data.totalSqFt}</Typography>
                    </Grid>
                </Grid >
                <Divider sx={{
                    m: 2
                }} />
                <Grid item xs={12}>
                    <Typography variant="h6" textAlign={"left"}>Approval Information:</Typography>
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
                                    <MenuItem value={0}>
                                        <em>None</em>
                                    </MenuItem>
                                    {mobileFactories.map((item: any) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.name} | {item.plateNumber}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {mobileFactoryInventory && dataLoaded && (
                                <>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">Mobile Factory Current Inventory:</Typography>
                                    </Grid>
                                    {mobileFactoryInventory.map((item: any) => (
                                        <Grid container key={item.id} spacing={1}>
                                            <Grid item xs={6}>
                                                <Typography variant="body1">{item.inventoryItem}: </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="body1">{item.quantity}</Typography>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </Box>
            </Box>
            <Divider sx={{
                m: 2
            }} />
            <Grid item xs={12} sx={{ mt: 2 }}>
                <Grid container spacing={1} justifyContent={'end'}>
                    <Grid item xs={3}>
                        <Button variant="text" color="error" href="/admin/potential-jobs/list" fullWidth>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" fullWidth disabled={!selectedMobileFactory} onClick={handleApprove}>
                            Approve Job
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
