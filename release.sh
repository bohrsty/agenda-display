#!/usr/bin/env bash

# This file is part of the agenda-display project.
#
# (c) Nils Bohrs
#
# For the full copyright and license information, please view the LICENSE.md
# file that was distributed with this source code.

# check required commands
# id
if ! command -v id &> /dev/null
then
  echo "id could not be found, exiting..."
  exit 1
fi
# jq
if ! command -v jq &> /dev/null
then
  echo "jq could not be found, exiting..."
  exit 1
fi

# check if run as root user
if [ $(id -u) -ne 0 ]
then
  echo "Need to be run as user root, exiting..."
  exit 1
fi

# build static client files
npm run build

# create release directory
RELEASE="$(jq -r .name < package.json)_$(jq -r .version < package.json)"
RELEASEDIR=/tmp/$RELEASE
mkdir -p "$RELEASEDIR"

# copy required files
cp *.md package.json package-lock.json docker-compose.yml .env.dist "$RELEASEDIR"

# copy static client directory
cp -r dist "$RELEASEDIR"

# copy api directory
cp -r src/server "$RELEASEDIR"

# adjust permissions for node container
chown -R 1000:1000 "$RELEASEDIR"

# prepare redis directory
mkdir -p "$RELEASEDIR"/db
chown 999:0 "$RELEASEDIR"/db

# compress release
SCRIPTPWD=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
SCRIPTPWDUG=$(stat -c %u:%g "$SCRIPTPWD")
cd /tmp
tar czf "$SCRIPTPWD/$RELEASE".tar.gz ./"$RELEASE"
chown $SCRIPTPWDUG "$SCRIPTPWD/$RELEASE".tar.gz

# cleanup
rm -rf "$RELEASEDIR"
cd "$SCRIPTPWD"
rm -rf dist

# finish
echo -e "\nsuccessfully created release file $SCRIPTPWD/$RELEASE.tar.gz\n"
exit 0
