import os
import requests
from pymongo import MongoClient
from datetime import datetime, timezone
from dotenv import load_dotenv


def get_db_collection(connection_string, db_name, collection_name):
    client = MongoClient(connection_string)

    database = client[db_name]
    collection = database[collection_name]

    return collection


def parseResponse(response):
    [result, *rest] = response.json()

    temperature = next(
        (
            x["value"]
            for x in result["sensordatavalues"]
            if x["value_type"] == "temperature"
        ),
        None,
    )
    humidity = next(
        (
            x["value"]
            for x in result["sensordatavalues"]
            if x["value_type"] == "humidity"
        ),
        None,
    )

    dt = datetime.strptime(result["timestamp"], "%Y-%m-%d %H:%M:%S")
    timestamp = dt.replace(tzinfo=timezone.utc).timestamp()

    return [timestamp, temperature, humidity]


def main():
    load_dotenv()
    URL = os.getenv("SENSOR_URL")
    CONNECTION_STRING = os.getenv("CONNECTION_STRING")
    DATABASE_NAME = os.getenv("DATABASE_NAME")
    DATABASE_COLLECTION = os.getenv("DATABASE_COLLECTION")

    response = requests.get(url=URL)
    [timestamp, temperature, humidity] = parseResponse(response)

    collection = get_db_collection(
        CONNECTION_STRING, DATABASE_NAME, DATABASE_COLLECTION
    )

    collection.insert_one(
        {
            "timestamp": int(timestamp),
            "temperature": float(temperature),
            "humidity": float(humidity),
        }
    )

    print("Successfully added entry!")


main()
