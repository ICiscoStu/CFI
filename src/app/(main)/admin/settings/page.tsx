'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import IconClipboard from '@/components/icon/icon-clipboard';
import IconUsers from '@/components/icon/icon-users';
import IconMobileFactory from '@/components/icon/icon-mobile-factory';
import IconWarehouse from '@/components/icon/icon-warehouse';
import IconReports from '@/components/icon/icon-reports';
import { useUser } from '@clerk/nextjs';

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
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
      {role && (role === 'cfi_admin' || role === 'cfi_super') && (
        <>
          {role === 'cfi_super' && (
            <>
              <Grid xs={6}>
                <Item>
                  <Button variant="contained" color="primary" href="/admin/settings/users/list" fullWidth>
                    <Grid container direction="column" alignItems="center" spacing={1}>
                      <Grid>
                        <IconUsers className="h-20 w-20 py-2" />
                      </Grid>
                      <Grid>
                        <Typography variant="button">Users</Typography>
                      </Grid>
                    </Grid>
                  </Button>
                </Item>
              </Grid>
              <Grid xs={6}>
                <Item>
                  <Button variant="contained" color="primary" href="/admin/settings/contractors/list" fullWidth>
                    <Grid container direction="column" alignItems="center" spacing={1}>
                      <Grid>
                        <IconUsers className="h-20 w-20 py-2" />
                      </Grid>
                      <Grid>
                        <Typography variant="button">Contractors</Typography>
                      </Grid>
                    </Grid>
                  </Button>
                </Item>
              </Grid>
            </>
          )}
          <Grid xs={6}>
            <Item>
              <Button variant="contained" color="primary" href="/admin/settings/mobile-factories/list" fullWidth>
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid>
                    <IconMobileFactory className="h-20 w-20 py-2" />
                  </Grid>
                  <Grid>
                    <Typography variant="button">Mobile Factories</Typography>
                  </Grid>
                </Grid>
              </Button>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>
              <Button variant="contained" color="primary" href="/admin/settings/warehouses/list" fullWidth>
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid>
                    <IconWarehouse className="h-20 w-20s py-2" />
                  </Grid>
                  <Grid>
                    <Typography variant="button">Warehouses</Typography>
                  </Grid>
                </Grid>
              </Button>
            </Item>
          </Grid>
          <Grid xs={12}>
            <Item>
              <Button variant="contained" color="primary" href="/admin/settings/reports/list" fullWidth>
                <Grid container direction="column" alignItems="center" spacing={1}>
                  <Grid>
                    <IconReports className="h-20 w-20 py-2" />
                  </Grid>
                  <Grid>
                    <Typography variant="button">Reports</Typography>
                  </Grid>
                </Grid>
              </Button>
            </Item>
          </Grid>
        </>
      )
      }
    </Grid >

  );
};

export default Settings;