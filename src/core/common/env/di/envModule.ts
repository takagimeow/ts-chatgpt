import { container } from "tsyringe";
import { Env } from "../Env.js";
import { EnvImpl } from "../EnvImpl.js";

export function envModule() {
  container.register<Env>("Env", {
    useClass: EnvImpl,
  });
}
