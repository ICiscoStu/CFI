import Paper from '@mui/material/Paper';

export default function SettingsMobileFactoriesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, height: '700px', width: '100%' }}>
            {children}
        </Paper>
    );
}