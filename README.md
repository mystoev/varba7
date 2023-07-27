# Weather @ Varba7

The idea is to gather each day the weather information:

- temperature
- humidity
- pressure (optional)

Should be able to easily see the live stats

### cron

Using poetry to manage python version and it's dependencies

The cronjob is created and configured in the system with:

```
0 * * * * <path-to-venv-python> <abs-paht-to-python-file>
```

### server

Communicate with the db and serve the needed data

### web

To display the weather stats in a human-presentable way

### TODO

#### Features

- [ ] Beautify the charts - make them responsive, define fixed colors
- [ ] Make the dropdown more pleasing - maybe use bootstrap or something else
- [ ] Show only the MIN and MAX temperatures of the day
- [ ] Make the charts show each of the month, no matter of there is any data for it

#### Tech Dept

- [ ] Create a shared module for the MongoDB. Create the env in one place. Place both python and nodejs modules in there, just to try it out
