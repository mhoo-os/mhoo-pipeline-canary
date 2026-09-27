# Synthetic pipeline canary

This public repository contains a tiny synthetic fixture for testing the Mhoo pull-request pipeline. It contains no production source, records, configuration, or secrets and has no deployment workflow.

Run the dependency-free baseline with Node.js:

```sh
node baseline.mjs
```

`value.mjs` initially exports the integer `0`. The bounded repair experiment targets `1` and adds `regression.mjs`.

The intended `main` policy requires `canary-ci` and `mhoo-review-verdict` from GitHub Actions. The solo-maintainer policy uses zero required human approvals. Repository auto-merge capability does not authorize any individual merge.

Earlier installation PRs exercised the optional merge switch. This repository now contains the pinned review and repair workflow.

## Bounded cloud repair

The AI review workflow uses a downloaded, SHA-256-pinned supervisor without checking out PR code. The repair job is off unless the repository variable `MHOO_REPAIR_ENABLED` is `true`. Cloud enrollment separately requires this repository's ID and the exact reviewed workflow commit on `main`.

The earlier synthetic repair target was `value.mjs`: change its integer from `0` to `1`, add a failing-before/passing-after `regression.mjs`, and preserve `baseline.mjs`. Checks run in a pinned Docker image with no network, credentials or Git checkout. Only the cloud service holds the GitHub App key. CI runs both the baseline and any repair regression on the resulting PR revision.

Installing this workflow does not prove a live repair or enable auto-merge. Required CI and the independent cloud verdict still protect `main`.

## Automated review verdict

The cloud service reviews all source in this small repository at both PR revisions against the declared interfaces of its pinned dependencies. It runs the existing review specialists after current-head CI completes. Missing source, blocking findings, incomplete reviews, unresolved coverage gaps and uncertain repairs prevent a pass. The publisher never executes PR code; it writes a separate `mhoo-review-verdict` check bound to the reviewed head and base. CI remains a separate required check. Source review does not claim that a live repair, merge or deployment succeeded; those require separate operational evidence.

Bootstrap installation is complete and the temporary branch-push trigger is removed. Normal operation uses the reviewed default-branch workflow, separately enrolled by exact commit and repository ID. A workflow cannot enroll itself. The check-writing permission belongs only to the verdict job's short-lived GitHub Actions token; the merge adapter uses a repository-restricted GitHub App token with read-only Administration access to verify branch protection.

After default-branch installation and enrollment, a manual workflow dispatch takes the positive integer input `pr_number`. The advisory and repair supervisors read that input from GitHub's event file; PR events supply `pull_request.number`. Branch pushes are not a direct repair entry point.

Optional protected merge runs in the cloud delivery workflow after Actions finishes. It rechecks the signed verdict, current revision, CI and native protection before one expected-head merge. Turning the switch off prevents new merge requests; uncertain earlier outcomes remain subject to read-only reconciliation.

The repair supervisor has two distinct review stages. Diagnosis inspects the existing source before generating a patch; a proposed regression file may be verified absent at that point. Candidate review requires the generated regression and observed fail-before/pass-after results. A missing regression, one that already passes the original source, or one that still fails the candidate prevents publication. The baseline file stays unchanged throughout.

Finding selection receives the collected original repair files and observed missing regression path, so cross-file claims retain their supporting context. Correction scope includes the enrolled regression requirement and protected baseline. Oversize evidence or rejected advice holds the attempt. Typed rejection signals are recorded before stopping; consumed attempts are never reset by installing a newer supervisor.

## Range preservation experiment

The next distinct experiment uses `range.mjs`: `clamp(n, lo, hi)` returns `lo`
when below the range, `hi` when above it, and `n` inside. Non-finite inputs or
`lo > hi` throw `RangeError`. `range-baseline.mjs` protects inside/above-range,
endpoints, equal bounds and invalid-input behavior. Native CI independently checks
zero, positive and negative lower bounds too, so a broken lower branch is red before repair. The baseline
subset deliberately excludes that targeted defect, as this repair pipeline requires
a passing unchanged baseline before generation.

Installation adds the correct function and passing CI; it does not introduce the
future defect. After separate exact-commit cloud enrollment, one new PR may break
only the lower branch. Its repair may change `range.mjs` and add the required new
`range-regression.mjs`, run by `node range-regression.mjs`. The identical new test
must fail against original source and pass against the candidate. Existing baseline,
CI workflow and historical value fixtures are protected from repair. Four independent
candidate reviews, unchanged scope thresholds, one atomic App commit and fresh
native CI are required. This tests behavior preservation, not another constant-export
reroll. Earlier consumed PR #3 and #7 remain held and must not be retried/reset.

The supervisor persists bounded candidate code, command exits, independent review
results, exact TypeSafe questions/answers and terminal outcomes privately. Raw command
output, credentials and host cleanup paths are excluded. Observation writes complete
before the next effect. A storage failure holds rather than repeating a repair.
Installation does not activate the repair switch or prove live acceptance.
