import yagmail

def send_email():
    sender_email = ""
    sender_password = ""
    receiver_email = ""
    
    yag = yagmail.SMTP(user=sender_email, password=sender_password)
    yag.send(
        to=receiver_email,
        subject="Test Email Notification",
        contents="Hello,\n\nThis is a test email notification sent via Python script.\n\nRegards,\nYour Automation Script"
    )
    print("Email sent successfully!")

send_email()