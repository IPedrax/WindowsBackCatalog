<div align="center">
  <img src="docs/icons/disc.svg" width="56" alt="" />
  <h1>Windows Back Catalog</h1>
  <p><em>Microsoft still hosts the ISO for <strong>every Windows release it ever shipped</strong>. The download page just stopped listing them. This puts them back.</em></p>
</div>

One snippet in the console on Microsoft's own
[Windows 11 download page](https://www.microsoft.com/en-us/software-download/windows11)
and the edition dropdown comes back with Windows 7, 8.1, 10 and older Windows 11
builds in it. Pick one, pick a language, and Microsoft hands you a real download
link from its own CDN. No third-party mirror, no torrent, no "activator" bundled
in by whoever re-uploaded it.

---

## <img src="docs/icons/terminal.svg" width="20" align="absmiddle" alt="" /> Use it once

1. Open <https://www.microsoft.com/en-us/software-download/windows11> in Chrome, Edge or Firefox.
2. Press <kbd>F12</kbd> and go to the **Console** tab.
3. Paste the contents of [`windows-editions.js`](windows-editions.js) and press <kbd>Enter</kbd>.
   (Edge and Chrome make you type `allow pasting` the first time. That warning is
   there for good reason: read anything you paste into a console, including this.)
4. The dropdown now says *Select edition*. Pick one, hit **Download**, choose a
   language, and take the 64-bit link.

Reloading the page undoes everything. Nothing is installed and nothing is stored.

## <img src="docs/icons/bookmark.svg" width="20" align="absmiddle" alt="" /> Or keep it as a bookmarklet

Worth two minutes if you rebuild machines more than once a year.

1. Bookmark any page, then edit that bookmark (Chrome and Edge: <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd>; Firefox: <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd>).
2. Name it **Windows Back Catalog** and replace the **URL** with the single line in
   [`bookmarklet.txt`](bookmarklet.txt).
3. On the Microsoft download page, click the bookmark. Same result, no DevTools.

Keep it on the bookmarks bar and the whole thing is one click. It is the same
code as the console version, minified, with two changes that only matter here: it
uses `getElementById` rather than a `#product-edition` selector, because a `#` in a
bookmark URL is read as a fragment and truncates the script, and it reports failure
with an `alert` rather than `console.log`, since the console is closed.

## <img src="docs/icons/list.svg" width="20" align="absmiddle" alt="" /> What ends up in the dropdown

The last public build of each line, which is what you actually want to install from:

| Release | Editions offered |
|---|---|
| **Windows 7 SP1** (7601) | Starter, Home Basic, Home Premium (+N), Professional (+N), Ultimate (+N) |
| **Windows 8.1** (9600.17415) | 8.1, N, K, KN, Single Language, Professional LE (+N/K/KN) |
| **Windows 10 22H2** (19045.2965) | Multi-edition, plus Home China (19045.2006) |
| **Windows 11 24H2** (26100.1742) | x64, Arm64 |
| **Windows 11 25H2** (26200.6584) | x64, Arm64 |

`N` editions ship without Windows Media Player, `K`/`KN` are the Korean variants,
and `LE` is the discounted "with Bing" build. If you don't specifically need one of
those, take the plain edition.

## <img src="docs/icons/layers.svg" width="20" align="absmiddle" alt="" /> How it works

The dropdown is a filter, not a catalogue. Every option carries a numeric
**product edition ID**, and the page posts that ID to Microsoft's own service at
`https://www.microsoft.com/software-download-connector/api/` to get back the SKU
list and, after the language step, the signed download URL.

Microsoft removed the old options from the page. It never removed the IDs from the
service behind it. The script only rewrites the `<option>` list and fires a
`change` event so the page's own handler runs, exactly as if you had clicked an
option that Microsoft still listed. Everything after that is Microsoft's normal
flow, untouched.

Which is also why this is not a download tool. It cannot fetch anything, cannot
bypass anything, and stops working the moment Microsoft takes an ID offline.

## <img src="docs/icons/alert.svg" width="20" align="absmiddle" alt="" /> The limitations that will bite you

- **A VPN or datacenter IP gets you refused.** Microsoft blocks the service from
  known anonymising ranges and answers with *"We are unable to complete your
  request at this time"* (error `715-123130`). That message is sitting in the
  page's own source, waiting. Turn the VPN off for the download.
- **The download link expires in 24 hours** and is tied to the session that made
  it. Copy it into a download manager if you like, but don't bookmark it.
- **The script wipes the option Microsoft did list.** The current Windows 11 build
  is a real option on the untouched page; the snippet replaces the whole list, so
  that one goes with it. Reload to get it back.
- **Old editions have fewer languages.** The language step is Microsoft's and it
  only offers what actually exists for that SKU.
- **An ID can go dead.** If one edition errors while its neighbours work, Microsoft
  pulled that build. Nothing in this repo can fix that.
- **Windows 7 and 8.1 are out of support.** No security updates since January 2020
  and January 2023. Installing one on a machine that touches the internet is a bad
  idea, and saying so is not the same as refusing to hand you the ISO.

## <img src="docs/icons/key.svg" width="20" align="absmiddle" alt="" /> An ISO is not a licence

This gets you the installation media Microsoft publishes for free. It does not get
you a product key, and it is not a workaround for one. Bring your own licence.

## <img src="docs/icons/shield.svg" width="20" align="absmiddle" alt="" /> Verify what you downloaded

The point of pulling from Microsoft directly is that the file is checkable. Compare
the hash against Microsoft's published SHA-256 for that build before you write it
to a USB stick:

```powershell
Get-FileHash .\Win11_25H2_English_x64.iso -Algorithm SHA256
```

## <img src="docs/icons/file.svg" width="20" align="absmiddle" alt="" /> Licence

[MIT](LICENSE). The edition IDs are Microsoft's; this repo is thirty lines of
JavaScript that types them into a dropdown for you.
