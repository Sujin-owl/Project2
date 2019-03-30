import numpy as np
import datetime as dt
import pandas as pd
from config import password

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pymysql
pymysql.install_as_MySQLdb()

from flask import Flask, jsonify

dbuser = 'root'
dbpassword = password
dbhost = 'localhost'
dbport = '3306'
dbname= 'Project2'

engine = create_engine(f"mysql://{dbuser}:{dbpassword}@{dbhost}:{dbport}/{dbname}")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
session=Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/drug_data<br/>"
)

@app.route("/api/v1.0/drug_data")
def drug_data():
    """Return all database data on drug usage by state and year"""
    # Query all consumption data by state
    Drugs = engine.execute("SELECT * FROM drug").fetchall()
    
    return jsonify({'Drugs': [dict(row) for row in Drugs]})

if __name__ == '__main__':
    app.run(debug=True)
