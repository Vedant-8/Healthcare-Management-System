import React, { useEffect, useState } from "react";
import appointmentsFallbackData from "../../../../server/services/webhook/temp_jsons/get_hospital_appintmnets.json";

interface Appointment {
  id: number;
  patient_id: string;
  hospital_id: string;
  appointment_date: string;
  appointment_time: string;
  reason: string;
  status: string;
  insurance_provider: string;
  insurance_id: string;
  created_at: string;
  updated_at: string;
}

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointmentsData = async () => {
      const hospitalId = "0194370c-bdfc-7b80-84d7-d75fcfc566db";
      const apiUrl = `/api/facility/appointments?hospital_id=${hospitalId}`;

      try {
        console.debug(`[Appointments] Fetching appointments data for hospital ${hospitalId}`);
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data: Appointment[] = await response.json();
          console.debug(`[Appointments] Received appointments data:`, data);
          setAppointments(data);
        } else {
          throw new Error(`API returned status ${response.status}`);
        }
      } catch (err) {
        console.error(`[Appointments] Error occurred, using fallback data:`, err);
        setAppointments(appointmentsFallbackData as Appointment[]);
        setError("Failed to fetch appointments data. Using fallback data.");
      }
    };

    fetchAppointmentsData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hospital Appointments</h1>
      {error && <p className="text-red-600">{error}</p>}
      {appointments ? (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <h3 className="font-bold text-gray-700">
                Appointment ID: {appointment.id}
              </h3>
              <p>
                <strong>Patient ID:</strong> {appointment.patient_id}
              </p>
              <p>
                <strong>Appointment Date:</strong>{" "}
                {new Date(appointment.appointment_date).toLocaleDateString()}
              </p>
              <p>
                <strong>Appointment Time:</strong> {appointment.appointment_time}
              </p>
              <p>
                <strong>Reason:</strong> {appointment.reason}
              </p>
              <p>
                <strong>Status:</strong> {appointment.status}
              </p>
              <p>
                <strong>Insurance Provider:</strong> {appointment.insurance_provider}
              </p>
              <p>
                <strong>Insurance ID:</strong> {appointment.insurance_id}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(appointment.created_at).toLocaleString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(appointment.updated_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Appointments;
