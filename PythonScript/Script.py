from dotenv import load_dotenv
import os
import requests

#ISSUE_REQUEST_URL
ISSUE_URL="https://eim-and-jira-sim-back.vercel.app/"

# Loading DotEnv
load_dotenv()

#JIRA_USER_CREDENTIALS
USER_EMAIL=os.getenv("JIRA_EMAIL")
USER_TOKEN=os.getenv("JIRA_API_TOKEN")
JIRA_DOMAIN=os.getenv("JIRA_DOMAIN_NAME")

#Dictionaries to Hold Tickets data
FILTERED_TICKETS_DATA=[]
CREATE_TICKETS_DATA=[]
UPDATE_TICKET_DATA=[]

#Headers 
headers = {"Content-Type": "application/json"}

#FETCH AND FILTER EXISTING TICKETS DATA FOR TICKET CREATION 
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


# DECIDE WHETHER UPDATE OR CREATE 
All_Hardware_Issues_Data_JSON=requests.get(ISSUE_URL+"/AllHardwareIssues")
All_Software_Issues_Data_JSON=requests.get(ISSUE_URL+"/AllSoftwareIssues")

Create_Ticket_dict_check=[]

for id1 in All_Hardware_Issues_Data_JSON.json():
    for id2 in FILTERED_TICKETS_DATA:
            if(id1['issueID']==id2['ISSUEID']):
                Custom_UPDATE_OBJECT={
                    'key':id2['KEY'],
                    'data':id1
                }
                UPDATE_TICKET_DATA.append(Custom_UPDATE_OBJECT)

# PUT REQUEST TO UPDATE DATA
