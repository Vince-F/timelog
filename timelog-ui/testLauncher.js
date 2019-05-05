const childProcess = require("child_process");

let server = childProcess.exec("npm run serve-test");

server.stdout.on('data', (data) => {
    console.log("Server: ", data.toString());
    if(data.toString().includes("Compiled successfully.")) {
        console.log("Launch test");
        let testRunner = childProcess.exec("npm run integration-tests");

        testRunner.stdout.on('data', (data) => {
            console.log("Test runner: ", data.toString());
        });


        testRunner.on('close', (code) => {
            console.log("test are done");
            if(code !== 0) {
                console.error("Test have failed");
            }
            server.kill("SIGTERM");
            process.exit(code);
        })
    }
});

server.stderr.on('data', (data) => {
    console.log("Server error: ", data.toString());
});