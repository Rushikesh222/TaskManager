import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    "/api", // Specify the endpoint path you want to proxy
    createProxyMiddleware({
      target: "https://taskmanager.rushikeshshirsa.repl.co", // The target URL you want to proxy to
      changeOrigin: true, // Set this to true to change the origin of the request to the target's origin
    })
  );
}
