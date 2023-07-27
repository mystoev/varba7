# Weather @ Varba7

Gathers the weather information of Varba7:

- temperature
- humidity

### cron

Using [Poetry](https://python-poetry.org/) to manage python's version and its dependencies

The cronjob is created and configured in the system with:

```
0 * * * * <path-to-venv-python> <abs-paht-to-python-file>
```

### server

Communicate with the database and serves the needed data

### web

Displays the weather stats in a human-readable way. Currently, using [Reachart](https://recharts.org/)

### TODO

#### Features

- [ ] Beautify the charts - make them responsive, define fixed colors
- [ ] Make the dropdown more pleasing - maybe use bootstrap or something else
- [ ] Show only the MIN and MAX temperatures of the day
- [ ] Make the charts show each of the month, no matter of there is any data for it
- [ ] CI/CD
  - [ ] Figure out a server to host this on.
  - [ ] After a server is found - deploy it
  - [ ] Should have 2 separate deployments: for UI and server
  - [ ] Setup github actions to deploy on some... action :)

#### Tech Dept

- [ ] Create a shared module for the MongoDB. Create the env in one place. Place both python and nodejs modules in there, just to try it out
