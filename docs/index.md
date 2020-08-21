## 1 Introduction
### 1.1 So You've Decided to Go Serverless
 
Serverless is a computational architecture model where applications are deployed on servers that are managed in the cloud by a third party. Not provisioning servers locally but outsourcing management of computational resources reduces technical overhead. Energy otherwise expended on managing infrastructure can be reallocated to development.
 
Companies who've chosen to go serverless include those whose profit center lays outside of tech. With a serverless infrastructure, they can maintain a smaller technical staff while still providing resilient technology that their business purposes require. They benefit from low development overhead with minimum devops and maintenance while building additional features. Low overhead allows for quickly iterating on workflows [2].
 
A company may value the low technical overhead of a serverless architecture enough to sacrifice overall control of their infrastructure. The lack of control may pose challenges regarding performing local testing, execution caps dictated by the cloud provider, and limited tools provided by the cloud provider. Further, since serverless is a relatively new construct, a lack of established best practices and clarity in development impede productivity [1].
 
Despite the challenges, many companies continue to explore and develop in the serverless environment making cloud providers more and more popular. The most broadly adopted cloud service provider at the time of this writing is Amazon Web Services (AWS), so the focus of further discussion will be AWS [15].
 
### 1.2 FaaS
 
There's some ambiguity around this fairly new word "serverless", and it broadly refers to cloud offerings that do not require managing servers. Applications deployed on external, unowned servers take advantage of serverless infrastructure. However, the subset of serverless known as Function as a Service (FaaS) is so prevalent that it is often conflated with the term serverless itself [3].
 
FaaS makes use of application code comprising functions deployed on serverless containers managed by a cloud provider. The distinction with FaaS is that said containers are provisioned in response to events. Spinning up only when needed allows an organization to pay only for actual use of the resources which can lead to a reduction in cost. Also, the flexible provisioning facilitates scaling up and down according to demand.
 
From here on, the consideration will refer specifically to FaaS when mentioning severless. This generalization suits how 60% of developers think about serverless as represented in the following table representing a recent poll:
 
﻿Diagram
 
### 1.3 AWS Lambda
 
Amazon's FaaS offerings is AWS Lambda, and Serverless Framework which works with multiple cloud providers claims Lambda, "... is the most popular provider used with Serverless Framework". With reason special attention is going to be given to Lambda.
 
AWS Lambda are small applications or 'functions' of up to 250 mb deployed on containers that support runtimes in 7 languages [6]. The Lambda can be invoked by a number of AWS services including other Lambda. They are ephemeral in that they have a limited execution time maxing out at 15 minutes, and any state associated with the execution is lost.
 
When invoked, a container is 'spun up' when needed which has historically taken hundreds of milliseconds if the container hadn't already been operating; this contributed to a notion of a 'cold start' meaning that a first invocation of a given Lambda signified a period of extended latency. AWS has recently offered a feature to address 'cold start' through sub 100 millisecond spin up of certain function containers for an added cost.
 
Users of AWS Lambda are charged for execution time of Lambda in 100 ms increments.
 
### 1.4 Serverless Patterns
 
Taking into consideration there are not yet many strict best practices for working in the field, how can growing interest in development in the area be reconciled? Efforts to facilitate development is evidenced by significant research in serverless. One research paper that surveyed the serverless landscape found in excess of 200 academic papers written on serverless technology between 2017 and 2019 [13]. Additionally, practitioners write blogs and develop other sources describing their experiences of working with Lambda daily.
 
Common patterns can be derived from continual work with serverless architectures. Patterns for working with serverless can be grouped in 5 categories 1) Availability 2) Event Management 3) Communication 4) Authorization 5) Orchestration.
 
'Availability' patterns ensure that the service is available when needed. Lambdas can be unavailable due to a number of limitations. For example, due to cold start a Lambda may initially be unavailable; a request that demands a quick response may not receive it. Another limitation that affects availability is the 15 minute execution cap meaning that a Lambda may be unavailable after being terminated. Also, incorporating other services introduces other sets of limitations necessitating yet further approaches to reconcile.
 
Whether a Lambda is available may be impacted by failures beyond those related to limitations. Other sources of failure may need separate patterns altogether.
 
Another group of patterns deals with communication problems related to an event. The responsibilities of 'Event management' patterns include but are not limited to dealing with messages that need to be communicated, invoking services in response to events, and monitoring whether a scheduled event occurs.
 
A related grouping of patterns addresses problems that pertain to communication between Lambdas functions. There is bleed over from the 'Event Management' patterns as some 'Communication' patterns also deal with events and vice versa. The fact that such a blurry distinction occurs, substantiates the lack of clear standards in serverless, on the one hand. On the other hand, the classification of a given pattern may be grouped according to divergent criteria depending on the exact architecture of a practitioner.
 
The 'Authorization' grouping of patterns deals with issues related to user authorization. Information about a request may be utilized in the processing of some other information to authorize the user. The pattern may utilize multiple functions for processing or blocking access until an authorization is effected.
 
After encountering repeated mentions of issues with orchestration as well as experiencing some of their own, the focus of the Maestro team has been the grouping of serverless patterns around 'Orchestration'.
 
## 2 Orchestration
Once an application moves beyond a single Lambda, a developer is required to orchestrate multiple serverless functions such that they execute in a meaningful way. Serverless orchestration, in a nutshell, is the act of managing the workflow and communication between multiple serverless services.
 
### 2.1 Orchestration Challenges
 
Regarding their subscription fulfillment system [7], The Guardian reveals, "Orchestrating the data flow between our primary database system and all the third-party systems we use was very difficult,” says Paul Brown, senior developer manager at Guardian News and Media.
 
Notably, Brown goes on to cite 'reliability' as a non-trivial challenge having real consequences for users. In addition to reliability, a representative engineer at Yelp described another difficulty in peering into and understanding a system so as to fix problems [8]. The ability to peer into and understand a system can be termed 'auditability'.
 
Dealing with serverless orchestration, therefore, necessitates at minimum reliability, and auditability.
 
### 2.2 Orchestration Patterns
 
A Lambda may execute and require the subsequent execution of another service which may in fact be parallel executions. A Lambda somewhere in the execution chain may require a particular input. Later, an output may require processing. At some point, some asynchronicity may be required to allow for some series of executions to perform tasks while a longer running function executes. At yet another stage, a single synchronous execution may require every Lambda in the workflow to wait until it terminates.
 
Certainly there are multiple considerations related to serverless orchestration, and patterns have arisen for addressing a number of common concerns. However, imagining what orchestration actually looks like in the wild without a concrete example may be difficult. In order to visualize what real world orchestration may look like, consider the following hypothetical situation: the sole developer in a startup is tasked with creating an internal tool for provisioning some resource per managerial approval.
 
A request comes in to the manager who has the option of accepting or denying the request. If the manager approves, the resource is provisioned and the requester is granted access. If the manager denies, the requester is notified of the denial. The savvy developer may break down the problem into smaller components and generate a workflow:
 
Diagram (thin workflow)
1. Request made
2. Manager decision
    - Accept -> step 3
    - Deny -> step 5
3. Provision resource
4. Grant access
5. Notify requester of decision


The workflow can be implemented with each component representing an individual AWS Lambda. Ideally, each component would do one simple thing in isolation. Yet, a Lambda couldn't fulfill its role in a meaningful way if it were to execute arbitrarily, independent of the rest of the workflow. The work of each Lambda must be orchestrated for the application to execute in a meaningful sequence.
 
What factors must be considered for the workflow to proceed seamlessly?
 
Presumably, the 'Manager' Lambda would receive an input indicating which type of resource to provision and for whom. How would the 'Manager' respond if the input was somehow malformed perhaps indicating a non-existing resource type or non-existent 'Requester'? An error could occur. An error may lead to the 'Manager' failing. Unhandled, the error could send our entire workflow to a screeching halt.
 
Some form of error handling could prevent such an unfortunate occurrence, but should the 'Manager' validate its own input? It would be reasonable that a component performing a single responsibility of validating input could both provide clear separation of concerns and prevent the 'Manager' from failing.
 
A common orchestration pattern known as the 'Proxy Lambda' to play the pivotal role of invoking the 'Manager' with proper input. The 'Proxy Lambda' nestles between two Lambdas, and invokes the second when appropriate. In this case, it handles a potential invalid input error.
 
Thereafter, the choice exists between approving and denying which amounts to simple branching. If the decision is the main concern of the 'Manager', what's an appropriate way of branching?
 
Another pattern presents itself in this scenario: the 'Orchestrator Lambda'. The 'Orchestrator Lambda' plays the role of directing orchestration between multiple Lambdas. Since the 'Manager' Lambda is capable of invoking other Lambdas, it itself can handle branching.
 
Since it's unlikely there will be an error at this stage, writing additional business logic is all that is required. Despite the 15 minute execution cap of a Lambda, as long as the 'Manager' doesn't take long to make the decision, there shouldn't be an issue. The 'Manager' is transformed to the affectionately named 'Fat Manager':
 
Fat Manager diagram
 
Branching resolved, a potential provisioning can be considered. The provisioning of a resource may, however, be risky. What if the attempt to provision a resource fails?
 
Failed Provisioner Diagram
 
If the 'Provisioner' component failed, it would be beneficial for another attempt to be made without the 'Requester' having to make another request. The 'Orchestrator Lambda' pattern can once again be applied, this time, adding additional logic to the 'Fat Manager' to monitor the output of the 'Provisioner'. Thereby, a retry can be attempted upon failure.
 
Fat Manager with Retry
 
Do any limitations exist with this implementation? It may be that the likeliness of the Lambda surpassing the execution limit is now increased if the 'Fat Manager' monitors the 'Provisioner' during extended retries. A delayed provisioning may cause the 'Fat Manager' to terminate before determining if a retry was necessary. Further, with the orchestration logic of the 'Manger' written alongside the business logic, the component is overloaded resulting in a poor separation of concerns.
 
The consequences of a lack of separation of concerns would be felt every time it's necessary to iterate on the workflow. Business logic as well as orchestration logic may need to be evaluated and adapted for the application to grow.
 
Perhaps refactoring is in order. Maybe it would be wise to extract the orchestration logic to a separate component from the 'Fat Manager'. If that intuition seems natural, can more be done?
 
It is actually possible to extract out an entire orchestration layer. The result would be a thin workflow of strictly business logic resembling the original workflow. The orchestration logic would be entirely on its own:
 
Diagram
 
Implementing things this way, error handling, retry, and branching can all be done in one place. One benefit is that when the business logic needs to be iterated on, the orchestration logic can likely stay the same. The result is more rapid iteration. It can also improve the ease of implementation. For a new application or one that simply hasn't reached a stable state, this proposal can be quite valuable.
 
#### 2.2.2 The State Machine Pattern
 
How then does one abstract away an orchestration layer? Rolling a custom web of orchestration related components would require considerable overhead. However, another common orchestration pattern fits orchestration quite well: state machines.
 
A state machine stores a given state at a given time. In a workflow, a state machine represents the state of the workflow at a given step. The state of a step is conditional on input, and the output determines the next state.  It's important to note that it's not a physical device but an abstract concept; in practice, state machines are all about inputs, outputs, transitions, and state. Sounds like orchestration.
 
Simply put, AWS Lambdas lack persistent state, so introducing something to provide state between Lambda executions is quite intuitive. AWS provides a service that utilizes state machines in AWS Step Functions.

Diagram / Table / Chart
 
## 3 AWS Step Functions
Step Functions are the AWS version of an orchestration layer utilizing state machines to manage transitions between phases in a serverless application.
 
A developer can implement Step Functions with the help of a declarative language AWS created specifically for defining state machines: Amazon State Language (ASL). ASL is written in a JSON format where each step of a workflow is defined as a state corresponding to one of several types such as 'Choice', 'Task, 'Wait, and 'Error'.

All state machines have a required field called 'StartAt' which designates the state where execution will begin. A 'States' field specifies the states associated with a given workflow.

A state with a type of 'Task' will perform some task associated with the 'Resource' field, and the above depicted state machine represents an AWS Lambda as a resource. The state will not terminate until the resource returns at which point the 'End' field indicates the next step. An end value of 'true' indicates that once the state is complete, the workflow itself must terminate.

While the Step Functions language, ASL, is somewhat abstract, AWS facilitates visualizing workflows in a concrete way through visual representations of an ASL definition available in the AWS console. Not only can the sequence of a workflow be visualized, but if the resources are properly defined, the state machine can be executed in the console with the transitions visualized as the various components execute. The visualization is strictly a representation of the ASL definition provided, so no development can actually be done visually, but the visualization is informative. Also, by executing the workflow, a developer can see the outputs of executing each component in a toolbar.

The relatively complex workflow described earlier can be represented in ASL and deployed with Step Functions.


In the workflow, each step represents a state which may or may not be associated with a resource. Therefore, a state can be given a single responsibility like that of branching. A determination of the subsequent state is made based on the input received from the output of the previous state in the workflow.

For example, the 'ManagerChoice' state is of type 'Choice' which is the ASL designated state type for branching; no Lambda is associated. The output of the 'Manager' state provides input to the 'ManagerChoice' state, and based on acceptance or denial, the workflow can proceed to the either 'Notifier' or the 'Provisioner'. Understanding the technical reference to the previous output and comparing factors for determining the next step requires familiarity with ASL, yet such assessment is a feature of the language.

The salient point is that a separation is made between those states that are introduced only for purposes of orchestration and states performing some task associated with the business logic of an application. Even though the visualization represents business and orchestration steps in one place, the business logic actually lies far from the state machine. The 'Resource' field of the 'Task' state represents the location of the components where the business logic is defined while the ASL represents the orchestration logic in a single place. True separation.

Another feature of Step Functions is retry. It's difficult to express how challenging it is to implement retry without it. Part of the challenge is the lack of shared state when dealing with Lambda and auditability of execution in real time. When working with Step Functions, however, there is an 'Error' state which has a field for 'Retry'. The developer simply indicates the type of error to retry as well as details like, interval retry attempts, and max attempts. Some of these features are difficult to reconcile outside of a state machine as there is no higher order notion of a singular workflow.

To delve a bit more into the benefit of a singular workflow, consider the execution history mentioned early. The execution history accompanies the visualization of a workflow execution in the console and is interactive. Inputs and outputs of the transitions between states are displayed, and when a failed state is apparent, the execution history can be consulted to audit the failure. 
 
### 3.1 Challenges of Step Functions
#### 3.1.1 ASL

Step Functions seems to address some crucial problems in the world of serverless orchestration, but it would be naive to overlook challenges it introduces.
 
One of the common complaints with Step Functions is that ASL is not very intuitive. It's a JSON based language that's optimized for machines rather than humans. And some state machines can get quite complex with dozens or even hundreds of states.


JSON was designed as a data serialization format not a programming language. It was meant to be a representation of data not a development platform. That said, the awkwardness of programming in ASL for a developer is not simply restricted to the structure, syntax of the language but the declarative nature of ASL programming. A developer may have some familiarity with declarative programming having worked with SQL, yet it's unlikely one has frequently used a declarative paradigm to orchestrate components. It's one thing to separate business logic from orchestration logic which if programmed in unison would be implemented in a shared language, but shifting paradigms while extracting the orchestration logic can be intellectually difficult to reconcile.

Tools exist to try to provide a higher-level abstraction that compiles down to ASL, but these are not widely adopted as of yet and there is still much unsettled debate regarding the characteristics of these tools. Therefore, attempting to provide this proposed layer of abstraction at this stage of Step Functions' life-cycle may prove to be folly.

Considering the reality of developer use of Step Functions in the current climate, an effective measure to alleviate the pain of working with ASL could be another proposition: use templates.

A template models the prospective workflow providing, at least, a useful starting point. For the experienced practitioner it's a nice convenience while for the uninitiated it may prove a necessity.
 
#### 3.1.2 Deployment
 
Another challenge arises in an area that isn't unique to Step Functions: deploying to AWS. This is a notorious area of concern for developers that have to interface with a broad spectrum of AWS services to put their applications on the cloud.

Since Step Functions is an orchestration layer, many components may be integrated with a single state machine and need to be deployed in parallel. In some cases, components may represent AWS services outside of and including Lambdas. Even a single state machine orchestrating a single Lambda component represents at least 2 separate AWS services.

Each deployed component, including the state machine itself, needs to be accompanied by an appropriate region and account number for a successful deployment. Further, the proper permissions must be configured.

All services have their own interface, so configuration on AWS cannot be performed in a single, shared location. Manual pre-deployment configuration, especially in the AWS console, can prove tedious and error-prone.

Video of interacting w/ console or some kind of graph

What if a developer has identified the components of an application and the transitions from one state to another? Would the implementation then be done by opening up the AWS console and writing an instance of a Lambda for each component? Then, open the Step Functions console and implement the ASL of the state machine? Would that mirror the typical development workflow of a software engineer who customarily works in a familiar local environment and later deploys?

What if a developer implements the components locally? There are tools like the AWS SDK and AWS CLI that allow the developer to create an interface between a local machine and the AWS cloud. Writing the necessary orchestration code and business logic using either or both of those tools takes time to learn, and deploying the components to AWS continues to pose configuration challenges like those previously mentioned.

Whether, implementing components in disparate AWS consoles, locally with the AWS SDK, or AWS CLI, speed of development would certainly be impacted at least while getting accustomed to AWS development. There is a formidable learning curve.

It's easy to imagine why certain aspects of deployment could benefit from automation. Indeed, there are several frameworks that aim to help the developer perform tasks pertaining to deployment.
 
3.2 Existing Solutions
In order to understand the tools that currently exist to facilitate deployment, it's helpful to understand a bit about the AWS solutions on which those tools are built.
 
One such AWS solution is called AWS CloudFormation; it's an AWS offering that allows creating a configuration file containing all of a serverless application's resources for deployment. Frameworks that interact with CloudFormation often guide a developer through a process of creating a framework-specific file. The file is then compiled down to CloudFormation and the whole stack is deployed at once.
 
The other common tool is AWS Software Development Kits, or SDKs, which are APIs that allow a developer to work directly with individual resources from their language of choice.
 
The frameworks of concern for the purposes of this consideration are those that allow deployment of Step Functions. Many excellent frameworks exist for certain use cases but don’t include Step Functions, so they lie outside the scope of this discussion.

One popular framework is the aptly named Serverless Framework; it's the dominant player in this space. The approach to deployment taken by Serverless Framework is through compilation to CloudFormation, and it can be considered a general purpose tool. Regarding Step Functions, a plugin is provided that allows inclusion of Step Functions in a deployment.

One positive feature of Serverless Framework is that it supports multiple runtimes. Also, it automatically creates the permissions that are needed for the resources in an application's infrastructure.  Plus, having mentioned the value of templates, it provides  simple ASL templates.

A drawback of Serverless Framework is that its templates require manual configuration of resources the state machine is meant to orchestrate. Further, the state machine definition must be written in YAML to accommodate Serverless Framework’s conventions. Imagine, ASL is written in JSON which must then be converted to YAML. How tedious. Finally, the general purpose functionality that Serverless Framework provides comes at a dependency cost of 535 node modules. Such heavy use of dependencies can hinder otherwise light applications.
 
Another framework that deals with Step Functions was created by AWS: the Serverless Application Model or SAM. SAM added support for Step Functions just a few months  prior to this writing. SAM is similar to Serverless Framework both in being a general purpose tool and deploying through CloudFormation. Likewise, it supports multiple runtimes and automatically generates the required permissions for resources. Unlike Serverless Framework, a working state machine can be deployed straight from the command line using a template; there is no need to make manual configurations.

However, only one template is offered, and deployment time is rather lengthy taking a couple of minutes. Additionally, there are several prompts to which a user must respond during the deployment. Unfortunately, once deployed no single command easily tears down, so teardown must be done manually.

As discussed, Serverless Framework and SAM are both general purpose tools, and neither was designed with Step Functions in mind. Support for Step Functions was added as an afterthought.
 
What about more purpose-built frameworks? Unfortunately, there aren't many designed with Step Functions in mind. One called Step does happen to be Step Functions centric and was built by Coinbase. Step actually allows the user to create a state machine with a higher level language, namely Go.

However, adoption of Step, apparently, hasn't been very broad. Coinbase appears to be the sole users of its framework. A non-Coinbase practitioner may, in fact, encounter difficulty configuring it. Understandably, the development status of the framework is listed as Beta. Further, a development drawback is that Step is not able to create a new state machine but only modify an existing one.

After surveying existing solutions, consider Maestro, a purpose-built, lightweight framework that allows the developer to quickly iterate on workflows using Step Functions.

## 4 Maestro
Maestro is an open source Node.js framework for AWS Step Functions built with ease of use in mind. It offers simple commands that facilitate common operations for applications that are suited for Step Functions including interactions with AWS.
 
Maestro also has robust 'man' pages which contribute to its ease of use. A new project can quickly, easily be created with the |maestro new| command. Further, speed is prioritized as Maestro allows rapid deployment in just 3 seconds enabling quickly bootstrapping a new project or iterating on an existing one. Teardown can just as quickly be performed in as little as 2 seconds.
 
### 4.1 Commands

Given that templates can provide a useful mechanism for developing with Step Functions, Maestro interacts with an external template repository through the |maestro get-templates| command that creates a local version of the repo locally. Maestro itself is able to stay light by separating out the template repository which can then be utilized independently. Separation also provides a future basis for middleware to add templates. Included in the repository are several templates deemed foundational by AWS. However, the Maestro philosophy is, 'Bring Your Own Template', and any template placed in the local repository will be included for creation by the |new| command.

Since configuration of Lambda and Step Functions can be cumbersome, a convenience method for configuring a practitioner's AWS region and account number is provided (|maestro config|). The pertinent account information is made available to any maestro project and automatically included for deployment of resources that would otherwise require manual configuration.

Once a user's local environment has been configured, a new project can be created with |maestro new|. As Maestro is template oriented, the user is prompted to select from a list of templates from which to base the new project otherwise a skeleton will be provided. Creating the new project locally allows a developer to access the project files with their preferred text editor.

The |maestro deploy| command is the mechanism through which a practitioner's local code is made available on AWS servers. A deployment ensures the creation of IAM roles that allow Lambda and Step Functions to operate in AWS, attaching policies that allow resources with a given role to perform tasks, creation of Lambdas associated with the project, and creation of the Step Functions state machine. The creation of resources like the Lambdas and state machine takes place concurrently such that deployment is faster. If the roles associated with a deployment already exist in an AWS account, deployment takes about 3 seconds while a deployment that requires creating the roles takes around 15 seconds.

Development requires not only deploying code and auditing its execution on AWS but starting over with as few artifacts as possible when necessary. Tearing down in the AWS console requires navigating various interfaces hoping to identify every resource that was associated with a workflow. Missing just one could result in conflicts in future deployments and fees associated with lingering artifacts. |maestro teardown| allows the developer to remove all resources associated with a project in one command. Like deploying, tearing down is extremely fast, running in about 2 seconds. Flags allow the developer to distinguish just which resources to tear down in the event the intent is not to tear down everything. For instance, roles are left behind unless flags are included to indicate their destruction.

### 4.2 Challenges

One may now understand the value of working with a framework like Maestro, but, as with other projects, there were development challenges along the way.

One source of difficulty was dealing with IAM. IAM is the AWS service that allows for the creation of roles which can operate within the AWS environment and perform tasks stipulated by associated permissions and policies. Authorization is often a challenge in most programming environments, and AWS is no exception.

For those inexperienced with IAM, the initial challenge is determining what set of permissions and policies must be provided to allow each component to execute properly. One would imagine that clear documentation regarding which permissions and policies allow execution of a given task would be a major priority, but such mapping of permission and policy capabilities is not forthcoming.

In order to make an initial determination of which basic capabilities the components in a standard Lambda centric workflow required, the Maestro team created some mock components and observed which default policies AWS attaches by default. Later a composite of these policies was applied to Maestro Lambdas.

Assuming roles can be created and have the proper permissions with appropriate policies attached, sequencing the creation of services such that the roles and policies are accessible before attempting to associate them with a service comprises a subsequent challenge. Notice, the Maestro team established the creation of roles with policies but took for granted that those roles would be accessible to other services whence created.

Role creation synchronously preceded any attempt to create subsequent resources which would need those roles, but confirming the creation of a role in IAM did not indicate availability of the role for association with another service. Further, the most straightforward mechanism for determining a role's availability in another service requires attempting to associate it with that service from within the other service. Simply accessing IAM to determine if the role exists says little regarding whether its existence has propagated to other services.

Therefore, in order to create Lambdas and State Machines with associated roles, the Maestro team resolved to implement retry in the chain of role creation and subsequent creation of services. Built in retry does exist in SDKs but such retry is for atomic retry of a service interaction not the retry of business logic of an interservice framework. In other words, if creating a role in IAM failed, there would be an AWS means of retrying that interaction, but since the current problem is not a failed role creation but its propagation to other services, the Maestro team had to roll its own retry.

The process of retrial was fraught with its own challenges since the error messages of unsuccessful attempts to attach a policy to a Lambda or State Machine were quite cryptic. The AWS documentation for role association was not as robust as the team would have hoped, but in the end retry with appropriate initial sleep and backoff rates was achieved.

Discussing the challenge of creating a Lambda or State Machine with the ability to properly interact with AWS depending on another service touches on an overarching challenge that would need to be reconciled in developing Maestro: asynchronicity. Maestro is able to offer quick deployment based on concurrent creation and deployment of resources which requires navigating numerous issues related to synchronicity.

A helpful pattern that allowed the team to work with asynchronous functions and Promises was the 'async / await' pattern. This allowed certain actions to be treated synchronously. However, the Maestro philosophy was not to completely remove Promise chains by dogmatically applying the 'async / await' pattern everywhere possible. Overuse of the pattern can cause code to be slow by essentially making every step synchronous [15]. To achieve relevant concurrency in creating resources, a mixture of 'Promise chains', 'async / await', and |Promise.all| was implemented. The result is a lightning fast framework.

### 4.3 Future Work

As with most endeavors, not all that was desired could be accomplished from the outset. Here, a few aspirations that are left yet for future work are recounted.

Ultimately, a framework that works with ASL could be benefited by abstracting away the awkward language. As was previously described, the objective of Maestro is to facilitate working with ASL through templates. However, no set of templates can be comprehensive, and any developer working extensively with Step Functions will eventually require writing their own ASL. Having an ASL 'wrapper' to imperatively write ASL, in effect, mirroring common procedural coding would be helpful.

Another possible future addition would be integration with the host logging system. More robust logging is helpful in the event something goes wrong with the deployment of an individual component or an entire workflow.

Further, if a premise of Maestro is allowing rapid iteration on workflows, versioning comes into view. Much consideration must go into determining the point at which a workflow is ready for production, and due to innumerate circumstances, a team may resolve to look back at some previous version of their application. Ideally, a version of the workflow would be persisted and easily accessible every time a workflow was newly deployed.

Which brings to mind another consideration left for the future: a |maestro redeploy| command. It would be helpful, especially for complex workflows, to intelligently re-deploy only elements of the workflow that have changed since the last version. If versioning were clearly outlined, then re-deploying could look back at a snapshot of the workflow to determine what changed and re-deploy accordingly. This would be helpful for preserving artifacts in AWS that provide auditability of long-standing components.

As clearly outlined, the current focus of Maestro are the ever popular AWS Lambdas. While much can be achieved, and often is, strictly using Lambdas, other services offer a broader range of development possibilities. Having encountered a starting point for development, integrating further AWS services into Maestro would amplify its potential.

Currently, the Maestro configuration depends on a single configuration file referenced in numerous projects. As a developer used Maestro more extensively, it would be beneficial to have a unique config file for each project allowing deployment in various regions and even to different AWS accounts. On a similar note, a developer may use different Node.js runtimes, so support for various versions could be added.

## Resources

1. [What is Serverless Architecture? What are its Pros and Cons?](https://hackernoon.com/what-is-serverless-architecture-what-are-its-pros-and-cons-cc4b804022e9)
2. [Serverless Smart Radio](https://medium.com/a-tale-of-2-from-data-to-information/serverless-smart-radio-1cabcab8de30)
3. [FaaS](https://www.ibm.com/cloud/learn/faas)
4. [Serverless Event Scheduling — Using AWS Step Functions](https://medium.com/serverless-transformation/serverless-event-scheduling-using-aws-step-functions-b4f24997c8e2)
5. [How are serverless computing and Platform-as-a-Service different?](https://www.cloudflare.com/learning/serverless/glossary/serverless-vs-paas/)
6. [AWS Lambda - The Ultimate Guide](https://www.serverless.com/aws-lambda)
7. [Guardian News & Media Automates Subscription Fulfillment Using AWS Step Functions](https://aws.amazon.com/solutions/case-studies/the-guardian/)
8. [Building self-healing, observable systems with AWS Step Functions](https://medium.com/@scott_triglia/building-self-healing-observable-systems-with-aws-step-functions-8fe5b402ef7e)
9. [AWS Step Functions - The Power of Simplicity](https://medium.com/weareservian/aws-step-functions-the-power-of-simplicity-10e8395af4f3)
10. [Breaking down the monolith with AWS Step Functions](https://engineeringblog.yelp.com/2017/11/breaking-down-the-monolith-with-aws-step-functions.html)
11. [A mixed-method empirical study of Function-as-a-Service software
development in industrial practice](https://research.chalmers.se/publication/508147/file/508147_Fulltext.pdf)
12. [SOSW](https://github.com/sosw/sosw)
13. [Patterns for Serverless Functions](https://www.researchgate.net/publication/340121613_Patterns_for_Serverless_Functions_Function-as-a-Service_A_Multivocal_Literature_Review)
14. [What is AWS?](https://aws.amazon.com/what-is-aws/)
15. [Async / await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)

