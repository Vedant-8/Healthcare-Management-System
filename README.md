# MedEase - Healthcare Management System 🚑💻
# Team - Postonauts

Welcome to the **MedEase**, a comprehensive platform designed to streamline patient care and healthcare management. This system integrates various healthcare services, providing users with easy access to their health records, appointment scheduling, and more all in one place.

## Postman Collection 🔥

You can explore the API endpoints using the Postman collection:  [View Postman Collection](https://www.postman.com/postonauts/postonauts-workspace/collection/imzr7tq/medease)

## Medium Article 📝

Learn more about the development of this Healthcare Management System in my [Medium article](https://medium.com/@omkar_yadav18/medease-revolutionizing-healthcare-management-0931c5bd962a).

## YouTube Demo 🎥

Watch a demo of the Healthcare Management System here: 
<iframe width="560" height="315" src="(https://www.youtube.com/watch?v=c9sDtzVAtJw)" frameborder="0" allowfullscreen></iframe>


## Features ✨

- **Nearby Hospital Locator** 🏥📍  
  Track and display nearby hospitals on an interactive map based on the user's current location. Access hospital details including name, address, and contact info.

- **User Login & Health Data Storage** 🔐  
  Secure account creation and login to manage and store health information from various healthcare centers.

- **Access to Health Records** 📑💉  
  Access and manage health records, prescriptions, lab results, and more from multiple healthcare providers. Powered by EHR and FHIR APIs.

- **Appointment Scheduling** 📅  
  Book, reschedule, or cancel appointments with healthcare providers. Displays available time slots and handles user preferences.

- **Pharmacy Locator & Medicine Reminders** 💊⏰  
  Find nearby pharmacies and set reminders for active medications.

- **Health & Fitness Data** 🏃‍♀️📊  
  Visualize fitness data with charts and graphs, integrated with fitness APIs for tracking progress.

## Tech Stack 💻

- **Frontend**: React, Vite, TypeScript  
- **Backend**: FastAPI, Celery
- **UI/UX**: TailwindCSS, Material-UI  
- **APIs**: Google Maps, Clerk, Metriport (EHR), Fit APIs  
- **Data Security**: User authentication and secure health data management  
- **Cache Management**: Redis for optimized performance

## Screenshots 📸

<img width="1115" alt="LandingPage" src="https://github.com/user-attachments/assets/5259c1a6-ff12-4004-9e76-f650578059e2">
<img width="1115" alt="PatientDashboard" src="https://github.com/user-attachments/assets/5629d68f-ce57-41e0-b9f7-a3943c97e897">
<img width="1115" alt="SearchNearbyHospitals" src="https://github.com/user-attachments/assets/69843ddb-c6c6-4c99-b16a-85787383605d">

## API Integrations 🔌

- **Nearby Hospital Locator**: Fetch hospital data based on user location using mapping APIs.
- **Health Data Management**: Use FHIR APIs for aggregating health records from different healthcare providers.
- **Appointment Scheduling**: Google Calendar API integration for scheduling and managing appointments.
- **Fit Data APIs**: Track health and fitness data with visual representations.
- **SMS/Email Notifications**: For appointment reminders and alerts.

## Getting Started 🚀

1. Clone the repository:  
   `git clone https://github.com/Vedant-8/Healthcare-Management-System.git`

2. Install dependencies:  
   `npm install` (for frontend)  
   `pip install -r requirements.txt` (for backend)

3. Run the app:  
   `npm run dev` (Frontend)  
   `uvicorn main:app --reload` (Backend)

---

Feel free to contribute or provide feedback. For more information or if you encounter any issues, please open an issue in the repository. 😀
