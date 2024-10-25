const mockserver = require('mockserver-node');

// Start MockServer on port 1080
mockserver.start_mockserver({
    serverPort: 1080,
    trace: true,
}).then(() => {
    console.log("MockServer started on port 1080");
});
