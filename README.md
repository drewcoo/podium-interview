# Initial Oddities

## Where's the Dev Code?
Normally, I would expect all test code to live alongside the dev code that it (most directly, most often) talks to. That way:
- changes in dev and test code can be kept in sync, branching and merging together
- we can test changes in CI (or locally) without needing a deployed environment
- we can measure code coverage of these tests
- when asked to test a component, Cypress can mount the component (for common frameworks)

Because I wasn't asked to fork a repo with the component code, I'm wondering if you practice the anti-pattern of "test repos." If so, that's a red flag we should talk about.
