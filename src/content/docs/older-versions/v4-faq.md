---
title: Session Buddy v4 FAQ
slug: v4-faq
interimVisible: true
---

Session Buddy v4 introduced a lot of important features and enhancements, but also some changes to the UI that may have caught long-time users off guard.

While these changes were necessary, we could have done a better job communicating them and explaining why they were being made.

We've been listening carefully to your feedback since v4 landed and have been busy rolling out follow-up [releases](/releases/) to address your concerns.

We're committed to continuing our active engagement with our user community to help us understand what remains to be done and how to further improve your experience.

This page was created to answer some of your most common questions and concerns about Session Buddy v4. If there's anything you'd like to discuss that's not addressed below, please reach out to support. We read every inquiry and make our best effort to respond quickly and meaningfully.

## Where did Previous Sessions go?

Previous Sessions have been moved to the History sidebar. You can access the sidebar by clicking on the "This browser" tile in the navigation sidebar on the left, then clicking the "History" button on the upper-right.

## What if my data did not automatically transfer from v3?

The upgrade to Session Buddy v4 includes automatic data migration from a deprecated database technology to the modern standard.

While the vast majority of users were able to take advantage of this automatic data migration, those upgrading *after* having upgraded to Chrome 124 (much more likely now than when Session Buddy v4 was first released) will need to transfer data manually due to Chrome deprecations.

To transfer your v3 data manually, follow the steps outlined [here](/restore-v3-data/)

## Where is my favorite feature from v3?

The initial release of Session Buddy v4 left behind a handful of v3 features. These omissions were a strategic decision driven by time pressure imposed by impending Chrome deprecations. The alternative would have been to delay the release, putting a significant number of users' data at risk.

While this situation was not ideal, we did our best to mitigate the impact by prioritizing cuts based on usage data and other signals. We also developed a plan to rapidly restore these features. We've already issued multiple follow-up [releases](/releases/) reinstating most of the missing functionality and are actively [continuing to address remaining regressions](/roadmap/).

## Why does CMD+B open Session Buddy?

This was a mistake. An immediate follow-up (v4.0.1) was released to fix this.

In some cases the shortcut binding may still need to be reset manually. If necessary, follow [these instructions](/mac-shortcut-bug/)

## Why can I no longer just click an "x" to close a tab?

Session Buddy v4 introduced the ability to select tabs and links, enabling powerful new capabilities such as opening, closing, or copying multiple tabs at once. As part of this new feature, the "x" was replaced by a checkbox to facilitate selection of individual items.

In response to demand, a follow-up release ([v4.0.2](/releases/4.0.2)) added an opt-in setting (under **Settings > General**) to revert this change to once again allow tabs/links to be closed/deleted with a single-click.

A future release will likely remove the need for this setting and show both an "x" and a checkbox on each item by default.

Note that regardless of whether the "x" is present, selected tabs can always be closed either by hitting the Delete key or right-clicking them and clicking Delete.

> **Pro tip**: holding the Shift key while closing/deleting suppresses confirmation. You can also disable confirmations altogether in settings.

## Why does opening lots of tabs from Session Buddy sometimes take a long time?

Prior to [v4.0.3](/releases/4.0.3), tab loading was automatically optimized if a lot of tabs were being opened at once. Optimization includes suspending tabs and delaying tab load.

After [v4.0.3](/releases/4.0.3), these optimizations were disabled by default. They can be opted into as needed in **Settings > Tabs**.

If you choose to turn on tab opening optimization, there are 2 [experiments](/experiments) that can be edited to tweak the behavior:

**Optimized tab open threshold**: number of tabs opened after which optimizations kick in.

**Optimized tab open delay**: number of milliseconds to delay each open.

## Why does destination selection fail when exporting?

In Session Buddy v4, the export feature normally allows for the selection of a folder to save the export file to.

In some cases, however, folder selection may be unsupported or blocked by a permission setting.

When this happens, Session Buddy as of [v4.0.4](/releases/4.0.4) falls back to a download option to allow the export to proceed, saving the export file to your preferred Downloads folder.

This behavior primarily affects users of the Brave browser since Brave [disables the File System Access API by default](https://github.com/brave/brave-browser/issues/18979).

To learn about enabling folder selection if blocked, see: [Troubleshooting Export](/troubleshooting-export/)

## Why are tab counts no longer displayed on tiles?

Counts on collection and history tiles were eliminated because of technical complexity related to tab filtering and ultimate support for cloud-based collections, our most-requested feature.

We may bring this back in some form based on feedback.

We recommend using expressive titles when possible to help identify collections rather than relying on counts.
