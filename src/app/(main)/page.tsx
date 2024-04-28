'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import IconPotentialJobs from '@/components/icon/icon-potential-jobs';
import IconClipboard from '@/components/icon/icon-clipboard';

import { useUser } from '@clerk/nextjs';
import IconSettings from '@/components/icon/icon-settings';

import ContractorMenu from '@/components/layout/contractor/menu/menu';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'white',
  ...theme.typography.body2,
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = () => {

  const { user } = useUser();
  const role: string = user?.publicMetadata?.role as string;

  return (
    <>

      {role && (
        <ContractorMenu role={role} />
      )}

      {role && (role === 'cfi_super' || role === 'cfi_admin') && (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
          <Grid xs={6}>
            <Item>
              <Button variant="contained" color="primary" href="/admin/submitted-jobs/list" fullWidth>
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid>
                    <IconClipboard className="h-28 w-28 py-2" />
                  </Grid>
                  <Grid>
                    <Typography variant="button">Submitted Jobs</Typography>
                  </Grid>
                </Grid>
              </Button>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>
              <Button variant="contained" color="primary" href="/admin/pending-jobs/list" fullWidth>
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid>
                    <IconClipboard className="h-28 w-28 py-2" />
                  </Grid>
                  <Grid>
                    <Typography variant="button">Pending Dispatch</Typography>
                  </Grid>
                </Grid>
              </Button>
            </Item>
          </Grid>
          <Grid xs={12}>
            <Item>
              <Button variant="contained" color="primary" href="/admin/contractor-jobs" fullWidth>
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid>
                    <IconClipboard className="h-28 w-28 py-2" />
                  </Grid>
                  <Grid>
                    <Typography variant="button">All Lists</Typography>
                  </Grid>
                </Grid>
              </Button>
            </Item>
          </Grid>
          <Grid xs={12}>
            <Item>
              <Button variant="contained" color="primary" href="/admin/settings" fullWidth>
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid>
                    <IconSettings className="h-28 w-28 py-2" />
                  </Grid>
                  <Grid>
                    <Typography variant="button">Settings</Typography>
                  </Grid>
                </Grid>
              </Button>
            </Item>
          </Grid>

        </Grid>
      )}
    </>

  );
};

export default Home;