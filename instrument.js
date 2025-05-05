const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "https://cb8ae1dd98bfc97aa39598179eea98b5@o4509270725820416.ingest.us.sentry.io/4509270744104960",

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
