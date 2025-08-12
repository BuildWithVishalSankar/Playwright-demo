module.exports = {
    default: {
        require: [
            "tests/step-definitions/*.ts",
            "tests/support/*.ts"
        ],
        format: ["progress", "html:reports/cucumber-report.html"],
        publishQuiet: true,
        paths: ["tests/**/*.feature"],
        requireModule: ["ts-node/register"]
    }
};
