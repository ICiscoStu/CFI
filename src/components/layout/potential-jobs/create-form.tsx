'use client';

import React, { useState, ChangeEvent } from 'react';
import { TextField, Button, Grid, MenuItem, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useFormState } from 'react-dom';
import ConfirmationModal from '@/components/layout/potential-jobs/confirm-dialog';
import { handleCalculateSqFt } from '@/utils/math';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

// Define the props that the PostForm component expects
interface PostFormProps {
    formAction: any, // The action to perform when the form is submitted
}

// Define the shape of the form errors
interface FormErrors {
    title?: string[],
    content?: string[],
}

// Define the shape of the form state
interface FormState {
    errors: FormErrors,
}

interface confirmData {
    vaultNumber: string,
    owner: string,
    city: string,
    state: string,
    vaultWidthFt: string,
    vaultLengthFt: string,
    vaultHeightFt: string,
    vaultWidthIn: string,
    vaultLengthIn: string,
    vaultHeightIn: string,
    wallSqFt: string,
    ceilingSqFt: string,
    totalSqFt: string,
    possibleStartDate: moment.Moment | null
}

export default function PotentialJobCreateForm({ formAction }: PostFormProps) {

    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const [vaultNumber, setVaultNumber] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [vaultWidthFt, setWidthFt] = useState<string>('');
    const [vaultLengthFt, setLengthFt] = useState<string>('');
    const [vaultHeightFt, setHeightFt] = useState<string>('');
    const [vaultWidthIn, setWidthIn] = useState<string>('');
    const [vaultLengthIn, setLengthIn] = useState<string>('');
    const [vaultHeightIn, setHeightIn] = useState<string>('');
    const [possibleStartDate , setPossibleStartDate] = useState<moment.Moment | null>(null);
    const [owner, setOwner] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);

    const [confirmData, setConfirmData] = useState<confirmData>({
        vaultNumber: '',
        owner: '',
        city: '',
        state: '',
        vaultWidthFt: '',
        vaultLengthFt: '',
        vaultHeightFt: '',
        vaultWidthIn: '',
        vaultLengthIn: '',
        vaultHeightIn: '',
        wallSqFt: '',
        ceilingSqFt: '',
        totalSqFt: '',
        possibleStartDate: null,
    });

    const [PotentialJobFormData, setPotentialJobFormData] = useState<FormData>(new FormData());

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files || []);
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData();

        const vwFt = vaultWidthFt ? vaultWidthFt : '0';
        const vlFt = vaultLengthFt ? vaultLengthFt : '0';
        const vhFt = vaultHeightFt ? vaultHeightFt : '0';
        const vwIn = vaultWidthIn ? vaultWidthIn : '0';
        const vlIn = vaultLengthIn ? vaultLengthIn : '0';
        const vhIn = vaultHeightIn ? vaultHeightIn : '0';
        formData.append('vaultNumber', vaultNumber);
        formData.append('owner', owner);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('vaultWidthFt', vwFt);
        formData.append('vaultLengthFt', vlFt);
        formData.append('vaultHeightFt', vhFt);
        formData.append('vaultWidthIn', vwIn);
        formData.append('vaultLengthIn', vlIn);
        formData.append('vaultHeightIn', vhIn);
        formData.append('possibleStartDate', moment(possibleStartDate).format('YYYY-MM-DD HH:mm:ss.SSSSSSS'));
        files.forEach(file => {
            formData.append('files', file);
        });

        const [wallArea, ceilingArea, totalArea] = handleCalculateSqFt(vwFt, vlFt, vhFt, vwIn, vlIn, vhIn);

        formData.append('wallSqFt', wallArea.toFixed(2));
        formData.append('ceilingSqFt', ceilingArea.toFixed(2));
        formData.append('totalSqFt', totalArea.toFixed(2));

        setPotentialJobFormData(formData);

        setConfirmData({
            vaultNumber: vaultNumber,
            owner: owner,
            city: city,
            state: state,
            vaultWidthFt: vwFt,
            vaultLengthFt: vlFt,
            vaultHeightFt: vhFt,
            vaultWidthIn: vwIn,
            vaultLengthIn: vlIn,
            vaultHeightIn: vhIn,
            wallSqFt: wallArea.toFixed(2),
            ceilingSqFt: ceilingArea.toFixed(2),
            totalSqFt: totalArea.toFixed(2),
            possibleStartDate: possibleStartDate,
        });

        setOpenModal(true);
    }

    const handleConfirm = () => {
        setLoading(true);
        formAction(formState, PotentialJobFormData).then(() => {
            setOpenModal(false);
            setLoading(false);
        });
    }

    // Initialize the form state and action
    const [formState, action] = useFormState<FormState>(formAction, {
        errors: {},
    })

    return (
        <>
            <form action={action} onSubmit={handleSubmit}>
                <Box sx={{ height: '530px', overflow: 'hidden', overflowY: 'scroll', px: 1 }}>
                    <Grid container spacing={2} columnSpacing={1}>
                        <Grid item xs={12} sm={12}>
                            <Typography component="h4" variant="h6" align="left">
                                Vault Information:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Vault Number (Utility)"
                                name="vaultNumber"
                                value={vaultNumber}
                                onChange={(e) => setVaultNumber(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Owner"
                                name="owner"
                                value={owner}
                                onChange={(e) => setOwner(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="City"
                                name='city'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="State"
                                name='state'
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography component="h4" variant="h6" align="left">
                                Vault Dimensions:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography component="label" variant="body1" align="left">
                                Width
                            </Typography>
                            <Grid container columnSpacing={0} spacing={1}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Ft"
                                        name="vaultWidthFt"
                                        value={vaultWidthFt}
                                        onChange={(e) => setWidthFt(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="In"
                                        name="vaultWidthIn"
                                        value={vaultWidthIn}
                                        onChange={(e) => setWidthIn(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography component="label" variant="body1" align="left">
                                Length
                            </Typography>
                            <Grid container columnSpacing={0} spacing={1}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Ft"
                                        name='vaultLengthFt'
                                        value={vaultLengthFt}
                                        onChange={(e) => setLengthFt(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="In"
                                        name='vaultLengthIn'
                                        value={vaultLengthIn}
                                        onChange={(e) => setLengthIn(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography component="label" variant="body1" align="left">
                                Height
                            </Typography>
                            <Grid container columnSpacing={0} spacing={1}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Ft"
                                        name='vaultHeightFt'
                                        value={vaultHeightFt}
                                        onChange={(e) => setHeightFt(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="In"
                                        name='vaultHeightIn'
                                        value={vaultHeightIn}
                                        onChange={(e) => setHeightIn(e.target.value)}
                                    />
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography component="h4" variant="h6" align="left">
                                Possible Start Date
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <DatePicker 
                                sx={{ width: '100%' }}
                                value={possibleStartDate}
                                onChange={(newValue) => setPossibleStartDate(newValue)}
                                disablePast={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography component="h4" variant="h6" align="left">
                                Information/Reports/Notes:
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="file"
                                inputProps={{ multiple: true }}
                                onChange={handleFileChange}
                            />
                        </Grid>
                        {files && files.length > 0 && (
                            <Box
                                sx={{
                                    border: "1px solid #ccc",
                                    width: "100%",
                                    ml: 2,
                                    px: 3,
                                    mt: 2,
                                    mb: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    height: 82,
                                    overflow: "hidden",
                                    overflowY: "scroll"
                                }}
                            >
                                {files.map((file, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Typography component="span" variant="caption" align="left">
                                            {file.name}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Box>
                        )}
                    </Grid>
                </Box>
                <Grid item xs={12} sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>
            </form>
            <ConfirmationModal open={openModal} handleClose={handleCloseModal} handleConfirm={handleConfirm} loading={loading} data={confirmData} />
        </>
    );

};