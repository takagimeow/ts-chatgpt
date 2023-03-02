import { container } from "tsyringe";
import { FetchService } from "../fetch/FetchService";
import { FetchServiceImpl } from "../fetch/impl/FetchServiceImpl";

export function networkModule() {
  container.register<FetchService>("FetchService", {
    useClass: FetchServiceImpl,
  });
}
