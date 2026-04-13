---
title: Locate Session Buddy Data on Your Device
slug: data-location-v4
image: ../../../assets/images/local-data-folders.svg
interimVisible: true
---

Session Buddy stores collections, history, and settings in folders on your device. This article explains how to locate, backup, and share this data with support.

## Local data location

To find the local data folders, follow these steps:

### 1. Find the current Chrome profile folder

A Session Buddy installation is specific to a Chrome profile.

To find the folder path for the current Chrome profile, see: [How to Locate the Current Chrome Profile Folder](/chrome-profile-location/).

### 2. Find the Session Buddy data folders

Go to the location of the Chrome profile obtained in Step 1. From this folder, go to the subfolder named `IndexedDB`.

In the `IndexedDB` folder, find the folder with the following name:

`chrome-extension_edacconmaakjimmfgnblocblbcdcpbko_0.indexeddb.leveldb`

This is the main Session Buddy data folder.

There may also be a folder with the following name:

`chrome-extension_edacconmaakjimmfgnblocblbcdcpbko_0.indexeddb.blob`

This folder is optional but in most cases it is present.

## Backing up local data

When setting up your system backup or manually backing up Session Buddy data, make sure to include the main folder as well as the second "blob" folder. Note that even if the second folder is not currently present, it may later be created by the browser as needed.

For help backing up and restoring these folders, see: [Back Up and Restore Local Data](/backup-restore-advanced/).

## Sharing local data with support

When sending data to support for troubleshooting, include both folders with all of their contents in a zip file.
