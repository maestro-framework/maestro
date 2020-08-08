#!/bin/bash

for file in "doc/*.1"; do
  gzip -f -k -n -9 $file
done
