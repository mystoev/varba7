# Varba7

## Overview

A cron job (`infra/cron/script.py`) pings weather sensors for data. Each hour, the cron job reads the data and dumps it into a mongo instance. The 2 packages (`./packages`) support the distribution (`packages/gateway`) and represent (`packages/web`) the data to the user.
