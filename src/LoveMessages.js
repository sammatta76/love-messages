import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';

const LoveMessages = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                const response = await fetch('https://love-messages-api.vercel.app/analyze', {
                    // const response = await fetch('http://127.0.0.1:8000/analyze', {
                    method: 'POST',
                    body: formData,
                });
                const result = await response.json();
                console.log(result);
                setResult(result);
            } catch (error) {
                console.error('Error:', error);
            }
        }

    };

    return (
        <Box style={{ backgroundColor: '#ffe4e6', minHeight: '100vh', paddingTop: '16px' }}>
            <AppBar position="static" style={{ backgroundColor: '#ff5c8a' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        Love Messages
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" style={{ marginTop: '32px' }}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '24px',
                        borderRadius: '8px',
                        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#ffffff',
                    }}
                >
                    <Typography variant="h5" component="h2" style={{ color: '#ff5c8a', fontSize: '24px', fontWeight: 'bold' }}>
                        Upload Your File
                    </Typography>
                    <Button
                        variant="contained"
                        component="label"
                        style={{
                            backgroundColor: '#ff5c8a',
                            color: '#ffffff',
                            fontSize: '16px',
                            padding: '10px 20px',
                            borderRadius: '24px',
                            textTransform: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Choose File
                        <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>
                    {file && (
                        <Typography variant="body1" style={{ color: '#4a4a4a', fontSize: '14px' }}>
                            Selected File: {file.name}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        style={{
                            backgroundColor: '#d9534f',
                            color: '#ffffff',
                            fontSize: '16px',
                            padding: '10px 20px',
                            borderRadius: '24px',
                            textTransform: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Upload
                    </Button>
                    {result && (
                        <Box style={{ marginTop: '24px', textAlign: 'left' }}>
                            <Typography variant="h6" style={{ color: '#ff5c8a', fontWeight: 'bold' }}>
                                Analysis Results:
                            </Typography>

                            <Typography variant="body1" style={{ marginTop: '16px' }}>
                                <strong>First Messages:</strong>
                            </Typography>
                            {Object.entries(result.first_messages).map(([name, messageData], index) => (
                                <Typography key={index} variant="body2">
                                    {name}: "{messageData.message}" on {messageData.date}
                                </Typography>
                            ))}

                            <Typography variant="body1" style={{ marginTop: '16px' }}>
                                <strong>Laugh Counts:</strong>
                            </Typography>
                            {result.laugh_counts.map((item, index) => (
                                <Typography key={index} variant="body2">
                                    {item[0]}: {item[1]}
                                </Typography>
                            ))}

                            <Typography variant="body1" style={{ marginTop: '16px' }}>
                                <strong>Most Curses:</strong> {Object.entries(result['most curses']).map(([name, count], index) => (
                                <Typography key={index} variant="body2">
                                    {name}: {count}
                                </Typography>
                            ))}
                            </Typography>

                            <Typography variant="body1" style={{ marginTop: '16px' }}>
                                <strong>Percentages:</strong>
                            </Typography>
                            {result.percentages.map((item, index) => (
                                <Typography key={index} variant="body2">
                                    {Object.entries(item).map(([name, percentage]) => (
                                        `${name}: ${percentage}% `
                                    ))}
                                </Typography>
                            ))}

                            <Typography variant="body1" style={{ marginTop: '16px' }}>
                                <strong>Top Words:</strong>
                            </Typography>
                            {result.sorted_word_counts.map((item, index) => (
                                <Typography key={index} variant="body2">
                                    {item[0]}: {item[1]}
                                </Typography>
                            ))}
                        </Box>
                    )}


                </Box>
            </Container>
        </Box>
    );
};

export default LoveMessages;
