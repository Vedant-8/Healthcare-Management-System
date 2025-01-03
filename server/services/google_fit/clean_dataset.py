import numpy as np
import pandas as pd
import os
import json
from datetime import datetime

file_path = 'server/fit_data/Daily activity metrics/Daily activity metrics.csv'

# Function to convert NumPy types to native Python types
def convert_numpy_types(obj):
    if isinstance(obj, np.int64):
        return int(obj)
    elif isinstance(obj, np.float64):
        return float(obj)
    elif isinstance(obj, dict):
        return {key: convert_numpy_types(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [convert_numpy_types(item) for item in obj]
    else:
        return obj
def handle_nan(value):
    # Check if the value is NaN and return "Not Available" if true
    if pd.isna(value):
        return "Not Available"
    return np.float64(value)
  
# Function to load the CSV file and prepare the data
def load_data(file_path):
    df = pd.read_csv(file_path)
    df['Date'] = pd.to_datetime(df['Date'])
    df.set_index('Date', inplace=True)
    return df

# Function to get the monthly summary for a specific month (e.g., May 2022)
def get_monthly_summary(df, year, month):
    # Filter data for the given year and month
    df_month = df[(df.index.year == year) & (df.index.month == month)]
    
    # Total Activity
    total_move_minutes = np.float64(df_month['Move Minutes count'].sum())
    total_calories = np.float64(df_month['Calories (kcal)'].sum())
    total_distance = np.float64(df_month['Distance (m)'].sum() / 1000)  # Convert meters to kilometers
    total_heart_points = np.float64(df_month['Heart Points'].sum())
    total_heart_minutes = np.float64(df_month['Heart Minutes'].sum())

    # Activity Breakdown (convert milliseconds to minutes)
    biking_duration = np.float64(df_month['Biking duration (ms)'].sum() / 60000)
    walking_duration = np.float64(df_month['Walking duration (ms)'].sum() / 60000)
    running_duration = np.float64(df_month['Running duration (ms)'].sum() / 60000)
    calisthenics_duration = np.float64(df_month['Calisthenics duration (ms)'].sum() / 60000)
    paced_walking_duration = np.float64(df_month['Paced walking duration (ms)'].sum() / 60000)

    # Speed Analysis
    avg_speed = np.float64(df_month['Average speed (m/s)'].mean())
    max_speed = np.float64(df_month['Max speed (m/s)'].max())
    min_speed = np.float64(df_month['Min speed (m/s)'].min())

    # Step Count
    total_steps = np.int64(df_month['Step count'].sum())

    # Weight Analysis
    # avg_weight = np.float64(df_month['Average weight (kg)'].mean())
    # max_weight = np.float64(df_month['Max weight (kg)'].max())
    # min_weight = np.float64(df_month['Min weight (kg)'].min())
    avg_weight = handle_nan(df_month['Average weight (kg)'].mean())
    max_weight = handle_nan(df_month['Max weight (kg)'].max())
    min_weight = handle_nan(df_month['Min weight (kg)'].min())

    # Inactivity
    inactive_duration = np.float64(df_month['Inactive duration (ms)'].sum() / 60000)  # Convert milliseconds to minutes

    # Compile the summary into a dictionary with numpy types
    summary = {
        'Total Activity': {
            'Move Minutes': total_move_minutes,
            'Calories Burned': round(total_calories,2),
            'Distance Covered (km)': round(total_distance,2),
            'Heart Points': total_heart_points,
            'Heart Minutes': total_heart_minutes
        },
        'Activity Breakdown': {
            'Biking Duration (min)': round(biking_duration,2),
            'Walking Duration (min)': round(walking_duration,2),
            'Running Duration (min)': round(running_duration,2),
            'Calisthenics Duration (min)': round(calisthenics_duration,2),
            'Paced Walking Duration (min)': round(paced_walking_duration,2)
        },
        'Speed Analysis': {
            'Average Speed (m/s)': round(avg_speed,2),
            'Max Speed (m/s)':round( max_speed,2),
            'Min Speed (m/s)': round(min_speed,2)
        },
        'Step Count': total_steps,
        'Weight': {
            'Average Weight (kg)': avg_weight,
            'Max Weight (kg)': max_weight,
            'Min Weight (kg)': min_weight
        },
        'Inactivity': {
            'Inactive Duration (min)': inactive_duration
        }
    }
    summary = convert_numpy_types(summary)
    
    return summary

def save_summary_to_file(summary, year, month):
    month_name = datetime(2022, month, 1).strftime('%B') 
    # Create the directory structure year/month if it doesn't exist
    dir_path = f"server/fit_data/summary_reports/{year}"
    os.makedirs(dir_path, exist_ok=True)
    
    # Convert the summary to JSON
    json_data = json.dumps(summary, default=str, indent=4)
    
    # Define the file path
    file_path = os.path.join(dir_path, f"{month}_{month_name}_google_fit.json")
    
    # Save the JSON data to the file
    with open(file_path, 'w') as f:
        f.write(json_data)
        
#currentusers data is availale from 2022-05 to 2024-12
def yearly_month_wise_data():
    # Loop through months from May 2022 (5) to December 2024 (12)
    for year in range(2022, 2025):
        start_month = 5 if year == 2022 else 1  # Start from May in 2022, then January for other years
        end_month = 12 if year == 2024 else 12  # End at December for all years

        for month in range(start_month, end_month + 1):
            # Generate the monthly summary for each month
            monthly_summary = get_monthly_summary(df, year, month)
            
            # Save the summary to the file
            save_summary_to_file(monthly_summary, year, month)
            month_name = datetime(2022, month, 1).strftime('%B') 
            # print(monthly_summary)
            print(f"Summary for {month_name}{year} saved successfully!")

#<-----------testing------------->
df = load_data(file_path)