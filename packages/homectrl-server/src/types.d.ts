declare module "@koa/cors" {
  import { Middleware } from "koa";
  function cors(): Middleware;
  export = cors;
}
