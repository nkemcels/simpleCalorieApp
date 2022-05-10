import winston from "winston";

const createAppLogger = () => {
	const format = winston.format.logstash;
	// const accessLogPath = (appConfig.logging || {}).access_log_path || "access.log";
	// const errorLogPath = (appConfig.logging || {}).error_log_path || "error.log";
	const logger = winston.createLogger({
		level: "info",
		format: winston.format.combine(
			winston.format.timestamp({
				format: "YYYY-MM-DD HH:mm:ss",
			}),
			format()
		),
		defaultMeta: { service: "backend" },
		transports: [
			// new winston.transports.File({ filename: errorLogPath, level: "error" }),
			// new winston.transports.File({ filename: accessLogPath, level: "debug" }),
			new winston.transports.Console(),
		],
	});

	return logger;
};

export default createAppLogger();
