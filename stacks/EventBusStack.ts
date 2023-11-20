import { EventBus, StackContext } from "sst/constructs";

export function EventBusStack({ stack }: StackContext) {
  const eventBus = new EventBus(stack, "eventBus");

  return { eventBus };
}
