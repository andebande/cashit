#!/bin/bash

ssh ana@server 'bash -s' < backup.sh

scp -r * ana@server:~/cashit

ssh ana@server 'bash -s' < restart.sh
