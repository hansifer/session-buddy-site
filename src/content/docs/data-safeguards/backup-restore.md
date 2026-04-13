---
title: Backup and Restore
slug: backup-restore
image: ../../../assets/images/backup-restore.svg
interimVisible: true
sidebar:
  order: 2
---

Session Buddy offers a Backup and Restore feature that:

- Safeguards your collections and history, allowing recovery from data loss due to unforeseen browser issues or system malfunctions
- Facilitates seamless data transfer should re-installing Session Buddy be necessary, such as when setting up a new computer

> It's highly recommended that you use this feature to create regular backups.

## Creating a Backup

To back up your Session Buddy data to a file that includes all your saved collections and history:

1. Click the gear icon within Session Buddy.
2. Select "Backup" from the dropdown menu.
3. In the Backup dialog, click "Select destination" to choose the location and filename for the backup.

> If your browser [doesn't support location selection](/troubleshooting-export/), this button will read "Download" and the file will be saved to your default downloads folder.

4. Wait for backup to complete. The final count of collections and history events backed up will be displayed once the backup file is created.

You can perform backups as often as you like. Each operation creates a new backup file.

## Restoring Data from a Backup

To recover collections and history from a backup file:

1. Click the gear icon in Session Buddy.
2. Select "Restore" from the dropdown menu.
3. In the Restore dialog, drag and drop your backup file into the designated area.
4. Once dropped, Session Buddy will review the file and let you know how many collections and history events were found.
5. Click the "Restore" button to proceed.
6. Once restore completes, you can close the dialog. After you do so, newly-added collections will appear in the navigation sidebar.

Since restore adds only the collections and history events that haven't already been restored, the same backup file can be restored multiple times without the risk of creating duplicates.

For more about restore, see [Restore](/restore/).

For more advanced backup and restoration procedures, refer to [Back Up and Restore Local Data](/backup-restore-advanced/).
