'use client';
import React, { useState, useEffect } from 'react';
import { Divider, Grid, Typography, Link, List, ListItem, ListItemText, Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { getActiveJobDetail, getBaseInventoryItems, getExtraInventoryItems } from '@/db/queries/active-jobs-old';
import ConfirmationDialog from '@/components/layout/active-jobs/add-inventory-items-dialog';
import {createPurchaseOrderInventoryCount } from '@/actions/active-jobs';

const PotentialJobDetails = ({ params }: { params: { id: string } }) => {
    const id = Number(params.id);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [activeJob, setActiveJob] = useState<IActiveJobWithMobileFactory | null>(null);
    const [baseInventoryItems, setBaseInventoryItems] = useState<any[]>([]);
    const [extraInventoryItems, setExtraInventoryItems] = useState<any[]>([]);
    const [inputs, setInputs] = useState<string[]>(new Array(16).fill(''));
    const [comments, setComments] = useState<string[]>(new Array(16).fill(''));
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [initials, setInitials] = useState('');

    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [activeJobData, baseInventoryData, extraInventoryData] = await Promise.all([
                    getActiveJobDetail(id),
                    getBaseInventoryItems(),
                    getExtraInventoryItems()
                ]);
                setActiveJob(activeJobData);
                setBaseInventoryItems(baseInventoryData);
                setExtraInventoryItems(extraInventoryData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (index: number, value: string) => {
        const newInputs = [...inputs];
        newInputs[index - 1] = value;
        setInputs(newInputs);

        const allInputsFilled = newInputs.every(input => input.trim() !== '');
        setIsSubmitDisabled(!allInputsFilled);
    };

    const handleCommentChange = (index: number, value: string) => {
        const newComments = [...comments];
        newComments[index - 1] = value;
        setComments(newComments);
    };

    const handleConfirmationClose = () => {
        setOpenConfirmation(false);
        setSubmitting(false);
    };

    const handleConfirmationOpen = () => {
        setOpenConfirmation(true);
    }

    const handleConfirmationConfirm = async () => {
        setOpenConfirmation(false);
        // Now you have access to initials here
        const submittedItems = baseInventoryItems.concat(extraInventoryItems).map((item, index) => ({
            inventoryItem: item.name,
            quantity: parseInt(inputs[index], 10) || 0,
            notes: comments[index] || ''
        }));

        try {

            const data = {
                signOffUser: initials,
                mobileFactoryId: activeJob?.assignedMobileFactory.id,
                purchaseOrderId: id,
                items: submittedItems
            }

            createPurchaseOrderInventoryCount(data).then((response) => {
                setSubmitting(false);
            });
            
        } catch (error) {
            console.error('Error submitting data:', error);
            setSubmitting(false);
        }
    };

    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={8}>
                    <Typography component="h2" variant="h5" align="left">
                        Active Job | P.O {id}
                    </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'right', pr: 2 }}>
                    <Link href="/active-jobs/list">
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
                {activeJob && (
                    <>
                        <List sx={{ width: '100%' }}>
                            <ListItem alignItems="center" sx={{ my: 0, py: 0 }}>
                                <ListItemText
                                    primary={`${activeJob.potentialJob.vaultNumber} | ${activeJob.potentialJob.owner}`}
                                    secondary={`${activeJob.potentialJob.city}, ${activeJob.potentialJob.state} `}
                                />
                            </ListItem>
                            <ListItem alignItems="center" sx={{ my: 0, py: 0 }}>
                                <ListItemText
                                    secondary={`Wall total ${activeJob.potentialJob.wallSqFt} SqFt | Ceiling Total ${activeJob.potentialJob.ceilingSqFt} SqFt | Total ${activeJob.potentialJob.totalSqFt} SqFt`}
                                />
                            </ListItem>
                        </List>
                        <Divider sx={{ my: 1 }} />
                        <Grid container spacing={1} sx={{ pr: 2, mb: 2 }} alignItems="center">
                            <Grid item xs={12}>
                                <Typography variant="h6" textAlign="left">Inventory Count:</Typography>
                            </Grid>
                        </Grid>
                        {baseInventoryItems.concat(extraInventoryItems).map((item, index) => (
                            <Grid container spacing={1} sx={{ py: 1, pr: 2 }} alignItems="center" key={item.index}>
                                <Grid item xs={4}>
                                    <Typography variant="body1" textAlign="left">{item.name}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        id={`quantity-${item.index}`}
                                        label="Qty."
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => handleInputChange(item.index, e.target.value)}
                                        onKeyPress={(e) => {
                                            // Allow only numeric input or backspace/delete keys
                                            const isValidInput = /^\d$/.test(e.key) || ['Backspace', 'Delete'].includes(e.key);
                                            if (!isValidInput) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id={`comment-${item.index}`}
                                        label="Comments"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => handleCommentChange(item.index, e.target.value)}

                                    />
                                </Grid>
                            </Grid>
                        ))}
                    </>
                )}
            </Box>
            <Divider sx={{ m: 2 }} />
            <Grid item xs={12} sx={{ mt: 2 }}>
                <Grid container spacing={1} justifyContent="end">
                    <Grid item xs={12} textAlign="right">
                        <LoadingButton
                            size="large"
                            onClick={handleConfirmationOpen}
                            loading={submitting}
                            loadingIndicator="Submitting..."
                            variant="contained"
                            disabled={isSubmitDisabled}
                        >
                            Submit Inventory
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
            <ConfirmationDialog
                open={openConfirmation}
                onClose={handleConfirmationClose}
                onConfirm={handleConfirmationConfirm}
                initials={initials}
                onInitialsChange={setInitials}
            />
        </>
    );
};

export default PotentialJobDetails;
