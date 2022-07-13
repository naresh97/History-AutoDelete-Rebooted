#!/usr/bin/env bash
echo "Building"

EXTENSIONNAME="History-AutoDelete-Rebooted"
DES=builds
if [ -z "$TRAVIS_TAG" ]
 then TRAVIS_TAG=$(date +"%y%m%d"_%H%M)
 fi

FIREFOXFILENAME=${EXTENSIONNAME}_Firefox_Dev
CHROMEFILENAME=${EXTENSIONNAME}_Chrome_Dev

mkdir -p $DES
cd extension/

rm ${FIREFOXFILENAME}.xpi
zip -r ${FIREFOXFILENAME}.xpi *
mv ${FIREFOXFILENAME}.xpi ../$DES/

sed -i '/contextualIdentities/d' manifest.json
sed -i '/applications/,+5d' manifest.json

rm ${CHROMEFILENAME}.zip
zip -r ${CHROMEFILENAME}.zip *
mv ${CHROMEFILENAME}.zip ../$DES/

echo "Package done."
