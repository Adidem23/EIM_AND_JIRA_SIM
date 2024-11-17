# IMPORTING MODULES
from dotenv import load_dotenv
import os
import requests
import json
import yagmail

# HOSTED NODEJS SERVER APIS
ISSUE_URL="https://eim-and-jira-sim-back.vercel.app/"

# LOADING DOTENV VARIABLES 
load_dotenv()

# JIRA AUTHENTICATION PARAMETERS 
USER_EMAIL=os.getenv("JIRA_EMAIL")
USER_TOKEN=os.getenv("JIRA_API_TOKEN")
JIRA_DOMAIN=os.getenv("JIRA_DOMAIN_NAME")

# JIRA DATA FILTERED DICTIONARY
FILTERED_TICKETS_DATA=[]

# DICTIONARIES TO HOLD HARDWARE DATA 
UPDATE_TICKET_DATA_HARDWARE=[]
CREATE_TICKETS_DATA_HARDWARE=[]

# DICTIONARIES TO HOLD SOFTWARE DATA 
UPDATE_TICKET_DATA_SOFTWARE=[]
CREATE_TICKETS_DATA_SOFTWARE=[]

# DICTIONARIES TO HOLD CREATED AND UPDATED HARDWARE TICKETS DATA 
NEWLY_CRETED_HARDWARE_TICKETS=[]
NEWLY_UPDATED_HARDWARE_TICKETS=[]

# DICTIONARIES TO HOLD CREATED  AND UPDATED SOFTWARE TICKETS DATA 
NEWLY_CRETED_SOFTWARE_TICKETS=[]
NEWLY_UPDATED_SOFTWARE_TICKETS=[]

# HEADERS WHILE REQUEST  
headers = {"Content-Type": "application/json"}

# FETCH AND FILTER EXISTING TICKETS DATA FOR TICKET CREATION 
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

# APPENDING HARDWARE UPDATE DICT
for id1 in All_Hardware_Issues_Data_JSON.json():
    for id2 in FILTERED_TICKETS_DATA:
            if(id1['issueID']==id2['ISSUEID']):
                Custom_UPDATE_OBJECT={
                    'key':id2['KEY'],
                    'data':id1
                }
                UPDATE_TICKET_DATA_HARDWARE.append(Custom_UPDATE_OBJECT)
                Create_Ticket_dict_check.append(id1['issueID'])

# APPENDING SOFTWARE UPDATE DICT
for id1 in All_Software_Issues_Data_JSON.json():
    for id2 in FILTERED_TICKETS_DATA:
            if(id1['issueID']==id2['ISSUEID']):
                Custom_UPDATE_OBJECT={
                    'key':id2['KEY'],
                    'data':id1
                }
                UPDATE_TICKET_DATA_SOFTWARE.append(Custom_UPDATE_OBJECT)
                Create_Ticket_dict_check.append(id1['issueID'])


# APPENDING HARDWARE CREATE DICT
for id in All_Hardware_Issues_Data_JSON.json():
     if id['issueID'] not in Create_Ticket_dict_check:
          CREATE_TICKETS_DATA_HARDWARE.append(id)


# APPENDING SOFTWARE CREATE DICT
for id in All_Software_Issues_Data_JSON.json():
     if id['issueID'] not in Create_Ticket_dict_check:
          CREATE_TICKETS_DATA_SOFTWARE.append(id)


# CREATE HARDWARE TICKETS
for id in CREATE_TICKETS_DATA_HARDWARE:
    APPID=id['appID']
    ISSUEID=id['issueID']
    ISSUETYPE=id['issueType']
    SUMMERY=id['summary']
    TECH_TYPE=id['technologyType']
    TECH_VERSION=id['technologyVersion']
    OBES_DATE=id['obsolateDate']
    ISSUE_DATE=id['issueRemediationDate']
    DEPARTMENT=id['department']
    IDADDRESS=id['ipAddress']
    SERVERROLE=id['serverRole']
    ENV=id['environment']

    POST_OBJECT=json.dumps({
      "fields": {
        "project": {
            "key": "SCRUM"
        },
        "summary": SUMMERY,
        "issuetype": {
            "name":"Story"
        },
        "customfield_10037":APPID,
        "customfield_10038":ISSUEID,
        "customfield_10039":ISSUETYPE,
        "customfield_10040":TECH_TYPE,
        "customfield_10041":TECH_VERSION,
        "customfield_10042":OBES_DATE,
        "customfield_10043":ISSUE_DATE,
        "customfield_10044":DEPARTMENT,
        "customfield_10045":IDADDRESS,
        "customfield_10046":SERVERROLE,
        "customfield_10047":ENV,
        "customfield_10048":[{
            "self": "https://adityasuryawanshi5451-1731752299973.atlassian.net/rest/api/3/customFieldOption/10020",
            "value": "GDB34",
            "id": "10020"
        },
        {
            "self": "https://adityasuryawanshi5451-1731752299973.atlassian.net/rest/api/3/customFieldOption/10022",
            "value": "GDB40",
            "id": "10022"
        }]
           }
        })
    
    CREATE_TICKET_REQ=requests.post(JIRA_DOMAIN+"/rest/api/3/issue",headers=headers,auth=(USER_EMAIL,USER_TOKEN),data=POST_OBJECT)

    if CREATE_TICKET_REQ.status_code==201:
         print(f'JIRA Ticket is Created for {ISSUEID} IN HARDWARE with Key :{CREATE_TICKET_REQ.json().get("key")}')
         NEWLY_CRETED_HARDWARE_TICKETS.append(CREATE_TICKET_REQ.json())

    else : 
         print(f' Error While creating Ticket {ISSUEID}'+f'{CREATE_TICKET_REQ.json()}')


# UPDATE HARDWARE TICKETS
for id in UPDATE_TICKET_DATA_HARDWARE:
    KEY=id['key']
    APPID=id['data']['appID']
    ISSUEID=id['data']['issueID']
    ISSUETYPE=id['data']['issueType']
    SUMMERY=id['data']['summary']
    TECH_TYPE=id['data']['technologyType']
    TECH_VERSION=id['data']['technologyVersion']
    OBES_DATE=id['data']['obsolateDate']
    ISSUE_DATE=id['data']['issueRemediationDate']
    DEPARTMENT=id['data']['department']
    IDADDRESS=id['data']['ipAddress']
    SERVERROLE=id['data']['serverRole']
    ENV=id['data']['environment']

    UPDATE_OBJECT=json.dumps({
      "fields": {
        "project": {
            "key": "SCRUM"
        },
        "summary": SUMMERY,
        "issuetype": {
            "name":"Story"
        },
        "customfield_10037":APPID,
        "customfield_10038":ISSUEID,
        "customfield_10039":ISSUETYPE,
        "customfield_10040":TECH_TYPE,
        "customfield_10041":TECH_VERSION,
        "customfield_10042":OBES_DATE,
        "customfield_10043":ISSUE_DATE,
        "customfield_10044":DEPARTMENT,
        "customfield_10045":IDADDRESS,
        "customfield_10046":SERVERROLE,
        "customfield_10047":ENV,
        "customfield_10048":[{
            "self": "https://adityasuryawanshi5451-1731752299973.atlassian.net/rest/api/3/customFieldOption/10020",
            "value": "GDB34",
            "id": "10020"
        },
        {
            "self": "https://adityasuryawanshi5451-1731752299973.atlassian.net/rest/api/3/customFieldOption/10022",
            "value": "GDB40",
            "id": "10022"
        }]
           }
        })

    UPDATE_OBJECT_REQ=requests.put(JIRA_DOMAIN+f"/rest/api/3/issue/{KEY}",headers=headers,auth=(USER_EMAIL,USER_TOKEN),data=UPDATE_OBJECT)

    if UPDATE_OBJECT_REQ.status_code==204:
         print(f'JIRA Ticket is UPDATED for {ISSUEID} IN HARDWARE')

    else : 
         print(f' Error While UPDATING Ticket {ISSUEID}'+f'{UPDATE_OBJECT_REQ.json()}')



# CREATE SOFTWARE TICKETS
for id in CREATE_TICKETS_DATA_SOFTWARE:
    APPID=id['appID']
    ISSUEID=id['issueID']
    ISSUETYPE=id['issueType']
    SUMMERY=id['summary']
    TECH_TYPE=id['technologyType']
    TECH_VERSION=id['technologyVersion']
    OBES_DATE=id['obsolateDate']
    ISSUE_DATE=id['issueRemediationDate']
    DEPARTMENT=id['department']
    IDADDRESS=id['ipAddress']
    SERVERROLE=id['serverRole']
    ENV=id['environment']

    POST_OBJECT=json.dumps({
      "fields": {
        "project": {
            "key": "SCRUM"
        },
        "summary": SUMMERY,
        "issuetype": {
            "name":"Story"
        },
        "customfield_10037":APPID,
        "customfield_10038":ISSUEID,
        "customfield_10039":ISSUETYPE,
        "customfield_10040":TECH_TYPE,
        "customfield_10041":TECH_VERSION,
        "customfield_10042":OBES_DATE,
        "customfield_10043":ISSUE_DATE,
        "customfield_10044":DEPARTMENT,
        "customfield_10045":IDADDRESS,
        "customfield_10046":SERVERROLE,
        "customfield_10047":ENV,
        "customfield_10048":[{
            "self": "https://adityasuryawanshi5451-1731752299973.atlassian.net/rest/api/3/customFieldOption/10020",
            "value": "GDB34",
            "id": "10020"
        },
        {
            "self": "https://adityasuryawanshi5451-1731752299973.atlassian.net/rest/api/3/customFieldOption/10022",
            "value": "GDB40",
            "id": "10022"
        }]
           }
        })
    
    CREATE_TICKET_REQ=requests.post(JIRA_DOMAIN+"/rest/api/3/issue",headers=headers,auth=(USER_EMAIL,USER_TOKEN),data=POST_OBJECT)

    if CREATE_TICKET_REQ.status_code==201:
         print(f'JIRA Ticket is Created for {ISSUEID} IN SOFTWARE with Key :{CREATE_TICKET_REQ.json().get("key")}')
         NEWLY_CRETED_SOFTWARE_TICKETS.append(CREATE_TICKET_REQ.json())
         
    else : 
         print(f' Error While creating Ticket {ISSUEID}'+f'{CREATE_TICKET_REQ.json()}')


# UPDATE SOFTWARE TICKETS
for id in UPDATE_TICKET_DATA_SOFTWARE:
    KEY=id['key']
    APPID=id['data']['appID']
    ISSUEID=id['data']['issueID']
    ISSUETYPE=id['data']['issueType']
    SUMMERY=id['data']['summary']
    TECH_TYPE=id['data']['technologyType']
    TECH_VERSION=id['data']['technologyVersion']
    OBES_DATE=id['data']['obsolateDate']
    ISSUE_DATE=id['data']['issueRemediationDate']
    DEPARTMENT=id['data']['department']
    IDADDRESS=id['data']['ipAddress']
    SERVERROLE=id['data']['serverRole']
    ENV=id['data']['environment']

    UPDATE_OBJECT=json.dumps({
      "fields": {
        "project": {
            "key": "SCRUM"
        },
        "summary": SUMMERY,
        "issuetype": {
            "name":"Story"
        },
        "customfield_10037":APPID,
        "customfield_10038":ISSUEID,
        "customfield_10039":ISSUETYPE,
        "customfield_10040":TECH_TYPE,
        "customfield_10041":TECH_VERSION,
        "customfield_10042":OBES_DATE,
        "customfield_10043":ISSUE_DATE,
        "customfield_10044":DEPARTMENT,
        "customfield_10045":IDADDRESS,
        "customfield_10046":SERVERROLE,
        "customfield_10047":ENV,
        "customfield_10048":[{
            "self": "https://adityasuryawanshi5451-1731752299973.atlassian.net/rest/api/3/customFieldOption/10020",
            "value": "GDB34",
            "id": "10020"
        },
        {
            "self": "https://adityasuryawanshi5451-1731752299973.atlassian.net/rest/api/3/customFieldOption/10022",
            "value": "GDB40",
            "id": "10022"
        }]
           }
        })

    UPDATE_OBJECT_REQ=requests.put(JIRA_DOMAIN+f"/rest/api/3/issue/{KEY}",headers=headers,auth=(USER_EMAIL,USER_TOKEN),data=UPDATE_OBJECT)

    if UPDATE_OBJECT_REQ.status_code==204:
         print(f'JIRA Ticket is UPDATED for {ISSUEID} IN SOFTWARE')

    else : 
         print(f'Error While UPDATING Ticket {ISSUEID}'+f'{UPDATE_OBJECT_REQ.json()}')


# SEND EMAIL FOR NEW TICKETS GENEREATED
sender_password = os.getenv("EMAIL_ADDRESS_PASS")

yag = yagmail.SMTP(user=USER_EMAIL, password=sender_password)
yag.send(
        to=os.getenv("RECEIVER_ADDRESS"),
        subject="Email Notification For Newly Created and Updated Tickets",
        contents=[NEWLY_CRETED_HARDWARE_TICKETS,NEWLY_CRETED_SOFTWARE_TICKETS]
)

print("Emails sent successfully!")

# END OF THE LOVELY SCRIPT
print("---| ALL PROCESSES COMPLETED : SCRIPT EXITED WTIH CODE 0 |---")