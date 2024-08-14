import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import './LoveMessages.css';

const LoveMessages = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            console.log(file.name); // For now, just log the file name
        }
    };

    return (
        <Box className="app-container">
            <AppBar position="static" className="app-bar">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Love Messages
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    className="form-container"
                >
                    <Typography variant="h5" component="h2" gutterBottom className="form-heading">
                        Upload Your File
                    </Typography>
                    <Button
                        variant="contained"
                        component="label"
                        className="choose-file-button"
                    >
                        Choose File
                        <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>
                    {file && (
                        <Typography variant="body1" color="textSecondary">
                            Selected File: {file.name}
                        </Typography>
                    )}
                    <Button type="submit" variant="contained" className="upload-button">
                        Upload
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default LoveMessages;
