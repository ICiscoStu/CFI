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

const Settings = () => {

  const { user } = useUser();
  const role: any = user?.publicMetadata?.role;

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
      {role && role === 'administrator' && (
        <>
          <Grid xs={12}>
            <Item>
              <Button variant="contained" color="primary" href="/admin/settings/users/list" fullWidth>
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid>
                    <IconClipboard className="h-28 w-28 py-2" />
                  </Grid>
                  <Grid>
                    <Typography variant="button">Users</Typography>
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

export default Settings;