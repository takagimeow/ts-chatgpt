import { container } from "tsyringe";
import { FetchService } from "../fetch/FetchService.js";
import { FetchServiceImpl } from "../fetch/impl/FetchServiceImpl.js";

export function networkModule() {
  container.register<FetchService>("FetchService", {
    useClass: FetchServiceImpl,
  });
}
