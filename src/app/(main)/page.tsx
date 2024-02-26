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

import { useUser } from '@clerk/nextjs';
import IconSettings from '@/components/icon/icon-settings';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'white',
  ...theme.typography.body2,
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = () => {

  const { user } = useUser();
  const role: any = user?.publicMetadata?.role;

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
      {role && role === 'contractor_administrator' && (
        <>
          <Grid xs={6}>
            <Item>
              <Button variant="contained" color="primary" href="/potential-jobs/create" fullWidth>
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid>
                    <IconClipboard className="h-28 w-28 py-2" />
                  </Grid>
                  <Grid>
                    <Typography variant="button">Potential Job Submission</Typography>
                  </Grid>
                </Grid>
              </Button>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>
              <Button variant="contained" color="primary" href="/potential-jobs/list" fullWidth>
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid>
                    <IconSearch className="h-28 w-28 py-2" />
                  </Grid>
                  <Grid>
                    <Typography variant="button">Active Jobs</Typography>
                  </Grid>
                </Grid>
              </Button>
            </Item>
          </Grid>
          <Grid xs={12}>
            <Item>
              <Button variant="contained" color="primary" href="/training" fullWidth>
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid>
                    <IconTraining className="h-28 w-28 py-2" />
                  </Grid>
                  <Grid>
                    <Typography variant="button">Training Videos</Typography>
                  </Grid>
                </Grid>
              </Button>
            </Item>
          </Grid>
        </>
      )}
      {role && role === 'administrator' && (
        <>
          <Grid xs={12}>
            <Item>
              <Button variant="contained" color="primary" href="/admin/potential-jobs/list" fullWidth>
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid>
                    <IconClipboard className="h-28 w-28 py-2" />
                  </Grid>
                  <Grid>
                    <Typography variant="button">Pending Potential Jobs</Typography>
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
        </>
      )}
    </Grid>

  );
};

export default Home;