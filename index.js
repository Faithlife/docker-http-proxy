const httpProxy = require("http-proxy");

const port = Number(process.env.PORT || "3000");
const target = process.env.PROXY_TARGET;

if (!target) {
  console.error("PROXY_TARGET is required");
  process.exit(1);
}

function handleSignal(signal) {
  console.log(`Received ${signal}`);
  process.exit(0);
}
process.on("SIGINT", handleSignal);
process.on("SIGTERM", handleSignal);

const proxy = httpProxy
  .createProxyServer({
    target,
    changeOrigin: true,
    autoRewrite: true,
  })
  .on("end", (req, res, proxyRes) => {
    console.log(`${req.method} ${req.url} ${res.statusCode}`);
  })
  .listen(port);
console.log(`Listening on port ${port}, proxying to ${target}`);
