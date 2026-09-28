---
name: raise-pull-request
description: Prepare and raise a Git pull request when completed repository work needs a clean branch, user-authored commits, validation evidence, and a review-ready description.
---

# Raise Pull Request

Use this skill only when the user requests a branch, commit, push, or pull request, or when an
explicitly delegated workflow defines a pull request as its terminal outcome. Creating a pull request
is an external mutation; ordinary implementation work does not imply permission to publish it.

Inspect repository status, current branch, remotes, contribution guidance, branch protection,
existing branch conventions, and the complete diff before changing Git state. Preserve unrelated
user changes. Use `$git-worktrees` when the task needs isolation from a dirty checkout or concurrent
work.

Read [branch, commit, and PR conventions](references/conventions.md) before naming a branch or writing
history. Use the user's configured Git identity and authenticated hosting account. Never change
`user.name`, `user.email`, signing configuration, credentials, or remote identity to an agent,
assistant, Claude, Codex, bot, or service persona. Never add `Co-authored-by`, `Generated-by`,
`AI-generated`, prompt text, model names, or similar attribution tags unless the user explicitly
requests that exact metadata.

Before committing, review the diff for secrets, generated artifacts, unrelated files, debugging
output, and accidental formatting churn. Run the repository's required validation and record the
actual results. Stage only intended files; use a focused commit message that describes the change and
includes the ticket identifier when one was supplied.

Push only after publication is authorized, using the user's existing credentials. Never claim or
impersonate a separate agent identity. Open the pull request as the authenticated user, targeting the
repository's expected base branch. The PR description should explain the problem, solution, notable
decisions or migrations, validation, and remaining risk. Do not include AI-generation disclosures or
agent branding.

After creation, verify the PR URL, branch and base, commit list, displayed author, diff scope, and CI
state. Do not merge, deploy, release, enable auto-merge, or approve the PR unless the user separately
authorized that action. Any deployment or release must run through the user's configured identity and
the repository's normal protected workflow.
