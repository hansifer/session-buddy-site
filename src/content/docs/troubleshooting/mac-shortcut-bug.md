---
title: Mac Keyboard Shortcut Bug
slug: mac-shortcut-bug
interimVisible: true
---

The initial Session Buddy [v4 update](/v4/) mistakenly assigned the default keyboard shortcut for opening a new Session Buddy tab to `cmd+b`.

This is almost certainly not what you want, since `cmd+b` is a common keyboard shortcut in other applications.

This was promptly corrected in a [follow-up release](/release-4-0-1/), but in some cases it may be necessary to reset this shortcut manually.

To reset the keyboard shortcut:

1. In Session Buddy, click on the gear menu in the upper right-hand corner, then click "Settings"
2. In the Settings dialog, click the "General" tab
3. Click the "Open extension shortcuts" button. This opens the Chrome extension keyboard shortcuts page.
4. Scroll to the Session Buddy card and click the pencil icon next to the shortcut labeled "Activate the extension"
5. Click outside of the shortcut text box and ensure the shortcut reads "Not set"
