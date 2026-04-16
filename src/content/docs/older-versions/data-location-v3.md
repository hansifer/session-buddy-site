---
title: Locate Session Buddy v3 Data on Your Device
tabTitle: Locate Session Buddy v3 Data
slug: data-location-v3
interimVisible: true
---

Session Buddy v3 *(now deprecated)* stored Saved Sessions, Previous Sessions, and settings in a single file on your computer.

Chrome has recently removed this file as part of its [Web SQL deprecation](https://developer.chrome.com/blog/deprecating-web-sql). However, if you're using an older version of Chrome it may still be present.

To find the file, follow these steps:

## 1. Find the current Chrome profile folder

A Session Buddy installation is specific to a Chrome profile.

To find the folder path for the current Chrome profile, see: [Locate the Current Chrome Profile Folder](/chrome-profile-location/).

## 2. Find the Session Buddy database file

Go to the location of the Chrome profile obtained in Step 1.

From this folder, go to the subfolder named **databases**.

From there, go to the subfolder named **chrome-extension_edacconmaakjimmfgnblocblbcdcpbko_0**.

This folder contains your Session Buddy v3 database file. The file will have a numeric name like **1** or **2**.

If there is more than one such file, the current file is the one with the highest number. This should also be the file with the most recent modification date and largest size.
