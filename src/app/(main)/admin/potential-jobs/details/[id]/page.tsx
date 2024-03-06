'use client';
import { useEffect, useState } from 'react';
import { Divider, Grid, Typography, Link, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { getMobileFactories, getPotentialJob } from '@/db/queries/potential-jobs';
import { createPurchaseOrder } from '@/actions/active-jobs';
import LoadingButton from '@mui/lab/LoadingButton';

interface PotentialJob {
    vaultNumber: string;
    city: string;
    owner: string;
    state: string;
    vaultHeight: number;
    vaultWidth: number;
    vaultLength: number;
    vaultHeightUnit: string;
    vaultWidthUnit: string;
    vaultLengthUnit: string;
    wallSqFt: number;
    ceilingSqFt: number;
    totalSqFt: number;
    createdBy: {
        id: string;
        fullName: string;
        userName: string;
    }
}
export default function PotentialJobDetails({ params }: { params: { id: string } }) {

    const id = Number(params.id);
    const [potentialJob, setPotentialJob] = useState<PotentialJob>();
    const [selectedMobileFactory, setSelectedMobileFactory] = useState<number>(0);
    const [mobileFactories, setMobileFactories] = useState<IMobileFactory[]>([]);
    const [mobileFactoryInventory, setMobileFactoryInventory] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        getPotentialJob(id).then((data: any) => {
            setPotentialJob(data);
            setLoading(false);
        });

        getMobileFactories().then((data: IMobileFactory[]) => {
            setMobileFactories(data);
        });

    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedMobileFactory(parseInt(event.target.value));
    }

    const handleApprove = (e: any) => {
        setSubmitting(true);
        if (potentialJob) {
            createPurchaseOrder(
                potentialJob.createdBy.id,
                selectedMobileFactory,
                id,
                potentialJob.wallSqFt,
                potentialJob.ceilingSqFt,
                potentialJob.totalSqFt
            ).then((data: any) => {
                setSubmitting(false);
                console.log(data);
            });
        }
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
                {loading && (
                    <>
                        Loading...
                    </>
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
                            <Grid item xs={4}>
                                <Typography variant="body1">Vault Width: {potentialJob!.vaultWidth} {potentialJob!.vaultWidthUnit}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">Vault Length: {potentialJob!.vaultLength} {potentialJob!.vaultLengthUnit}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">Vault Height: {potentialJob!.vaultHeight} {potentialJob!.vaultHeightUnit} </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">Wall SqFt: {potentialJob!.wallSqFt} SqFt</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">Ceiling SqFt: {potentialJob!.ceilingSqFt} SqFt</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">Total SqFt: {potentialJob!.totalSqFt} SqFt</Typography>
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
                                </>
                            )}
                        </Box>
                    </>
                )}
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
                        <LoadingButton
                            size="large"
                            onClick={handleApprove}
                            loading={submitting}
                            loadingIndicator="Submitting..."
                            variant="contained"
                            disabled={!selectedMobileFactory || selectedMobileFactory === 0}
                        >
                            <span>Approve Job</span>
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
