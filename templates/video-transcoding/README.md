# Video Transcoding #

## Pattern
- Fan-Out / Fan-In

## Description

This template workflow models the popular "fan-out/fan-in" workflow. The idea 
here is that there is 1 big lambda that splits the work into many pieces, and 
multiple smaller lambdas working in parallel on each individual piece. The 
results are then combined into 1, and the output can be put anywhere. A 
real-world example of this kind of workflow is video transcoding, which often 
takes hours with only 1 worker.

## How It Works ##

There is one main work splitter lambda, which splits the work up. The state 
machine then maps each portion to a transcoded bit using high concurrency, and 
then combines the results.

AWS Step Functions workflow:
```
    +----------+
    |          |
    | splitter |
    |          |
    +----------+
         |
+--------------------+
| +------------+     |
| |            |     |
| | transcoder |-+   |
| |            | |   |
| +------------+ |-+ |
|   |            | | |
|   +------------+ | |
|     |            | |
|     +------------+ |
+--------------------+
         |
     +--------+
     |        |
     | joiner |
     |        |
     +--------+
```

An interesting thing to note here is that the parallel transcoding is possible 
with an AWS Step Functions "Map" state, which allows for as high or low 
concurrency in mapping as you, the developer, wish.
