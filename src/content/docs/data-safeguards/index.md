---
title: Data Safeguards
interimVisible: true
---

Session Buddy stores collections, history, and settings on your device.

This post explains the limitations inherent to this type of data storage and what you can do to guard against circumstances that can lead to data loss in some cases.

For a more in-depth analysis, see [Understanding and Preventing Data Loss](/data-reliability/).

## Extension local storage vulnerabilities

Data that a browser extension stores on your device can in some cases get deleted or corrupted due to circumstances beyond the extension's control.

Some of the factors known to contribute to such data loss are:

- Low disk space
- Folders where the data is stored being deleted or corrupted by an external process such as:
  - OS cleaners (eg, CCleaner, Avast Cleanup)
  - anti-virus or anti-malware software
  - scheduled backups
  - Windows Restore
- Browsing data or site data being cleared, automatically or intentionally
- The extension being reset, disabled, or uninstalled by the browser
- Browser profile corruption, possibly caused by a browser update or power outage
- A browser or OS crash
- Browser bugs
- The usual risk factors associated with storing data in a single location, such as hardware failure and device theft

## What you can do to protect your Session Buddy data

An opt-in cloud storage feature is currently in the works. This will, among other benefits, be the easiest and most reliable way to eliminate the risks related to storing data locally.

In the meantime, we recommend you follow the measures outlined below to give you the peace of mind of a data recovery option should you need it.

### System backups

Include [the local Session Buddy data folders](/data-location-v4) in your scheduled system backups as outlined [here](/backup-restore-advanced/).

### Manual backups

Although less convenient, we recommend setting a daily, weekly, or monthly reminder to manually create a backup through Session Buddy's [Backup feature](/backup-restore/).

A backup file can be used to quickly restore your collections and history using Session Buddy's [Restore feature](/restore/).
