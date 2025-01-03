import random
# Function to generate a valid-looking phone number (either mobile or landline)
def generate_phone_number():
    """
    Generate a realistic phone number, either a landline starting with '022' or a mobile number starting with '9'.
    """
    phone_type = random.choice(["landline", "mobile"])
    
    if phone_type == "landline":
        # Format like 0222813XXXX (Mumbai style landline)
        return f"022{random.randint(1000000, 9999999)}"
    else:
        # Mobile number starting with 9 and followed by 9 random digits
        return f"9{random.randint(100000000, 999999999)}"

# Function to generate a valid-looking email address
def generate_email(name):
    """
    Generate an email address based on the hospital name. If a name is given, it'll use the name part.
    """
    if random.random() > 0.05:  # 95% chance to generate an email
        domain = random.choice(["gmail.com", "yahoo.com", "hospital.com", "healthcare.org", "medic.com"])
        return f"{name.replace(' ', '').lower()}@{domain}"
    else:
        return "NA"  # 5% chance to return 'NA' to simulate missing email addresses
