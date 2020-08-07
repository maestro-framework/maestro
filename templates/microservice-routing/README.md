# Microservice Routing #

## Pattern ##

- Branching

## Description
Assume a mircroservice architecture in which an initial mircroservice will generate a payload which, depending on the properties of said payload, will conditionally invoke one of three mircroservices. A process that is completed will invoke MicroserviceA or MicroserviceB, and one that needs further processing will invoke the PostProcessor.

## How It Works ##

ASL (Amazon States Language) provides a built-in branching construct represented by `Choice` states that allows the developer to conditionally specify the subsequent state in the workflow.

There are several operators provided (eg: `And`, `Or`, `Not`, `StringEquals`, `BooleanEquals`, etc) to help facilitate determining the next state.

For more information about the `Choice` state, check out [the States Language
spec][lang-spec].

[lang-spec]: https://states-language.net/spec.html#choice-state
