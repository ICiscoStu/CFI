import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, Grid, Divider } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface ConfirmDialogProps {
    open: boolean,
    handleClose: () => void,
    handleConfirm: () => void,
    loading: boolean,
    data: {
        vaultNumber: string,
        city: string,
        state: string,
        vaultHeight: string,
        vaultWidth: string,
        vaultLength: string,
        wallSqFt: string,
        ceilingSqFt: string,
        totalSqFt: string,
    },
}

export default function ConfirmationModal({ open, handleClose, handleConfirm, loading, data }: ConfirmDialogProps) {

    return (
        <BootstrapDialog
            fullScreen
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Potential Job Submission Confirmation
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Typography gutterBottom textAlign={'center'} sx={{
                    m: 3
                }}>
                    Please confirm the informationg is correct before submitting.
                </Typography>
                {data && (
                    <>
                        <Grid container spacing={2} sx={{
                            p: 6,
                        }}>
                            <Grid item xs={12}>
                                <Typography variant="h6" textAlign={"center"}>Vault Information:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" textAlign={"right"}>Vault Name:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">{data.vaultNumber}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" textAlign={"right"}>State:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">{data.state}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" textAlign={"right"}>City:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">{data.city}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" textAlign={"right"}>Vault Height:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">{data.vaultHeight}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" textAlign={"right"}>Vault Width:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">{data.vaultWidth}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" textAlign={"right"}>Vault Length:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">{data.vaultLength}</Typography>
                            </Grid>
                            <Divider sx={{
                                m: 2
                            }} />
                            <Grid item xs={12}>
                                <Typography variant="h6" textAlign={"center"}>Dimension Totals:</Typography>
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
                        </Grid>
                    </>

                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                <LoadingButton
                    size="large"
                    onClick={handleConfirm}
                    loading={loading}
                    loadingIndicator="Submitting..."
                    variant="contained"
                >
                    <span>Confirm</span>
                </LoadingButton>
            </DialogActions>
        </BootstrapDialog>
    );
}