'use client';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Grid,
    Link,
    Box,
    Divider,
    Typography,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { getUserList } from '@/actions/settings/users';
import { useEffect, useState } from 'react';
import IconCancel from '@/components/icon/icon-cancel';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import LoadingButton from '@mui/lab/LoadingButton';

interface IUserProps {
    id: string;
    email: string;
    fullName: string | null;
    userName: string;
    role: string;
    status: string
}

const Users = () => {

    const [users, setUsers] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [isContractor, setIsContractor] = useState(false);
    const [selectededContractor, setSelectededContractor] = useState('');

    const [role, setRole] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {

        getUserList().then((data) => {
            setUsers(data);
            setLoading(false);
        });
    }, []);

    const handleSubmit = (e: any) => {
        setSubmitting(true);
    }

    const handleChangeIsContractor = (e: any) => {
        setIsContractor(e.target.checked);
    }

    const handleChangeRole = (e: any) => {
        console.log(e.target.value);
    }

    const handleChangeContractorSelect = (e: any) => {
        console.log(e.target.value);
    }


    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={8}>
                    <Typography component="h2" variant="h5" align="left">
                        Users
                    </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'right', pr: 2 }}>
                    <Link href="/admin/settings">
                        Back
                    </Link>
                </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Box sx={{
                height: '530px',
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
                            {users && users.map((item: IUserProps) => (
                                <ListItem key={item.id}>
                                    <Grid container alignItems="center" spacing={2} >
                                        <Grid item xs={8}>
                                            <ListItemText
                                                primary={item.fullName}
                                                secondary={`Username: ${item.userName}`}
                                            />
                                            <ListItemText
                                                secondary={`Email: ${item.email}`}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <ListItemText
                                                secondary={item.status === 'Active' ? 'Active' : 'Inactive'}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <ListItemSecondaryAction>
                                                {item.status === 'Active' ? (
                                                    <IconButton >
                                                        <IconCancel className="h-10 w-10 py-2" />
                                                    </IconButton>

                                                ) : (
                                                    <IconButton >
                                                        <IconCancel className="h-5 w-5 py-2" />
                                                    </IconButton>

                                                )}
                                            </ListItemSecondaryAction>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            ))}
                        </>
                    )}
                </List>
            </Box>
            <Divider sx={{
                m: 2
            }} />
            <Grid item xs={12} sx={{ mt: 2 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} textAlign={'left'}>
                        <Button
                            onClick={handleClickOpen}
                            variant="contained"
                            disabled={submitting}>
                            Create User
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
                    {"New User"}
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <Grid container spacing={2} sx={{ my: 2 }}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Full Name"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Username"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isContractor}
                                            onChange={handleChangeIsContractor}
                                        />
                                    }
                                    label="Assign to a Contractor?"
                                />
                            </Grid>
                            {isContractor && (
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Contractor</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selectededContractor}
                                            label="Contractor"
                                            onChange={handleChangeContractorSelect}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Role {isContractor ? '- Contractor' : ''}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={role}
                                        label={isContractor ? 'Role - Contractor' : 'Role'}
                                        onChange={handleChangeRole}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='error'>Cancel</Button>
                    <LoadingButton
                        size="large"
                        onClick={handleSubmit}
                        loading={submitting}
                        loadingIndicator="..."
                        variant="contained"
                    >
                        <span>Create </span>
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Users;