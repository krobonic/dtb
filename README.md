# dtb

A CLI with useful utilities for developers. Currently, it can:

- Decode JWT headers, payloads, and signatures, with optional verification.
- Generate Basic Auth authorization header values.
- Display results as JavaScript values, JSON, YAML, or tables.

## Getting started

Install [Bun](https://bun.com), then install dependencies from the project directory:

```bash
bun install
```

Run the CLI directly from source:

```bash
bun run src/main.ts --help
bun run src/main.ts --version
```

The CLI entry point is `src/main.ts`; `index.ts` currently contains the Bun starter placeholder. There is no installed `dtb` executable yet.

## Decode and verify JWTs

Pass a JWT as the positional argument to `jwtdec`:

```bash
TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
bun run src/main.ts --output json jwtdec "$TOKEN"
```

The result includes `header`, `payload`, and `signature`. Decoding alone does **not** verify the signature or validate token expiry.

To verify a token, supply its signing secret. Optionally restrict verification to a specific algorithm:

```bash
bun run src/main.ts jwtdec "$TOKEN" --secret 'your-256-bit-secret' --algorithm HS256
```

Verification also checks expiry and not-before claims when present; verification failures produce an error. `--algorithm` only takes effect when `--secret` is supplied.

| Option | Description |
| --- | --- |
| `-s, --secret <secret>` | Verify the token using the supplied secret. |
| `-a, --algorithm <algorithm>` | Restrict signature verification to one algorithm. |

Accepted algorithms: `HS256`, `HS384`, `HS512`, `RS256`, `RS384`, `RS512`, `ES256`, `ES384`, `ES512`, `PS256`, `PS384`, `PS512`, and `none`. Key-file loading is not implemented.

## Generate Basic Auth credentials

Use `basicauth` (or its alias `ba`) with the required username and password:

```bash
bun run src/main.ts basicauth --username alice --password secret
# Basic YWxpY2U6c2VjcmV0

bun run src/main.ts ba -u alice -p secret
```

The result is the header value: use it as `Authorization: Basic YWxpY2U6c2VjcmV0`.

## Output formats and help

The global `-o, --output <format>` option works with both commands:

| Format | Output |
| --- | --- |
| `default` | JavaScript-style display (the default). |
| `json` | Pretty-printed JSON. |
| `yaml` | YAML. |
| `table` | Console table display. |

```bash
bun run src/main.ts --output yaml jwtdec "$TOKEN"
bun run src/main.ts --output json ba -u alice -p secret
bun run src/main.ts jwtdec --help
bun run src/main.ts basicauth --help
```

## Development

```bash
bun check  # Type check
bun fmt    # Format code
```
