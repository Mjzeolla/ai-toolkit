# Contributing

Open an issue or discussion for a new capability when its routing or ownership is unclear.
Focused corrections can proceed directly through a pull request.

1. Create a branch from `main`.
2. Keep each skill self-contained and avoid unrelated rewrites.
3. Add or update tests for validator behavior and deterministic scripts.
4. Run `make check`.
5. Describe the requests the skill should handle, the boundary it intentionally excludes,
   and the validation performed.

Pull requests must not include generated build output, credentials, copied third-party
instructions, or content whose license is incompatible with this repository. Maintainers
may request a realistic forward test for complex or high-risk capabilities.
