import { Tags } from "aws-cdk-lib";
import { Config, StackContext, use } from "sst/constructs";
import { Events } from "../packages/EventBus/src";
import { EventBusStack } from "./EventBusStack";

export function NotificationServiceStack({ app, stack }: StackContext) {
  const { eventBus } = use(EventBusStack);

  const PHONE_NUMBER = new Config.Secret(stack, "PHONE_NUMBER");

  eventBus.subscribe(stack, Events.PaymentCompleted.type, {
    handler: "packages/NotificationService/src/lambda.main",
    bind: [PHONE_NUMBER],
    permissions: ["sns:Publish"],
  });

  stack.getAllFunctions().forEach((fn) => {
    const tags = Tags.of(fn);
    tags.add("lumigo:auto-trace", `${!app.local}`); // don't trace when running locally
    tags.add("LUMIGO_TAG", stack.stage);
  });
}
