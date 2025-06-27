import app from './app.js';

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// This file is the entry point for the server application.
// It imports the Express app from app.js and starts the server on a specified port.    