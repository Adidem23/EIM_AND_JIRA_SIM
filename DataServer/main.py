from fastapi import FastAPI
import os
from dotenv import load_dotenv
import requests


# STARTING CALL FOR FAST_API SERVER
app = FastAPI()

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

All_Tickets_Data_JSON=requests.get(JIRA_DOMAIN+"/rest/api/3/search",headers=headers,auth=(USER_EMAIL,USER_TOKEN))

for id in All_Tickets_Data_JSON.json().get("issues"):
    ticket_data = {
        'KEY':id['key'],
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




@app.get("/getAllTickets")
async def read_root():
    return FILTERED_TICKETS_DATA