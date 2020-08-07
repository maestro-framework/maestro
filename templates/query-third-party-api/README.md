# Query a Third-Party API #

## Pattern ##

- Retry

## Description

This template handles retry logic, useful for situations such as querying a
third-party API. When a third-party API is being integrated into a
microservice application, it introduces vectors for failure, including, but
not limited to: network failures; rate limits; and service outages.

## How It Works ##

ASL (Amazon States Language) provides a built-in "Retry" construct that allows
you as a developer to specify how many times to retry a specific step, as well
as custom retry logic like which errors to retry, time interval between
retries, and backoff rate (how to adjust the time interval as retries happen).

For more information about retry, check out [the States Language
spec][lang-spec].

[lang-spec]: https://states-language.net/spec.html#errors
