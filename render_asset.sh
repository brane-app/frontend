#!/usr/bin/env bash

SIZE="16 32 64 128"
mkdir -p ./asset/rendered

for svg in $(ls asset | grep ".svg" | cut -d"." -f1); do
    for ((i=0;i<=6;i++)); do
        size=$((16<<$i)) && inkscape -w "$size" -h "$size" "./asset/$(echo $svg).svg" -o "./asset/rendered/$(echo $svg)_$(echo $size).png" > /dev/null 2> /dev/null
    done &
done 

wait
