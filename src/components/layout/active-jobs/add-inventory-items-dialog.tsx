import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Grid, Divider } from '@mui/material';

interface ConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    initials: string;
    onInitialsChange: (initials: string) => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    open,
    onClose,
    onConfirm,
    initials,
    onInitialsChange,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Inventory Count Confirmation</DialogTitle>
            <DialogContent>
                <Typography component="span" variant="body1" align="left">
                    Please enter your initials to confirm the inventory count.
                </Typography>
                <Divider sx={{ my: 3}}/>
                <Grid container justifyContent={'center'}>
                    <Grid item xs={3} >
                        <TextField
                            autoFocus
                            margin="dense"
                            id="initials"
                            label="Initials"
                            type="text"
                            fullWidth
                            value={initials}
                            onChange={(e) => onInitialsChange(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={() => {
                        onConfirm();
                    }}
                    disabled={!initials}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;