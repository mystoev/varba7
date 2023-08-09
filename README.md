# Weather @ Varba7

Gathers the weather information of Varba7:

- temperature
- humidity

## cron

Using [Poetry](https://python-poetry.org/) to manage python's version and its dependencies

The cronjob is created and configured in the system with:

```
0 * * * * <path-to-venv-python> <abs-paht-to-python-file>
```

## server

Communicate with the database and serves the needed data

## web

Displays the weather stats in a human-readable way. Currently, using [Reachart](https://recharts.org/)

## TODO

### Features

- [ ] Refactor
  - [ ] Start in prod when on home server
  - [ ] Change the 5173 port after refactor
- [ ] CI/CD
  - [ ] CI/CD for the cronjob
  - [ ] Deploy on a Github release

### Tech Dept

- [ ] Create a shared module for the MongoDB. Create the env in one place. Place both python and nodejs modules in there, just to try it out
