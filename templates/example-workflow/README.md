# Example Workflow

The example workflow is a generic workflow that demonstrates how to
coordinate multiple lambdas, handling failed steps with retries and catching
errors. The premise of the workflow is this:

Imagine there is a developer at a startup, tasked with creating an internal
tool for provisioning a resource with managerial approval. The workflow is
like this:

1. A request comes in to the manager
   - The request can be malformed
2. The manager makes a decision, branching to 2 differnt states
3. If the manager accepts, the resource is first provisioned
   - This provisioning is a complex task that can fail
4. After the resource is provisioned, control is passed to an access granter,
   which handles permissions setting and such
5. Finally the requester is notified of their acceptance and sent instructions
6. Or, if the manager denied, skip steps 3-5 and just notify the requester

This makes for a good example workflow because of the potential failures,
long-running or wait tasks (provisioner, manager), and because it is still
simple enough to implement with just a few lambdas.

# How It Works

(Include one of the many diagrams here)
