import { container } from "tsyringe";
import { Env } from "../Env";
import { EnvImpl } from "../EnvImpl";

export function envModule() {
  container.register<Env>("Env", {
    useClass: EnvImpl,
  });
}
