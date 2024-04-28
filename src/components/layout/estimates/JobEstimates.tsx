import { Divider, Grid, Typography } from '@mui/material';

interface JobEstimatesProps {
    jobEstimates: {
        initial: {
            wallBase: number,
            ceilingBase: number,
            glass: number,
            topCoat: number,
            partBWall: number,
            partBCeiling: number
        },
        safety30: {
            wallBase: number,
            ceilingBase: number,
            glass: number,
            topCoat: number,
            partBWall: number,
            partBCeiling: number
        },
        total: {
            wallBase: number,
            ceilingBase: number,
            glass: number,
            topCoat: number,
            partBWall: number,
            partBCeiling: number
        }
    }
}

const JobEstimates: React.FC<JobEstimatesProps> = ({
    jobEstimates
}) => {
    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <Typography variant="body1" textAlign={"left"}> <strong>Estimates:</strong> </Typography>
            </Grid>
            <Grid container spacing={0}>
                <Grid item xs={3}>
                    <Grid item xs={12}>
                        <Typography variant="body2" textAlign="left" sx={{ color: "white" }}>**</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" textAlign="left" sx={{ color: "white" }}>**</Typography>
                    </Grid>
                    <Divider sx={{
                        mb: 1
                    }} />
                    <Grid item xs={12}>
                        <Typography variant="caption" textAlign="center">Vault Requirements</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="caption" textAlign="center">Safety Stock 30%</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="caption" textAlign="center">Total Estimate</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={9}>
                    <Grid container spacing={0}>
                        <Grid item xs={2}>
                            <Typography variant="body2" textAlign="center">Wall </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body2" textAlign="center">Ceiling </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body2" textAlign="center">Glass</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body2" textAlign="center">Top</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" textAlign="center">Part B's</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body2" textAlign="center">Base </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body2" textAlign="center">Base </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body2" textAlign="left" sx={{ color: "white" }}>**</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body2" textAlign="center">Coat</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body2" textAlign="center">Wall</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body2" textAlign="center">Ceiling</Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{
                        mb: 1
                    }} />
                    <Grid container spacing={0}>

                        <Grid item xs={2}>
                            <Typography variant="body1" textAlign="center"> {jobEstimates.initial.wallBase}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" textAlign="center"> {jobEstimates.initial.ceilingBase}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" textAlign="center"> {jobEstimates.initial.glass}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" textAlign="center"> {jobEstimates.initial.topCoat}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" textAlign="center"> {jobEstimates.initial.partBWall}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" textAlign="center"> {jobEstimates.initial.partBCeiling}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        <Grid item xs={2}>
                            <Typography variant="body1" textAlign="center"> {jobEstimates.safety30.wallBase}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" textAlign="center"> {jobEstimates.safety30.ceilingBase}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" textAlign="center"> {jobEstimates.safety30.glass}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" textAlign="center"> {jobEstimates.safety30.topCoat}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" textAlign="center"> {jobEstimates.safety30.partBWall}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" textAlign="center"> {jobEstimates.safety30.partBCeiling}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        <Grid item xs={2}>
                            <Typography variant="body1" textAlign="center"> {jobEstimates.total.wallBase}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" textAlign="center"> {jobEstimates.total.ceilingBase}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" textAlign="center"> {jobEstimates.total.glass}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" textAlign="center"> {jobEstimates.total.topCoat}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" textAlign="center"> {jobEstimates.total.partBWall}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" textAlign="center"> {jobEstimates.total.partBCeiling}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    );
};

export default JobEstimates;