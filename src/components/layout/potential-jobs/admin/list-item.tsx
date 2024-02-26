'use client';
import { FC } from 'react';
import { useState } from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Grid } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CancelIcon from '@mui/icons-material/Cancel';
import ApproveAndAssignModal from '@/components/layout/potential-jobs/admin/approve-dialog';

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
    createdBy: {
        fullName: string;
        userName: string;
    };
}

//<ApproveAndAssignModal open={openModal} handleClose={handleCloseModal} handleConfirm={handleConfirmModal} loading={false} data={data} />

const PotentialJobListItem: FC<Item> = (data) => {

    const handleAssign = (item: Item) => {
        // Handle edit action
        console.log(item);
        setOpenModal(true);
    };

    const handleCancel = (item: Item) => {
        // Handle delete action
    };

    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleConfirmModal = () => {
        setOpenModal(false);
    }

    return (
        <>
            <ListItem key={data.id}>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={10}>
                        <ListItemText
                            primary={`Submitter: ${data.createdBy.fullName} (${data.createdBy?.userName})`}
                            secondary={`Owner: ${data.owner}`}
                        />
                        <ListItemText
                            secondary={`Vault Number: ${data.vaultNumber}, City: ${data.city}, State: ${data.state}`}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <ListItemSecondaryAction>
                            <IconButton href={`/admin/potential-jobs/details/${data.id}`}>
                                <AssignmentTurnedInIcon />
                            </IconButton>
                            <IconButton onClick={(handleCancel as unknown) as (event: React.MouseEvent<HTMLButtonElement>) => void}>
                                <CancelIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </Grid>
                </Grid>
            </ListItem>
        </>
    );
}

export default PotentialJobListItem;