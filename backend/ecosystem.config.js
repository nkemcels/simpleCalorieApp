module.exports = {
    apps: [
        {
            name: "Ausplan",
            script: "build/index.js",
            watch: true,
            instances: 3,
        },
    ],
};
