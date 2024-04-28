
'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import IconClipboard from '@/components/icon/icon-clipboard';
import IconSearch from '@/components/icon/icon-search';
import IconTraining from '@/components/icon/icon-training';

import IconSettings from '@/components/icon/icon-settings';
import IconPotentialJobs from '@/components/icon/icon-potential-jobs';

const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'white',
    ...theme.typography.body2,
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ContractorMenu = (contractor_type: any) => {

    const { role } = contractor_type;
    const activeJobSize = role === 'contractor_field' ? 12 : 12;

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
            {(role === 'contractor_administrator' || role === 'contractor_office') && (
                <>
                    <Grid xs={6}>
                        <Item>
                            <Button variant="contained" color="primary" href="/contractor/potential-jobs/create" fullWidth>
                                <Grid container direction="column" alignItems="center" spacing={1}>
                                    <Grid>
                                        <IconClipboard className="h-20 w-20 py-2" />
                                    </Grid>
                                    <Grid>
                                        <Typography variant="button">Possible Job Submission</Typography>
                                    </Grid>
                                </Grid>
                            </Button>
                        </Item>
                    </Grid>
                    <Grid xs={6}>
                        <Item>
                            <Button variant="contained" color="primary" href="/contractor/potential-jobs/list" fullWidth>
                                <Grid container direction="column" alignItems="center" spacing={1}>
                                    <Grid>
                                        <IconPotentialJobs className="h-20 w-20 py-2" />
                                    </Grid>
                                    <Grid>
                                        <Typography variant="button">Possible Jobs</Typography>
                                    </Grid>
                                </Grid>
                            </Button>
                        </Item>
                    </Grid>
                    <Grid xs={6}>
                        <Item>
                            <Button variant="contained" color="primary" href="/contractor/submitted-jobs/list" fullWidth>
                                <Grid container direction="column" alignItems="center" spacing={1}>
                                    <Grid>
                                        <IconClipboard className="h-20 w-20 py-2" />
                                    </Grid>
                                    <Grid>
                                        <Typography variant="button">Pending Approval Jobs</Typography>
                                    </Grid>
                                </Grid>
                            </Button>
                        </Item>
                    </Grid>
                    <Grid xs={6}>
                        <Item>
                            <Button variant="contained" color="primary" href="/contractor/approved-jobs/list" fullWidth>
                                <Grid container direction="column" alignItems="center" spacing={1}>
                                    <Grid>
                                        <IconClipboard className="h-20 w-20 py-2" />
                                    </Grid>
                                    <Grid>
                                        <Typography variant="button">Approved Jobs</Typography>
                                    </Grid>
                                </Grid>
                            </Button>
                        </Item>
                    </Grid>
                </>
            )}
            {(role === 'contractor_administrator' || role === 'contractor_office' || role === 'contractor_field') && (
                <Grid xs={activeJobSize}>
                    <Item>
                        <Button variant="contained" color="primary" href="/contractor/active-jobs/list" fullWidth>
                            <Grid container direction="column" alignItems="center" spacing={1}>
                                <Grid>
                                    <IconSearch className="h-20 w-20 py-2" />
                                </Grid>
                                <Grid>
                                    <Typography variant="button">Active Jobs</Typography>
                                </Grid>
                            </Grid>
                        </Button>
                    </Item>
                </Grid>
            )}
            {role === 'contractor_administrator' && (
                <Grid xs={12}>
                    <Item>
                        <Button variant="contained" color="primary" href="/contractor/settings" fullWidth>
                            <Grid container direction="column" alignItems="center" spacing={1}>
                                <Grid>
                                    <IconSettings className="h-20 w-20 py-2" />
                                </Grid>
                                <Grid>
                                    <Typography variant="button">Settings</Typography>
                                </Grid>
                            </Grid>
                        </Button>
                    </Item>
                </Grid>
            )}
            {(role === 'contractor_office' || role === 'contractor_field') && (
                <Grid xs={12}>
                    <Item>
                        <Button variant="contained" color="primary" href="/training" fullWidth>
                            <Grid container direction="column" alignItems="center" spacing={1}>
                                <Grid>
                                    <IconTraining className="h-20 w-20 py-2" />
                                </Grid>
                                <Grid>
                                    <Typography variant="button">Training Videos</Typography>
                                </Grid>
                            </Grid>
                        </Button>
                    </Item>
                </Grid>
            )}

        </Grid>
    );
};

export default ContractorMenu;