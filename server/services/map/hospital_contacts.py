import pandas as pd
from rapidfuzz import process, fuzz

# Load datasets
temp_hospital_data = pd.read_csv("server/hospital_data/temp_hospital_data.csv")
contact_dataset = pd.read_csv("server/hospital_data/hospital_database-may_2016.csv", encoding='latin1')

# Preprocess text fields
def preprocess(text):
    return str(text).strip().lower().replace(",", "").replace(".", "")

contact_dataset["Hospital_Name"] = contact_dataset["Hospital_Name"].apply(preprocess)
contact_dataset["Address_Original_First_Line"] = contact_dataset["Address_Original_First_Line"].apply(preprocess)
temp_hospital_data["name"] = temp_hospital_data["name"].apply(preprocess)
temp_hospital_data["address"] = temp_hospital_data["address"].apply(preprocess)

# Define matching function
def get_best_match(name, address, dataset):
    dataset['combined'] = dataset['Hospital_Name'] + " " + dataset['Address_Original_First_Line']
    combined_query = f"{name} {address}"
    match = process.extractOne(combined_query, dataset['combined'], scorer=fuzz.token_sort_ratio)
    return match

# Create a function to find contact info
def find_contact_info(row, contact_dataset):
    hospital_name = row["name"]
    hospital_address = row["address"]
    match = get_best_match(hospital_name, hospital_address, contact_dataset)
    if match and match[1] > 70:  # Lowered threshold
        matched_row = contact_dataset[contact_dataset["combined"] == match[0]]
        if not matched_row.empty:
            return {
                "phone": matched_row["Telephone"].values[0],
                "mobile": matched_row["Mobile_Number"].values[0],
                "email": matched_row["Hospital_Primary_Email_Id"].values[0]
            }
    return {"phone": "Not Found", "mobile": "Not Found", "email": "Not Found"}

# Apply function
temp_hospital_data["contact_info"] = temp_hospital_data.apply(
    lambda row: find_contact_info(row, contact_dataset),
    axis=1
)

# Expand and save
hospital_data = pd.concat([
    temp_hospital_data.drop("contact_info", axis=1),
    temp_hospital_data["contact_info"].apply(pd.Series)
], axis=1)

hospital_data.to_csv("server/hospital_data/hospitals_with_contact_info.csv", index=False)
