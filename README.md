# Synthetic pipeline canary

This public repository contains a tiny synthetic fixture for testing the Mhoo pull-request pipeline. It contains no production source, records, configuration, or secrets and has no deployment workflow.

Run the dependency-free baseline with Node.js:

```sh
node baseline.mjs
```

`value.mjs` initially exports the integer `0`. A later, separately authorized repair experiment can change it to `1` and add `regression.mjs`.

Native CI and review requirements protect `main`. Repository auto-merge capability does not authorize any individual merge. A trusted pipeline verdict is not yet available.

This synthetic README change exercises the optional auto-merge switch while the required approval keeps the pull request open.
