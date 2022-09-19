# What's This? What's Missed?


## Tests
There are some functional cases under /cypress/e2e.

To run, just clone the repo and . . .

    npm install
    npx cypess run

Or check out Github Actions, where it already runs if you're lazy. (I am!)

### Missed Tests
I realized I missed these things but I've already put too much time in.
- anything beyond simply functional - didn't even run lighthouse
- country dropdown for telephone number
- contact selected matches what's shown in next UI
- location autopopulation
- wherever the contacts come from could be mocked


## Dashboard
https://dashboard.cypress.io/projects/254xa2/runs

I thought I'd show how to parallelize, but hit a dead end with parallelizaation and using a Cypress container. I didn't want to sink more time into this, so it is what it is, all serial.


## CI
Because you asked for Github, this uses Github Actions.
https://github.com/drewcoo/podium-interview/actions

I am not building a container. Github Actions runs in containers by default. And I'm using a Cypress container so that I don't have to install all of that every time I run. This is pretty much the standard way of doing Cypress with GH Actions.

Oh, they currently run on push, which is what should happen when the dev and test code live together and anyone pushes a change!

You can re-run jobs with the "Re-run all jobs" button here: https://github.com/drewcoo/podium-interview/actions/runs/3085687118


## Extra Credit


### Dockerized Test Job
I thought that a realistic, functioning CI job in common fashion was better so I skipped this.


## Prioritization
Honestly, I would recommend agaist that. There are very few test cases, they're pretty fast. Just run them all.

Forever ago, GOOG revealed that they prioritize by t-shirt size and that honestly make a lot more sense to me.
https://testing.googleblog.com/2010/12/test-sizes.html

I'm skeptical of the utility of the term "regression tests" if they apply to what I wrote. I claim they're behavioral functional tests. And bad ones, because I did not competely control all surfaces the software under test couuld interact with.

And smoke testing is something I claim should be for deployment concerns. In fact, I prefer "deploment testing" to "smoke testing" as a term. It's a very different category than functional tests. It's closer akin to contract tests but contracts with infrastructure.


### Bugs
I noted these in comments in the code as I went things where seemed buggy.


# Initial Oddities


## Where's the Dev Code?
Normally, I would expect all test code to live alongside the dev code that it (most directly, most often) talks to. That way:
- changes in dev and test code can be kept in sync, branching and merging together
- we can test changes in CI (or locally) without needing a deployed environment
- we can measure code coverage of these tests
- when asked to test a component, Cypress can mount the component (for common frameworks)

Because I wasn't asked to fork a repo with the component code, I'm wondering if you practice the anti-pattern of "test repos." If so, that's a red flag we should talk about.


## All the iframe nonesense!
Was that indicative of your actual dev code? Not the way I'd expect a nice mountable component to behave!
Or was it indended as a "challenge" to candidates even though your dev code isn't like that?

Either way, this is another red flag worth discussing.