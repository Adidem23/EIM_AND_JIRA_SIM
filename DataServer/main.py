from fastapi import FastAPI
import os
from dotenv import load_dotenv
import requests
from datetime import datetime, timedelta
from dateutil import parser

# STARTING CALL FOR FAST_API SERVER
app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# LOADING DOTENV VARIABLES 
load_dotenv()

# JIRA AUTHENTICATION PARAMETERS 
USER_EMAIL=os.getenv("JIRA_EMAIL")
USER_TOKEN=os.getenv("JIRA_API_TOKEN")
JIRA_DOMAIN=os.getenv("JIRA_DOMAIN_NAME")

# JIRA DATA FILTERED DICTIONARY
FILTERED_TICKETS_DATA=[]

# HEADERS WHILE REQUEST  
headers = {"Content-Type": "application/json"}

All_Tickets_Data_JSON=requests.get(JIRA_DOMAIN+"/rest/api/3/search?maxResults=100",headers=headers,auth=(USER_EMAIL,USER_TOKEN))

for id in All_Tickets_Data_JSON.json().get("issues"):
    ticket_data = {
        'LINK':id['self'],
        'STATUS':id['fields']['status'].get('name'),
        'KEY':id['key'],
        'CREATED':id['fields'].get('created'),
        'APPID': id['fields'].get('customfield_10037'),
        'ISSUEID': id['fields'].get('customfield_10038'),
        'ISSUETYPE': id['fields'].get('customfield_10039'),
        'SUMMARY': id['fields'].get('summary'),
        'TECH_TYPE': id['fields'].get('customfield_10040'),
        'TECH_VERSION': id['fields'].get('customfield_10041'),
        'OBSOLUTE_DATE': id['fields'].get('customfield_10042'),
        'ISSUEREMEDATE': id['fields'].get('customfield_10043'),
        'DEPARTMENT': id['fields'].get('customfield_10044'),
        'SERVERS': id['fields'].get('customfield_10048'),
        'IPADDRESS': id['fields'].get('customfield_10045'),
        'SERVEROLE': id['fields'].get('customfield_10046'),
        'ENV': id['fields'].get('customfield_10047'),
    }

    FILTERED_TICKETS_DATA.append(ticket_data)

@app.get("/")
async def read_root():
    HTML_STRING="<html><h1>YOU ARE EXPLORING EIM AND JIRA PORTAL DATA SERVER</h1></html>"
    return HTML_STRING

@app.get("/getAllTickets")
async def read_root():
    return FILTERED_TICKETS_DATA

@app.get("/pieChartsData")
async def read_root():
    HARDWARE_NUM=0
    SOFTWARE_NUM=0

    for id in FILTERED_TICKETS_DATA:
        if id['ISSUETYPE']=="Hardware":
            HARDWARE_NUM=HARDWARE_NUM+1
        else:
            SOFTWARE_NUM=SOFTWARE_NUM+1

    CUSTOM_PIE_OBJECT={
        "HARDWARE_LEN":HARDWARE_NUM,
        "SOFTWARE_LEN":SOFTWARE_NUM
    }

    return CUSTOM_PIE_OBJECT


@app.get("/BarGraphData")
async def read_root():
    current_date = datetime.now().date()
    current_date_less_1=current_date-timedelta(days=1)
    current_date_less_2=current_date-timedelta(days=2)
    current_date_less_3=current_date-timedelta(days=3)
    current_date_less_4=current_date-timedelta(days=4)
    current_date_less_5=current_date-timedelta(days=5)

    CURRENT_DATE_COUNT=0
    CURRENT_DATE_COUNT_1=0
    CURRENT_DATE_COUNT_2=0
    CURRENT_DATE_COUNT_3=0
    CURRENT_DATE_COUNT_4=0
    CURRENT_DATE_COUNT_5=0

    for id in FILTERED_TICKETS_DATA:
        Parsed_DateTime=parser.parse(id['CREATED'])
        if Parsed_DateTime.date()==current_date:
            CURRENT_DATE_COUNT=CURRENT_DATE_COUNT+1
        if Parsed_DateTime.date()==current_date_less_1:
            CURRENT_DATE_COUNT_1=CURRENT_DATE_COUNT_1+1
        if Parsed_DateTime.date()==current_date_less_2:
            CURRENT_DATE_COUNT_2=CURRENT_DATE_COUNT_2+1
        if Parsed_DateTime.date()==current_date_less_3:
            CURRENT_DATE_COUNT_3=CURRENT_DATE_COUNT_3+1
        if Parsed_DateTime.date()==current_date_less_4:
            CURRENT_DATE_COUNT_4=CURRENT_DATE_COUNT_4+1
        if Parsed_DateTime.date()==current_date_less_5:
            CURRENT_DATE_COUNT_5=CURRENT_DATE_COUNT_5+1

    BAR_GRAPH_OBJECT={
        "current_date":CURRENT_DATE_COUNT,
        "current_date_less_1":CURRENT_DATE_COUNT_1,
        "current_date_less_2":CURRENT_DATE_COUNT_2,
        "current_date_less_3":CURRENT_DATE_COUNT_3,
       "current_date_less_4":CURRENT_DATE_COUNT_4,
        "current_date_less_5":CURRENT_DATE_COUNT_5
    }

    return BAR_GRAPH_OBJECT


@app.get("/techPieChartData")
async def read_root():
   DATABASE_COUNT=0
   NETWORKING_COUNT=0
   SERVER_COUNT=0
   STORAGE_COUNT=0

   for id in FILTERED_TICKETS_DATA:
       if id['TECH_TYPE']=="Database":
           DATABASE_COUNT=DATABASE_COUNT+1
       if id['TECH_TYPE']=="Networking":
           NETWORKING_COUNT=NETWORKING_COUNT+1
       if id['TECH_TYPE']=="Server":
           SERVER_COUNT=SERVER_COUNT+1
       if id['TECH_TYPE']=="Storage":
           STORAGE_COUNT=STORAGE_COUNT+1

   RETURN_PIE_OBJECT={
       "DATABASE":DATABASE_COUNT,
       "NETWORK":NETWORKING_COUNT,
       "SERVER":SERVER_COUNT,
       "STORAGE":STORAGE_COUNT
   }
                  
   return RETURN_PIE_OBJECT  

@app.get("/deptBarGraph")
async def read_root():
    IT_NUM=0
    FINANCE_NUM=0
    HR_NUM=0
    RD_NUM=0
    GDT_NUM=0

    for id in FILTERED_TICKETS_DATA:
        if id['DEPARTMENT']=="IT":
            IT_NUM=IT_NUM+1
        if id['DEPARTMENT']=="Finance":
            FINANCE_NUM=FINANCE_NUM+1
        if id['DEPARTMENT']=="HR":
            HR_NUM=HR_NUM+1
        if id['DEPARTMENT']=="R&D":
            RD_NUM=RD_NUM+1
        if id['DEPARTMENT']=="GDT":
            GDT_NUM=GDT_NUM+1

    RETURN_OBJECT={
        "IT":IT_NUM,
        "FINANCE":FINANCE_NUM,
        "HR":HR_NUM,
        "RD":RD_NUM,
        "GDT":GDT_NUM
    }

    return RETURN_OBJECT
        
           
@app.get('/envData')
async def read_root():
    DEV_COUNT=0
    PROD_COUNT=0
    QA_COUNT=0
    STAGE_COUNT=0

    for id in FILTERED_TICKETS_DATA:
        if id['ENV']=="DEV":
            DEV_COUNT=DEV_COUNT+1
        if id['ENV']=="PROD":
            PROD_COUNT=PROD_COUNT+1
        if id['ENV']=="QA":
            QA_COUNT=QA_COUNT+1
        if id['ENV']=="STAGE":
            STAGE_COUNT=STAGE_COUNT+1
    

    CUSTOM_OBJECT={
        "DEV":DEV_COUNT,
        "PROD":PROD_COUNT,
        "QA":QA_COUNT,
        "STAGE":STAGE_COUNT
    }
        
    return CUSTOM_OBJECT