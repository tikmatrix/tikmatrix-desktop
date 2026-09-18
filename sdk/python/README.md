# TikMatrix Custom Script API

Write automation in any language and drive your phones through TikMatrix's local
HTTP API. This directory holds the Python client; the API itself is plain JSON
over HTTP, so any language works.

Requires a **Pro plan or higher**.

Full guide: <https://tikmatrix.com/docs/api/custom-script>. What follows is
the short version, kept next to the code it describes.

## Two ways to run a script

**Standalone** — you run the program yourself, TikMatrix just lends you devices:

```python
from tikmatrix import TikMatrix

client = TikMatrix()

for device in client.devices():
    if device["busy"]:
        continue
    with client.device(device["serial"], label="my crawler") as d:
        d.press("home")
        print(d.info())
```

**Managed** — you register the program in TikMatrix and it becomes a task, with
queueing, per-plan concurrency, retries, the task log, and scheduling:

```python
from tikmatrix import TikMatrix

# The device is already leased; its id arrives in the environment.
with TikMatrix.from_env() as d:
    d.click(text="Log in")
    print("done")     # stdout lands in the task log
```

Register it under **Devices → Custom Scripts → Add Script**, set the command to
`python C:/scripts/my_flow.py`, then run it like any built-in script. A non-zero
exit code marks the task failed.

## Setup

```bash
pip install requests
curl -O https://raw.githubusercontent.com/tikmatrix/tikmatrix-desktop/main/sdk/python/tikmatrix.py
```

`tikmatrix.py` is a single file with no dependency beyond `requests` — put it
next to your script rather than installing it.

The environment a managed script is started with:

| Variable | Meaning |
|---|---|
| `TIKMATRIX_API_BASE` | Server URL, default `http://127.0.0.1:50809` |
| `TIKMATRIX_SESSION_ID` | Lease id (managed scripts only) |
| `TIKMATRIX_SERIAL` | Device this task was dispatched to |
| `TIKMATRIX_PACKAGE` | Resolved app package |
| `TIKMATRIX_PLATFORM` | `tiktok`, `instagram`, `threads`, or `generic` |

## Device leases

A device can only be driven by one thing at a time. Leasing it tells TikMatrix
the phone is busy, so the queue will not dispatch a task to it and the agent
watchdog will not restart the UIAutomator agent underneath you.

A lease also consumes one device slot from your plan — the same pool built-in
tasks draw from. A Pro plan with 20 devices can drive 20 phones concurrently,
whether through tasks, scripts, or a mix.

Leases expire (default 120s) and the SDK renews them on a background thread, so
a crashed script frees its device within seconds rather than holding it forever.
`with` blocks release on the way out. Nothing to do by hand unless you use the
raw HTTP API.

## Common operations

```python
d.info()                                  # device info
d.window_size()                           # (width, height)
d.screenshot("shot.png")                  # PNG bytes, optionally saved

d.find(text="Following")                  # matching nodes with bounds + center
d.exists(resource_id="com.app:id/login")
d.wait_for(text="Home", timeout=15)       # block until it appears
d.click(text="Log in")                    # wait, then tap the centre

d.click_xy(540, 1200)
d.swipe(540, 1600, 540, 600)
d.press("back")                           # back / home / recent / enter
d.input_text("hello")                     # types via the bundled IME

d.jsonrpc("deviceInfo")                   # any UIAutomator2 method
d.adb("shell", "pm", "list", "packages")  # ADB, once enabled in Settings
```

`find` matches against the dumped hierarchy, so when a selector misses you can
`print(d.hierarchy())` and look at exactly what it searched.

## HTTP API

Device calls need an `x-session-id` naming a live lease. There is no API key — like the rest of the local API, the endpoints are unauthenticated. They send no CORS headers, so call them from a program rather than from a browser page.

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/v1/rpc/devices` | List online devices |
| `POST` | `/api/v1/rpc/session` | Lease a device → `session_id` |
| `POST` | `/api/v1/rpc/session/{id}/heartbeat` | Extend the lease |
| `DELETE` | `/api/v1/rpc/session/{id}` | Release |
| `GET` | `/api/v1/rpc/session` | List live leases |
| `POST` | `/api/v1/rpc/jsonrpc` | Call a UIAutomator2 method |
| `POST` | `/api/v1/rpc/adb` | Run an ADB command |
| `GET` | `/api/v1/rpc/hierarchy?serial=` | UI tree as XML |
| `GET` | `/api/v1/rpc/screenshot?serial=` | Screen as PNG |

```bash
curl -X POST http://127.0.0.1:50809/api/v1/rpc/session \
  -H "content-type: application/json" \
  -d '{"serial":"192.168.1.5:5555","label":"curl test","ttl_secs":120}'

curl -X POST http://127.0.0.1:50809/api/v1/rpc/jsonrpc \
  -H "x-session-id: $SESSION_ID" \
  -H "content-type: application/json" \
  -d '{"serial":"192.168.1.5:5555","method":"deviceInfo","params":[]}'
```

Errors come back as `{"code": N, "message": "..."}`:

| Status | Meaning |
|---|---|
| 403 | Plan below Pro, no lease, lease expired, or ADB disabled |
| 409 | Device already leased, or the plan has no free slot |

## Platform modes

A registered script declares which platform it targets:

- **generic** — the device is handed over untouched. No app is started, no
  account switching, no IME check, and nothing is stopped afterwards. Use this
  to automate an app TikMatrix does not drive itself.
- **tiktok / instagram / threads** — the app is opened and the right account
  made current before your program starts, and the app is closed afterwards,
  exactly as for built-in scripts. `TIKMATRIX_PACKAGE` tells you which package
  was resolved. Use this to add a step the built-in scripts do not cover.

On **threads** the account is verified rather than switched: Threads has no
account switching yet, so a task naming an account other than the one signed in
on the device fails instead of running as whoever happens to be active.

## Notes

- The command is executed directly, not through a shell, so `&&` and `|` are
  arguments rather than operators. Register `cmd /c "..."` if you want a shell.
- Scripts exceeding their timeout (default 30 min) are terminated and the task
  is marked failed.
- ADB access is a device shell on an endpoint with no API key, so it is **off
  by default**. Turn it on in **Settings → Developer API** when you have a
  script that needs it for pushing files or installing apps; UI automation over
  `jsonrpc` works without it. While it is off, `d.adb(...)` raises with a 403.

## More

- [Custom Scripts guide](https://tikmatrix.com/docs/api/custom-script) — the
  full version of this page, including troubleshooting
- [Local API overview](https://tikmatrix.com/docs/api/local-api)
- [Task Management API](https://tikmatrix.com/docs/api/task-management) —
  queue a registered script from your own code
