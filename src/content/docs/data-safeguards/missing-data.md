---
title: Data Consistency
slug: data-consistency
interimVisible: true
---

There's a [known issue](https://chromestatus.com/feature/5140210640486400) related to storing data locally in the browser that can sometimes lead to corruption of extension data.

This issue arises because the files used to store extension data can be deleted by any app running on your device. Browsers do not prevent this or provide recovery.

The most common culprits are disk cleaner tools, which often target these files for removal.

Session Buddy actively monitors your data and alerts you when anomalies are detected. When notified, you have the option to repair the data to restore normal access to your collections and history.

Although this type of data corruption is relatively rare, there are simple steps you can take to eliminate the risk altogether.

## Check for Disk Cleaners

Some apps designed to "clean up" your files sometimes target extension data. Check whether your device has disk cleaners installed or enabled through your OS. Common tools include Disk Cleanup, CCleaner, WinToys, AVG PC Tune Up, Microsoft PC Manager, and BleachBit.

If you use one, review its settings to ensure that the [Session Buddy data folders](/data-location-v4/) are excluded from cleanup.

If your disk cleaner does not allow exclusions for individual folders, look for broader categories such as "Browser data" or "IndexedDB" that can be opted out of. In the case of CCleaner, for example, uncheck "Internet Cache".

Some anti-virus and anti-malware apps may also include "clean up" features.

## Backup

### Through Session Buddy

Session Buddy allows you to manually [back up your data](/backup-restore/) from its gear menu.

Regular backups are recommended. Having a backup file makes recovery simple using Session Buddy's [Restore feature](/restore/), also accessible from the gear menu.

### System backups

If you prefer an automated solution, ensure you have a system backup in place that includes Session Buddy's extension data folders, as recommended [here](/backup-restore-advanced/).

Options include [Windows Backup](https://support.microsoft.com/en-us/windows/back-up-and-restore-with-windows-backup-87a81f8a-78fa-456e-b521-ac0560e32338), [Windows File History](https://support.microsoft.com/en-us/windows/backup-and-restore-with-file-history-7bf065bf-f1ea-0a78-c1cf-7dcf51cc8bfc), [Time Machine](https://support.apple.com/en-us/104984) for macOS, or third-party solutions like Acronis.

### Looking forward

We're actively working on a cloud storage feature that will provide an easy alternative to manual backups and system-based solutions for protecting your Session Buddy data.
