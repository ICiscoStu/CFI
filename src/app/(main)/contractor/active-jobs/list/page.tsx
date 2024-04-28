'use client';
import { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton,  Grid, Link, Box, Divider, Typography, Chip } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { getActiveJobs } from '@/db/queries/active-jobs';
import { set } from 'zod';

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

const ActiveJobList = () => {

    const [ActiveJobs, setActiveJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [chipColor, setChipColor] = useState<"error" | "default" | "success" | "warning" | "info" | "primary" | "secondary">('error');

    useEffect(() => {
        setLoading(true);
        getActiveJobs().then((data: any) => {
            setActiveJobs(data);
            setLoading(false);
        });
    }, []);

    const handleStatus = (status: string): "error" | "default" | "success" | "warning" | "info" | "primary" | "secondary"  => {

        let color: "error" | "default" | "success" | "warning" | "info" | "primary" | "secondary"  = "error";
        switch (status) {
            case 'Active':
                color = "success";
                break;
            case 'Unassigned':
                color = "warning";
                break;
            case 'Pending_Dispatch':
                color = "info";
                break;
            default:
                color = "error";
                break;
        }

        return color;
    }

    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={6}>
                    <Typography component="h1" variant="h4" align="left">
                        Active Jobs
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
                            {ActiveJobs.length === 0 && (
                                <Typography variant="h6" align="center" sx={{ p: 3 }}>
                                    No Active Jobs Found.
                                </Typography>
                            )}
                            {ActiveJobs.length > 0 && ActiveJobs.map((item) => (
                                <ListItem key={item.id}>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item xs={6}>
                                            <ListItemText
                                                primary={`Vault Number: ${item.jobDetails.vaultNumber}`}
                                                secondary={`Owner: ${item.jobDetails.owner}`}
                                            />
                                            <ListItemText
                                                secondary={`City: ${item.jobDetails.city}, State: ${item.jobDetails.state}`}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Chip label={item.status.replace(/_/g, " ")} color={handleStatus(item.status)} />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <ListItemSecondaryAction>
                                                <IconButton href={`/contractor/active-jobs/details/${item.id}`}>
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
        </>
    );
};

export default ActiveJobList;
