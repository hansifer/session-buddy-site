---
title: Known Issues
slug: known-issues
interimVisible: true
sidebar:
  order: 4
---

If you're encountering issues with Session Buddy, please review the following known problems and their potential solutions.

## Session Buddy won't open

A browser bug may occasionally prevent extensions from opening when their icons are clicked.

To fix this:

1. **Open the Session Buddy extension page:** Right-click its icon in the browser toolbar, then click "Manage extension"
2. **Enable developer mode:** Ensure that "Developer mode" is toggled on in the upper-right corner of this page
3. **Check service worker status:** Under "Inspect views", confirm that the "service worker" link shows as "(Inactive)", which would be expected if Session Buddy isn't opening when its icon is clicked.
4. **Disable/enable Session Buddy:** Toggle off the extension, wait a few seconds, then toggle it back on

Confirm that the "service worker" link no longer shows as "(Inactive)". If it does, repeat step 4 until it doesn't.

If after a few tries the "service worker" still shows as "(Inactive)", try restarting the browser.

We're actively exploring ways to work around this bug to eliminate the need for restarting the extension or browser.

## Snapshots are not being created

A known browser bug can sometimes suspend Session Buddy's snapshot cycle, halting the creation of snapshots.

To allow snapshots to resume as expected:

1. **Open the Session Buddy extension page:** Right-click its icon in the browser toolbar, then click "Manage extension"
2. **Enable developer mode:** Ensure that "Developer mode" is toggled on in the upper-right corner of this page
3. **Check service worker status:** Under "Inspect views", confirm that the "service worker" link shows as "(Inactive)", which would be expected if snapshots are stalled.
4. **Disable/enable Session Buddy:** Toggle off the extension, wait a few seconds, then toggle it back on

Confirm that the "service worker" link no longer shows as "(Inactive)". If it does, repeat step 4 until it doesn't.

If after a few tries the "service worker" still shows as "(Inactive)", try restarting the browser.

We're investigating methods to detect and automatically recover from this condition.

## Collections or history have disappeared

Session Buddy stores data locally, which can be vulnerable to browser bugs, disk cleaners, system crashes, abrupt power loss, and high disk space usage.

If you've discovered that your Session Buddy data has been wiped by the browser, follow one of the recovery steps below.

### Recover from a Session Buddy backup

If you've recently created a [Session Buddy backup](/backup-restore/), use the [Restore feature](/restore/) to recover your data.

### Recover from a system backup

You may be able to recover your [Session Buddy data](/data-location-v4/) from a system backup.

If you're unsure if you have a system backup solution in place, check the following:

- **Windows Users:** Check if [Windows Backup](https://support.microsoft.com/en-us/windows/back-up-and-restore-with-windows-backup-87a81f8a-78fa-456e-b521-ac0560e32338) or [Windows File History](https://support.microsoft.com/en-us/windows/backup-and-restore-with-file-history-7bf065bf-f1ea-0a78-c1cf-7dcf51cc8bfc) is enabled
- **Mac Users:** Verify if [Time Machine](https://support.apple.com/en-us/104984) is set up

Once you've recovered a recent version of the [Session Buddy data folders](/data-location-v4/), do the following:

1. **Backup Current Data:** [Create a backup](/backup-restore/) to ensure you have a copy of any collections or history created since the incident. Go to Session Buddy's gear menu, then select Backup.
2. **Close the Browser Completely:** Ensure all browser processes are terminated
3. **Replace Data Folders:** Delete the existing [data folders](/data-location-v4/) (or as a safer alternative, move them to another folder like Documents), then paste in the recovered folders
4. **Restart the Browser:** Open your browser and check if your Session Buddy data has been restored
5. **Restore Recent Data:** Use the [Restore feature](/restore/) to re-import any data backed up in step 1

Please note that for successful restoration, the entire contents of the data folders must be restored.

### Recommendations

We've been able to compensate for some of the risks of storing data locally, but it's impossible for an extension to fully protect against all of them. As such, we are working on a cloud storage feature that will eliminate the risks entirely.

In the meantime, it's highly recommended to regularly [back up your Session Buddy data](/backup-restore/) to facilitate easy recovery from unforeseen circumstances that might cause the browser to wipe data.

If you have a system backup in place, it's also a good idea to ensure that the [Session Buddy data folders](/data-location-v4/) are included in backups.
