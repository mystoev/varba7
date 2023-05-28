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
0 * * * * <abs-paht-to-python-file>
```

### web

To display the weather stats in a human-presentable way
