'use client';
import { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Chip, Grid, Link, Box, Divider, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';

import { getPotentialJobsByUser } from '@/db/queries/potential-jobs';

interface Item {
    createdAt: Date;
    updatedAt: Date;
    id: number;
    createdById: string;
    status: string;
    approvedAt: string | null;
    vaultNumber: string;
    owner: string;
    city: string;
    state: string;
    vaultWidth: number;
    vaultHeight: number;
    vaultLength: number;
}

const PotentialJobList = () => {


    const handleInventory = (item: Item) => {
        // Handle inventory action
        console.log(item);
    }

    const handleEdit = (item: Item) => {
        // Handle edit action
        console.log(item);
    };

    const handleDelete = (item: Item) => {
        // Handle delete action
    };

    const handleView = (item: Item) => {
        // Handle view action
    };

    const [potentialJobs, setPotentialJops] = useState<Item[]>([]);
    useEffect(() => {
        getPotentialJobsByUser().then((data: any) => {
            setPotentialJops(data);
        });
    }, []);

    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={6}>
                    <Typography component="h1" variant="h4" align="center" sx={{ py: 1 }}>
                        Active Jobs
                    </Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right', pr: 2 }}>
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
                    {potentialJobs.map((item) => (
                        <ListItem key={item.id}>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item xs={5}>
                                    <ListItemText
                                        primary={`Vault Number: ${item.vaultNumber}`}
                                        secondary={`Owner: ${item.owner}`}
                                    />
                                    <ListItemText
                                        secondary={`City: ${item.city}, State: ${item.state}`}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <Chip label={item.status} color={item.status === 'Active' ? 'success' : 'warning'} />
                                </Grid>
                                <Grid item xs={2}>
                                    <ListItemSecondaryAction>
                                        {item.status === 'Active' && (
                                            <IconButton onClick={(handleInventory as unknown) as (event: React.MouseEvent<HTMLButtonElement>) => void}>
                                                <ContentPasteGoIcon />
                                            </IconButton>
                                        )}
                                        <IconButton onClick={(handleEdit as unknown) as (event: React.MouseEvent<HTMLButtonElement>) => void}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </>
    );
};

export default PotentialJobList;
