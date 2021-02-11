#!/usr/bin/bash

SETUP_SH_FILENAME=`readlink -f $0`
SETUP_SH_DIRNAME=`dirname $SETUP_SH_FILENAME`

# Set up git-hook
GIT_DIRNAME=`git rev-parse --absolute-git-dir`

if [ ! -f $GIT_DIRNAME/hooks/pre-commit ]; then
    cp $SETUP_SH_DIRNAME/pre-commit $GIT_DIRNAME/hooks
fi
