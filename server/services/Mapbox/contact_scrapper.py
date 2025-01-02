import pandas as pd
import requests
from bs4 import BeautifulSoup
import re
import time

# Function to extract contact info from a website
def extract_contact_info(url):
    try:
        
        filename="soup_data.txt"
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.content, "html.parser")
        with open(filename, "a", encoding="utf-8") as file:
            file.write(soup.text + "\n")  # Add a newline for separation between different soup contents
        print(f"Soup text appended to {filename}")
        
        # Extract phone numbers (using regex for patterns)
        phone_numbers = set(re.findall(r'\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b', soup.text))
        
        # Extract email addresses
        emails = set(re.findall(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", soup.text))
        
        return {
            "phones": ", ".join(phone_numbers) if phone_numbers else None,
            "emails": ", ".join(emails) if emails else None,
        }
    except Exception as e:
        print(f"Error extracting info from {url}: {e}")
        return {"phones": None, "emails": None}

# Function to search for hospital contact details via Google
def search_contact_info(name, address):
    query = f"{name} {address} contact details"
    search_url = f"https://www.google.com/search?q={query}"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
    }
    try:
        response = requests.get(search_url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.content, "html.parser")
        
        # Find potential contact links in search results
        links = [a["href"] for a in soup.find_all("a", href=True) if "http" in a["href"]]
        print(links)
        for link in links[5:10]:  # Check the first 5 links for contact info
            contact_info = extract_contact_info(link)
            if contact_info["phones"] or contact_info["emails"]:
                return contact_info
    except Exception as e:
        print(f"Error searching contact info for {name}: {e}")
    return {"phones": None, "emails": None}

# Load the CSV data
input_file = "hospitals.csv"  # Replace with your input file name
output_file = "hospitals_with_contacts.csv"

df = pd.read_csv(input_file)

# Add new columns for contact info
df["Phone Numbers"] = None
df["Email Addresses"] = None

# Process each hospital entry
for index, row in df.iterrows():
    print(f"Processing: {row['name']}, {row['formatted_address']}")
    contact_info = search_contact_info(row["name"], row["formatted_address"])
    
    df.at[index, "Phone Numbers"] = contact_info["phones"]
    df.at[index, "Email Addresses"] = contact_info["emails"]
    
    # Avoid making too many requests too quickly
    time.sleep(2)  # Adjust the delay as needed
    break

# Save the updated data to a new CSV file
df.to_csv(output_file, index=False)
print(f"Updated CSV saved to {output_file}")
