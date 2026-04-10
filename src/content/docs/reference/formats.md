---
title: Supported Formats
slug: formats
interimVisible: true
---

Session Buddy supports the representation of links and tabs in a variety of text formats that can be used to [import](/import-export/) collections, add links to collections, or open multiple tabs at once.

A format can also be applied when [exporting collections](/import-export/#export).

<div id="import" style="margin-top:-80px;position:absolute;"></div>

## Importing, adding links, and opening tabs

You can [import](/import-export/), add links to collections, or open tabs in any of the formats listed below.

The format is automatically detected when text is pasted or a file is dropped. If Session Buddy is unable to detect the format or guesses it incorrectly, you can select the desired format from the Format dropdown.

### Free-form

When **Free-form** is selected, Session Buddy attempts to extract URLs from arbitrary text using pattern matching.

**Free-form** is technically not a format, as it's suitable for unstructured text without specific formatting rules.

When format detection is turned on but no known format matches the supplied text, format selection defaults to **Free-form**.

### URLs

A flat list of URLs.

Every non-blank line must be a valid URL.

Blank lines are ignored.

Example:

```
https://www.google.com/search?q=dog+breeds
https://en.wikipedia.org/wiki/German_Shepherd
https://www.google.com/search?q=Labrador+Retriever
https://www.youtube.com/results?search_query=Golden+Retriever
```

### Title/URL pairs

A flat list of URLs with titles.

Each title/URL pair must be a non-blank title followed by a valid URL on the next line.

Each pair must be separated by at least one blank line.

Example:

```
dog breeds - Google Search
https://www.google.com/search?q=dog+breeds

German Shepherd - Wikipedia
https://en.wikipedia.org/wiki/German_Shepherd

Golden Retriever - YouTube
https://www.youtube.com/results?search_query=Golden+Retriever
```

### Groups of URLs

A flat list of URLs.

A non-blank line must be a valid URL.

A contiguous list of URLs defines a group (ie, a folder or window). A blank line creates a new group.

Example (2 groups):

```
https://en.wikipedia.org/wiki/German_Shepherd
https://www.youtube.com/results?search_query=Golden+Retriever

https://en.wikipedia.org/wiki/Siamese_cat
https://www.google.com/search?q=British+Shorthair
https://www.youtube.com/results?search_query=Ragdoll+kitten
```

### Named groups of URLs

Similar to **Groups of URLs**, but every contiguous list of URLs must be preceded by a group name.

A group name must be separated from the previous group by a blank line and followed by a blank line.

Example (2 groups):

```
Dogs

https://en.wikipedia.org/wiki/German_Shepherd
https://www.youtube.com/results?search_query=Golden+Retriever

Cats

https://en.wikipedia.org/wiki/Siamese_cat
https://www.google.com/search?q=British+Shorthair
https://www.youtube.com/results?search_query=Ragdoll+kitten
```

### Named groups of title/URL pairs

Like **Named groups of URLs**, but each group is a list of blank-line-separated title/URL pairs.

Example (2 groups):

```
Dogs

German Shepherd - Wikipedia
https://en.wikipedia.org/wiki/German_Shepherd

Golden Retriever - YouTube
https://www.youtube.com/results?search_query=Golden+Retriever

Cats

Siamese cat - Wikipedia
https://en.wikipedia.org/wiki/Siamese_cat

British Shorthair - Google Search
https://www.google.com/search?q=British+Shorthair

Ragdoll kitten - YouTube
https://www.youtube.com/results?search_query=Ragdoll+kitten
```

### Indented groups of URLs

A hierarchy of one of the following:

- collection names, folder names, and URLs
- folder names and URLs

Top level items, which may be either collection names or folder names, must not be indented (ie, have no leading whitespace).

Each nested level of the hierarchy must be indented accordingly with leading whitespace. An individual indent can be any combination of space or tab, but the characters used for indents must be consistent. For example, if folder names are indented by two spaces, URLs must be indented by four spaces.

Blank lines are ignored, but collection names and folder names are typically preceded and followed by a blank line for readability.

Empty collections or folders are not allowed.

Example (2 collections, 3 folders):

```
Furry pets

  Dogs

    https://en.wikipedia.org/wiki/German_Shepherd
    https://www.youtube.com/results?search_query=Golden+Retriever

  Cats

    https://en.wikipedia.org/wiki/Siamese_cat
    https://www.google.com/search?q=British+Shorthair
    https://www.youtube.com/results?search_query=Ragdoll+kitten

Reptiles

  Lizards

    https://www.youtube.com/results?search_query=Bearded+Dragon
    https://en.wikipedia.org/wiki/Gecko
```

### Indented groups of title/URL pairs

Like **Indented groups of URLs**, but for blank-line-separated title/URL pairs instead of URLs.

Example (2 collections, 3 folders):

```
Furry pets

  Dogs

    German Shepherd - Wikipedia
    https://en.wikipedia.org/wiki/German_Shepherd

    Golden Retriever - YouTube
    https://www.youtube.com/results?search_query=Golden+Retriever

  Cats

    Siamese cat - Wikipedia
    https://en.wikipedia.org/wiki/Siamese_cat

    British Shorthair - Google Search
    https://www.google.com/search?q=British+Shorthair

    Ragdoll kitten - YouTube
    https://www.youtube.com/results?search_query=Ragdoll+kitten

Reptiles

  Lizards

    Bearded Dragon - YouTube
    https://www.youtube.com/results?search_query=Bearded+Dragon

    Gecko - Wikipedia
    https://en.wikipedia.org/wiki/Gecko
```


<div id="import-json" style="margin-top:-80px;position:absolute;"></div>

### JSON

[JSON](https://www.json.org/json-en.html) in either array or object form:

<div id="json-array-forms" style="margin-top:-80px;position:absolute;"></div>

**Array forms:**

- An array of collection objects
- An array of folder objects
- An array of link objects

<div id="json-object-forms" style="margin-top:-80px;position:absolute;"></div>

**Object forms:**

- An object with a `"collections"` property that is an array of collection objects
- An object with a `"sessions"` property that is an array of session objects
- An object with a `"folders"` property that is an array of folder objects
- An object with a `"windows"` property that is an array of window objects
- An object with a `"links"` property that is an array of link objects
- An object with a `"tabs"` property that is an array of tab objects

Note that Session Buddy v4 and v3 backups are compatible with the first two object forms, respectively.

**Collection/Session object properties:**

- `"title"`: optional string. Overridden by the `"name"` property if present.
- `"created"`: optional number representing time in milliseconds that has elapsed since the [epoch](https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-time-values-and-time-range).
- `"updated"`: optional number representing time in milliseconds that has elapsed since the [epoch](https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-time-values-and-time-range).
- `"folders"` or `"windows"`: array of folder or window objects.

**Folder/Window object properties:**

- `"title"`: optional string. Overridden by the `"name"` property if present.
- `"incognito"`: optional boolean (true/false).
- `"top"`: optional number.
- `"left"`: optional number.
- `"width"`: optional number.
- `"height"`: optional number.
- `"state"`: optional string. One of: "normal", "minimized", "maximized", or "fullscreen".
- `"type"`: optional string. One of: "normal", "popup", "panel", "app", or "devtools".
- `"links"` or `"tabs"`: array of link or tab objects.

**Link/Tab object properties:**

- `"url"`: required string.
- `"title"`: optional string.
- `"favIconUrl"`: optional string.
- `"pinned"`: optional boolean (true/false).
- `"active"`: optional boolean (true/false).
- `"groupId"`: optional number.

Example (2 collections, 4 folders):

```json
{
  "collections": [
    {
      "title": "Furry friends",
      "folders": [
        {
          "title": "Dogs",
          "links": [
            {
              "title": "German Shepherd - Wikipedia",
              "url": "https://en.wikipedia.org/wiki/German_Shepherd",
              "favIconUrl": "https://en.wikipedia.org/static/favicon/wikipedia.ico"
            },
            {
              "title": "Labrador Retriever - Google Search",
              "url": "https://www.google.com/search?q=Labrador+Retriever",
              "favIconUrl": "https://www.google.com/favicon.ico"
            }
          ]
        },
        {
          "title": "Cats",
          "state": "normal",
          "links": [
            {
              "title": "Ragdoll kitten - YouTube",
              "url": "https://www.youtube.com/results?search_query=Ragdoll+kitten"
            }
          ]
        }
      ]
    },
    {
      "title": "Reptiles",
      "folders": [
        {
          "title": "Snakes",
          "state": "maximized",
          "incognito": true,
          "links": [
            {
              "title": "Boa constrictor - Wikipedia",
              "url": "https://en.wikipedia.org/wiki/Boa_constrictor",
              "pinned": true
            },
            {
              "title": "Ball python - Wikipedia",
              "url": "https://en.wikipedia.org/wiki/Ball_python",
              "favIconUrl": "https://en.wikipedia.org/static/favicon/wikipedia.ico"
            },
            {
              "title": "Garter Snake - YouTube",
              "url": "https://www.youtube.com/results?search_query=Garter+Snake",
              "favIconUrl": "https://www.youtube.com/s/desktop/ee47b5e0/img/logos/favicon_32x32.png"
            }
          ]
        },
        {
          "title": "Lizards",
          "top": 25,
          "left": 50,
          "width": 1034,
          "height": 560,
          "links": [
            {
              "title": "Bearded Dragon - YouTube",
              "url": "https://www.youtube.com/results?search_query=Bearded+Dragon",
              "favIconUrl": "https://www.youtube.com/s/desktop/ee47b5e0/img/logos/favicon_32x32.png"
            },
            {
              "title": "Gecko - Wikipedia",
              "url": "https://en.wikipedia.org/wiki/Gecko"
            }
          ]
        }
      ]
    }
  ]
}
```

### CSV

A [CSV](https://www.ietf.org/rfc/rfc4180.txt) representation of links with optional collection and/or folder grouping columns. A header row is required and must include a `URL` column.

The following columns are recognized. Every column is optional except `URL`.

- `Collection` or `Session`: case-sensitive collection names. Cannot be blank.
- `Folder` or `Window`: case-sensitive folder names. Cannot be blank. This column is required if a `Collection` or `Session` column exists.
- `URL`: required.
- `Title`
- `FavIconURL`
- `Pinned`: "true" or "false".
- `Active`: "true" or "false".
- `GroupId`: must be a number.

Example (2 collections, 4 folders):

```csv
Collection,Folder,Title,URL
"Furry, adorable",Dogs,German Shepherd - Wikipedia,https://en.wikipedia.org/wiki/German_Shepherd
"Furry, adorable",Dogs,Labrador Retriever - Google Search,https://www.google.com/search?q=Labrador+Retriever
"Furry, adorable",Cats,Ragdoll kitten - YouTube,https://www.youtube.com/results?search_query=Ragdoll+kitten
Reptiles,Snakes,Boa constrictor - Wikipedia,https://en.wikipedia.org/wiki/Boa_constrictor
Reptiles,Snakes,Ball python - Wikipedia,https://en.wikipedia.org/wiki/Ball_python
Reptiles,Snakes,Garter Snake - YouTube,https://www.youtube.com/results?search_query=Garter+Snake
Reptiles,Lizards,Bearded Dragon - YouTube,https://www.youtube.com/results?search_query=Bearded+Dragon
Reptiles,Lizards,Gecko - Wikipedia,https://en.wikipedia.org/wiki/Gecko
```

<div id="large-files" style="margin-top:-80px;position:absolute;"></div>

### Large files

Files containing importable text that are larger than 1M are considered "large files". To accommodate device memory limitations, large files are handled differently from smaller ones.

#### Adding links/opening tabs

Large files cannot be used when adding links to collections or opening tabs.

#### Importing

Large files can be imported, but they must have a .json file extension and follow the [Session Buddy JSON format](#import-json).

When a valid large file is dropped into the Import dialog, the file is scanned for collections. This could take a few seconds. Once scanned, you will see a file icon and the filename instead of the file's contents.

Session Buddy is only able to find collections in large files that contain a [JSON object](#json-object-forms). If the JSON is in [array form](#json-array-forms), no collections will be found.

#### Customizing the threshold

By default, files are considered large if they exceed 1M.

You can customize this threshold to better match your device's available memory through the `ingest-max-size` [experiment](/experiments/).

<div id="export" style="margin-top:-80px;position:absolute;"></div>

## Export

Collections can be exported in any of the following formats:

### URLs

A flat list of URLs. Ideal for including a set of links in an email message, chat, or blog post.

### Title/URL pairs

A flat list of URLs with titles, each separated by a blank line. Ideal for including a set of links in an email message, chat, or blog post.

Missing titles print as "Untitled".

### Indented groups of URLs

A hierarchy of collection titles, folder titles, and URLs.

Folder titles are indented once with 2 spaces and URLs are indented twice with 4 spaces.

Missing collection and folder titles show up as "Collection 1", "Folder 2", etc.

### Indented groups of title/URL pairs

Same as **Indented groups of URLs**, but with blank-line-separated title/URL pairs instead of URLs.

Missing link titles show up as "Untitled".

### JSON

A pretty-printed [JSON](https://www.json.org/json-en.html) object with a `"collections"` property that is an array of collection objects. Great for feeding collections to other applications.

**Collection object properties:**

- `"title"`
- `"folders"`: array of folder objects.

**Folder object properties:**

- `"title"`
- `"type"`: one of: "normal", "popup", "panel", "app", or "devtools".
- `"state"`: one of: "normal", "minimized", "maximized", or "fullscreen".
- `"incognito"`: boolean (true/false).
- `"top"`: number.
- `"left"`: number.
- `"width"`: number.
- `"height"`: number.
- `"links"`: array of link objects.

**Link object properties:**

- `"title"`
- `"titleOriginal"`: the original link title if edited in Session Buddy.
- `"url"`
- `"favIconUrl"`: the URL of the link's icon.
- `"active"`: boolean (true/false).
- `"pinned"`: boolean (true/false).
- `"groupId"`: number.

### CSV

A [CSV](https://www.ietf.org/rfc/rfc4180.txt) representation of links with collection and folder groupings. Well-suited for import into spreadsheets.

Columns included are: `Collection`, `Folder`, `Title`, `URL`, `favIconUrl`

Collection values are collection titles (or "Collection 1", "Collection 2", etc if untitled).

Folder values are folder titles (or "Folder 1", "Folder 2", etc if untitled).
