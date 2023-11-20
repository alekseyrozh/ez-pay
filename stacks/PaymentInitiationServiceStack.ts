import { Tags } from "aws-cdk-lib";
import { Api, StackContext, use } from "sst/constructs";
import { EventBusStack } from "./EventBusStack";

export function PaymentInitiationServiceStack({ app, stack }: StackContext) {
  const { eventBus } = use(EventBusStack);

  const api = new Api(stack, "paymentsApi", {
    routes: {
      "POST /payments": "packages/PaymentInitiationService/src/lambda.main",
    },
    defaults: {
      function: {
        bind: [eventBus],
      },
    },
  });

  stack.addOutputs({
    paymentsApiUrl: api.url,
  });

  stack.getAllFunctions().forEach((fn) => {
    const tags = Tags.of(fn);
    tags.add("lumigo:auto-trace", `${!app.local}`); // don't trace when running locally
    tags.add("LUMIGO_TAG", stack.stage);
  });

  return { paymentsApiUrl: api.url };
}
