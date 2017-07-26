#!/bin/bash

set -e

rm -rf ./dist
./node_modules/.bin/babel ./src --out-dir ./dist
mv ./dist/gulpfile.babel.js ./dist/gulpfile.js
