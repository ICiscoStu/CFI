'use client';
import { styled } from '@mui/material/styles';
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
    Button
} from '@mui/material';
import { getUserList } from '@/actions/settings/users';
import { useEffect, useState } from 'react';
import IconCancel from '@/components/icon/icon-cancel';



const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'white',
    ...theme.typography.body2,
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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

    useEffect(() => {

        getUserList().then((data) => {
            setUsers(data);
            setLoading(false);
        });
    }, []);


    return (
        <>
            <Grid container alignItems="center">
                <Grid item xs={3}>
                    <Typography component="h1" variant="h4" align="left">
                        Users
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" href="/admin/settings/users/add" fullWidth>
                        Add User
                    </Button>
                </Grid>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'right', pr: 2 }}>
                    <Link href="/admin/settings">
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
                            {users && users.map((item:IUserProps) => (
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
                                                secondary={ item.status === 'Active' ? 'Active' : 'Inactive' }
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <ListItemSecondaryAction>
                                                {item.status === 'Active' ? (
                                                    <IconButton >
                                                        <IconCancel className="h-10 w-10 py-2"/>
                                                    </IconButton>

                                                ): (
                                                    <IconButton >
                                                        <IconCancel className="h-5 w-5 py-2"/>
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
        </>
    );
};

export default Users;