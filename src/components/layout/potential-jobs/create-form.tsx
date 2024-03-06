'use client';

import React, { useState, ChangeEvent } from 'react';
import { TextField, Button, Grid, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useFormState } from 'react-dom';
import ConfirmationModal from '@/components/layout/potential-jobs/confirm-dialog';
import { handleCalculateSqFt } from '@/utils/math';

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
    vaultWidth: string,
    vaultLength: string,
    vaultHeight: string,
    widthUnit: string,
    lengthUnit: string,
    heightUnit: string,
    wallSqFt: string,
    ceilingSqFt: string,
    totalSqFt: string,
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
    const [vaultWidth, setWidth] = useState<string>('');
    const [vaultLength, setLength] = useState<string>('');
    const [vaultHeight, setHeight] = useState<string>('');
    const [owner, setOwner] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);
    const [widthUnit, setWidthUnit] = useState<string>('ft');
    const [lengthUnit, setLengthUnit] = useState<string>('ft');
    const [heightUnit, setHeightUnit] = useState<string>('ft');

    const [confirmData, setConfirmData] = useState<confirmData>({
        vaultNumber: '',
        owner: '',
        city: '',
        state: '',
        vaultWidth: '',
        vaultLength: '',
        vaultHeight: '',
        widthUnit: '',
        lengthUnit: '',
        heightUnit: '',
        wallSqFt: '',
        ceilingSqFt: '',
        totalSqFt: '',
    });

    const [PotentialJobFormData, setPotentialJobFormData] = useState<FormData>(new FormData());

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files || []);
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('vaultNumber', vaultNumber);
        formData.append('owner', owner);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('vaultWidth', vaultWidth);
        formData.append('vaultLength', vaultLength);
        formData.append('vaultHeight', vaultHeight);
        formData.append('widthUnit', widthUnit);
        formData.append('lengthUnit', lengthUnit);
        formData.append('heightUnit', heightUnit);
        files.forEach(file => {
            formData.append('files', file);
        });

        const [wallArea, ceilingArea, totalArea] = handleCalculateSqFt(vaultWidth, widthUnit, vaultLength, lengthUnit, vaultHeight, heightUnit);

        formData.append('wallSqFt', wallArea.toFixed(2));
        formData.append('ceilingSqFt', ceilingArea.toFixed(2));
        formData.append('totalSqFt', totalArea.toFixed(2));

        setPotentialJobFormData(formData);

        setConfirmData({
            vaultNumber: vaultNumber,
            owner: owner,
            city: city,
            state: state,
            vaultWidth: vaultWidth,
            vaultLength: vaultLength,
            vaultHeight: vaultHeight,
            widthUnit: widthUnit,
            lengthUnit: lengthUnit,
            heightUnit: heightUnit,
            wallSqFt: wallArea.toFixed(2),
            ceilingSqFt: ceilingArea.toFixed(2),
            totalSqFt: totalArea.toFixed(2),
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
                <Box sx={{ height: '530px', overflow: 'hidden', overflowY: 'scroll' }}>
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
                            <Grid container columnSpacing={0} spacing={0}>
                                <Grid item xs={7}>
                                    <TextField
                                        fullWidth
                                        label="Width"
                                        name="vaultWidth"
                                        value={vaultWidth}
                                        onChange={(e) => setWidth(e.target.value)}
                                        InputProps={{
                                            sx: {
                                                borderTopRightRadius: '0px',
                                                borderBottomRightRadius: '0px',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        select
                                        fullWidth
                                        name="widthUnit"
                                        value={widthUnit}
                                        onChange={(e) => setWidthUnit(e.target.value)}
                                        InputProps={{
                                            sx: {
                                                borderTopLeftRadius: '0px',
                                                borderBottomLeftRadius: '0px',
                                            },
                                        }}
                                    >
                                        <MenuItem value="ft">ft</MenuItem>
                                        <MenuItem value="in">in</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Grid container columnSpacing={0} spacing={0}>
                                <Grid item xs={7}>
                                    <TextField
                                        fullWidth
                                        label="Length"
                                        name='vaultLength'
                                        value={vaultLength}
                                        onChange={(e) => setLength(e.target.value)}
                                        InputProps={{
                                            sx: {
                                                borderTopRightRadius: '0px',
                                                borderBottomRightRadius: '0px',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        select
                                        fullWidth
                                        name="lenghtUnit"
                                        value={lengthUnit}
                                        onChange={(e) => setLengthUnit(e.target.value)}
                                        InputProps={{
                                            sx: {
                                                borderTopLeftRadius: '0px',
                                                borderBottomLeftRadius: '0px',
                                            },
                                        }}
                                    >
                                        <MenuItem value="ft">ft</MenuItem>
                                        <MenuItem value="in">in</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Grid container columnSpacing={0} spacing={0}>
                                <Grid item xs={7}>
                                    <TextField
                                        fullWidth
                                        label="Height"
                                        name='vaultHeight'
                                        value={vaultHeight}
                                        onChange={(e) => setHeight(e.target.value)}
                                        InputProps={{
                                            sx: {
                                                borderTopRightRadius: '0px',
                                                borderBottomRightRadius: '0px',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        select
                                        fullWidth
                                        name="heightUnit"
                                        value={heightUnit}
                                        onChange={(e) => setHeightUnit(e.target.value)}
                                        InputProps={{
                                            sx: {
                                                borderTopLeftRadius: '0px',
                                                borderBottomLeftRadius: '0px',
                                            },
                                        }}
                                    >
                                        <MenuItem value="ft">ft</MenuItem>
                                        <MenuItem value="in">in</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography component="h4" variant="h6" align="left">
                                Documentation:
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