---
title: Understanding and Preventing Data Loss
tabTitle: Preventing Data Loss
slug: data-reliability
interimVisible: true
---

We have received some reports about spontaneous loss of collection and history data in Session Buddy. This post outlines what we know about this issue, what you can do to protect yourself, and our plans to address the problem.

### Overview

At a high level, the problem stems from the fact that the data extensions store locally is inherently vulnerable to browser bugs, disk cleaners, system crashes, power loss, high disk space usage, and other factors. This problem is not unique to Session Buddy. Any data stored locally by extensions is at risk.

While reports involving permanent data loss are statistically rare, it is critical for us to prioritize the pursuit of remedies as any risk to data is unacceptable.

### Symptoms

Data loss in Session Buddy may follow or be accompanied by:

- A browser prompt to "repair" the extension due to corruption. Proceeding with the repair then clears the data Session Buddy stores locally.
- A blank screen when opening Session Buddy
- An empty collection or history list
- IndexedDB errors in [the console](https://sessionbuddy.com/console/) during startup or operation

Data loss may be limited to either collections or history or in some cases affect all extension data, including settings.

### Causes

The fundamental problem is that Session Buddy data is stored locally and the underlying storage mechanisms are controlled by the browser.

While storing data this way has benefits (privacy, cost, performance, simplicity), it is not 100% reliable.

Some factors that jeopardize local data are expected and well-understood, while some are not.

#### Expected causes

- Low Disk Space: Browsers may delete local extension data under disk space pressure.
- System Maintenance: Data can be deleted by system maintenance processes, file restores, or disk cleanup tools.
- User Actions: Some users have an expectation of data persistence that may lead them to uninstall an extension, clear browser data, or run cleaner tools without first backing up data.

Unfortunately there is not much an extension can do to prevent deletion in these cases. It can only try to account for it after the fact.

#### Unexpected causes

User reports and testimony from other extension developers indicate the presence of data corruption bugs in browsers, their implementation of IndexedDB, and/or third-party IndexedDB libraries.

Unfortunately there is very little information about these kinds of bugs as they tend to be multivariate and difficult to reproduce.

Some evidence suggests that occurrences of data corruption may be correlated with browser updates, extension updates, power outages, or system crashes but there is no specific information available related to these factors.

Based on reports, a correlating condition may be having Session Buddy open in multiple tabs.

### Diagnosis

If you encounter a data problem while using Session Buddy (eg, blank screen, empty collection list), do the following:

1. Save Data: Open the Session Buddy [console](https://sessionbuddy.com/console/) and execute the following [command](https://sessionbuddy.com/console-command/): `saveData()`

   This creates a download file of all collections and history.

   Open this file in a text editor and check that collection and history data is present. If "collections" or "events" is `null`, it means there's a problem accessing the corresponding data store.

2. Save Diagnostics: In the [console](https://sessionbuddy.com/console/), execute the following [command](https://sessionbuddy.com/console-command/): `saveDiagnostics()`

   This creates a download file with information that can be used for troubleshooting.

   [Send us](mailto:support@sessionbuddy.com) this file along with a description of what happened and any errors presented in the [console](https://sessionbuddy.com/console/).

3. Restart the Browser: In some cases the browser may recover from data access issues. Restart your browser to see if that resolves the problem. If not, try restarting your device.

### Solutions

#### User Backups

Users can protect themselves by regularly [backing up collections and history through Session Buddy](https://sessionbuddy.com/backup-restore/).

As an automated option, Session Buddy data folders can be included in scheduled system backups (Windows Backup, Time Machine, or a 3rd party solution) as recommended [here](https://sessionbuddy.com/backup-restore-advanced/).

#### Education

We've posted about [data risks and safeguards](https://sessionbuddy.com/data-safeguards/) in the Session Buddy user forum, but we may need to take more proactive measures to educate users about this topic, possibly via app notifications.

We have plans to add a notification for when data usage is approaching quota to alert users of increased risk of data eviction so they can take appropriate steps like exporting a backup or deleting old collections and history.

#### Workarounds for Data Corruption Bugs

To-date, we have discovered three issues related to data corruption caused by browser bugs and limitations and addressed them as follows:

- Added automatic detection, notification, and repair of data inconsistencies caused by other apps like disk cleaners that resulted in collections or history events failing to display correctly.
- Added a workaround for a browser bug resulting in occasional empty values being saved, which in turn prevented events from displaying properly.
- Upgraded to the latest version of Dexie which includes automatic recovery from transaction and write operation failures due to Chrome IndexedDB bugs.

We will continue to:

- Research and monitor development resources and Chromium issues and investigate measures as new information comes to light.
- Expand our test suite in pursuit of conditions that reliably produce data failures.
- Evaluate diagnostics as they're shared, as this kind of data can be extremely helpful for identifying failure patterns.

#### Automated Backups via Extension Storage

We are working on an [experimental automated backup solution](https://sessionbuddy.com/release-4-1-0/) that will protect against any corruption that targets IndexedDB (Session Buddy's primary database).

This is expected to significantly improve recovery in the event that the browser unexpectedly wipes data, but remains a partial solution since backups may lag behind recent changes by up to 24 hours and this data would still be subject to browser control (and therefore effects like quota restrictions, users and tools clearing site data, and browser bugs).

#### Automated Backups via Downloads

We're currently investigating download-based automated backups as a potential solution.

While potentially viable, this approach comes with some known technical limitations. For example, automated downloads can only be saved to the Downloads folder and browser settings may influence download behavior.

More significantly, streaming dynamically generated content to a download is not yet directly supported by browsers. That makes download-based backups unsuitable for larger backups (not uncommon). One way to get around this is to split the download into multiple files, but this complicates the restore process for users.

Finally, it's important to keep in mind that any type of automated backup remains a partial solution since it doesn't provide coverage for interim updates.

#### Cloud Storage

Cloud storage is the ultimate remedy for all risks related to storing data locally. As such, we are currently developing a cloud offering that, in addition to data reliability, introduces benefits such as data sync across browser profiles and access to collections from mobile devices and public browsers.
