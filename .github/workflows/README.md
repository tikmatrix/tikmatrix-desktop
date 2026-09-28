# Release artifact layout in R2

Every workflow here that publishes a binary uploads it to the `matrix` bucket, which
`api.tikmatrix.com/front-api/release/<key>` streams back to clients. Keys follow one scheme:

| Prefix | Written by | Contents |
|---|---|---|
| `desktop/<app>/<version>/` | `build-matrix-*.yml`, `build-videomagic-*.yml` | Installers (`.msi`, `.dmg`, `.deb`), updater bundles (`.msi.zip`, `.app.tar.gz`) and their `.sig` files — every platform of one release in one prefix |
| `script/<rust-target>/<version>/` | `build-script-*.yml` | The `script` automation binary |
| `apk/<version>/` | `build-apk-all.yml` | The agent APK and its test APK |

`<app>` is the identifier the backend stores — `tikmatrix.pro`, `tikmatrix`, `igmatrix`,
`videomagic` — and `<version>` is the bare version (no leading `v`). One release is one
prefix, so listing or pruning it is a single operation.

## Changing the desktop layout

The desktop path is defined in one place, `scripts/release-paths.js` in the tikmatrix-pro
and video-magic repos. These workflows call it as a CLI to fill in `destination-dir`, and
the same module builds the URLs that `update-version.js` (updater) and
`update-download-url.js` (website download button) register with the backend, so the upload
target and the published URL cannot drift apart. `rewrite_version_in_url` in the server's
`release_channel.rs` has to agree too: it serves the stable channel during a gray rollout by
swapping the version in a stored URL, which now appears both in the directory and in the file
name.

Artifacts published before 2026-09-04 sit flat at the bucket root and were not migrated.
Their stored URLs still point there and keep working; only new releases use the layout above.
