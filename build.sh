#!/bin/bash
set -e

task="$1"
force="$2"

if [ "$task" == "-t" ]; then
	cd opentok.js-annotations
	grunt karma:prod "$force"
	exit 0
fi

echo Invalid parameters, please use ‘-t’ to run tests.
exit 1
