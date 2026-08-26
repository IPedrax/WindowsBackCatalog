# windows-iso-editions

Microsoft still hosts the ISO for every Windows release it ever shipped. The
download page just stopped listing them.

Paste [one snippet](windows-editions.js) into the console on Microsoft's own
[Windows 11 download page](https://www.microsoft.com/en-us/software-download/windows11)
and the edition dropdown comes back with Windows 7, 8.1, 10 and older Windows 11
builds in it. Pick one, pick a language, and Microsoft hands you a real download
link from its own CDN. No third-party mirror, no torrent, no "activator" bundled
in by whoever re-uploaded it.

---

## Use it

1. Open <https://www.microsoft.com/en-us/software-download/windows11> in Chrome, Edge or Firefox.
2. Press <kbd>F12</kbd> and go to the **Console** tab.
3. Paste the contents of [`windows-editions.js`](windows-editions.js) and press <kbd>Enter</kbd>.
   (Edge and Chrome ask you to type `allow pasting` the first time. That warning is
   there for good reason: read anything you paste into a console, including this.)
4. The dropdown now says *Select edition*. Pick one, hit **Download**, choose a
   language, and take the 64-bit link.

Reloading the page undoes everything. Nothing is installed and nothing is stored.

## What ends up in the dropdown

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

## How it works

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

## The limitations that will bite you

- **A VPN or datacenter IP gets you refused.** Microsoft blocks the service from
  known anonymising ranges and answers with *"We are unable to complete your
  request at this time"* (error `715-123130`). That message is in the page's own
  source, waiting. Turn the VPN off for the download.
- **The download link expires in 24 hours** and is tied to the session that made
  it. Copy it to a download manager if you like, but don't bookmark it.
- **The script wipes the option Microsoft did list.** The current Windows 11 build
  is a real option on the untouched page; the snippet replaces the whole list, so
  that one goes with it. Reload to get it back.
- **Old editions have fewer languages.** The language step is Microsoft's and it
  only offers what actually exists for that SKU.
- **An ID can go dead.** If an edition returns an error while its neighbours work,
  Microsoft pulled that build. Nothing in this repo can fix that.
- **Windows 7 and 8.1 are out of support.** No security updates since January 2020
  and January 2023. Installing one on a machine that touches the internet is a bad
  idea, and saying so is not the same as refusing to hand you the ISO.

## An ISO is not a licence

This gets you the installation media Microsoft publishes for free. It does not get
you a product key, and it is not a workaround for one. Bring your own licence.

## Verify what you downloaded

The point of pulling from Microsoft directly is that the file is checkable. Compare
the hash against Microsoft's published SHA-256 for that build before you write it
to a USB stick:

```powershell
Get-FileHash .\Win11_25H2_English_x64.iso -Algorithm SHA256
```

## Licence

[MIT](LICENSE). The edition IDs are Microsoft's; this repo is thirty lines of
JavaScript that types them into a dropdown for you.
