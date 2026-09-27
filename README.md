# Synthetic pipeline canary

This public repository contains a tiny synthetic fixture for testing the Mhoo pull-request pipeline. It contains no production source, records, configuration, or secrets and has no deployment workflow.

Run the dependency-free baseline with Node.js:

```sh
node baseline.mjs
```

`value.mjs` initially exports the integer `0`. The bounded repair experiment targets `1` and adds `regression.mjs`.

The intended `main` policy requires `canary-ci` and `mhoo-review-verdict` from GitHub Actions. The solo-maintainer policy uses zero required human approvals. Repository auto-merge capability does not authorize any individual merge.

This PR first exercised the optional auto-merge switch while the required approval kept it open; it now prepares the pinned review and repair workflow.

## Bounded cloud repair

The AI review workflow uses a downloaded, SHA-256-pinned supervisor without checking out PR code. The repair job is off unless the repository variable `MHOO_REPAIR_ENABLED` is `true`. Cloud enrollment separately requires this repository's ID and the exact reviewed workflow commit on `main`.

The synthetic repair target is `value.mjs`: change its integer from `0` to `1`, add a failing-before/passing-after `regression.mjs`, and preserve `baseline.mjs`. Checks run in a pinned Docker image with no network, credentials or Git checkout. Only the cloud service holds the GitHub App key. CI runs both the baseline and any repair regression on the resulting PR revision.

Installing this workflow does not prove a live repair or enable auto-merge. Required CI and the independent cloud verdict still protect `main`.

## Automated review verdict

The cloud service reviews all source in this small repository at both PR revisions against the declared interfaces of its pinned dependencies. It runs the existing review specialists after current-head CI completes. Missing source, blocking findings, incomplete reviews, unresolved coverage gaps and uncertain repairs prevent a pass. The publisher never executes PR code; it writes a separate `mhoo-review-verdict` check bound to the reviewed head and base. CI remains a separate required check. Source review does not claim that a live repair, merge or deployment succeeded; those require separate operational evidence.

The initial branch push supports installation only: the service must enroll this exact workflow commit, repository and PR 1 before it can run. It cannot enroll itself. Normal operation uses the reviewed default-branch workflow. The check-writing permission belongs only to the verdict job's short-lived GitHub Actions token; the GitHub App's permissions are unchanged.

After default-branch installation and enrollment, a manual workflow dispatch takes the positive integer input `pr_number`. The advisory and repair supervisors read that input from GitHub's event file; PR events supply `pull_request.number`. A branch push is only the separately enrolled bootstrap path and does not start a repair.
