import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";
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

  useEffect(() => {
    // Using fallback data directly as done in the Condition component
    setAppointments(appointmentsFallbackData as Appointment[]);
  }, []);

  return (
    <div className="p-6">
      <Card sx={{ maxWidth: "100%", marginBottom: "20px", boxShadow: 3 }}>
        <CardContent>

          {appointments ? (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left border-b">Appointment ID</th>
                    <th className="px-4 py-2 text-left border-b">Status</th>
                    <th className="px-4 py-2 text-left border-b">Patient ID</th>
                    <th className="px-4 py-2 text-left border-b">Appointment Details</th>
                    <th className="px-4 py-2 text-left border-b">Reason</th>
                    <th className="px-4 py-2 text-left border-b">Insurance Provider</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-4 py-2 border-b">{appointment.id}</td>
                      <td
                        className={`px-4 py-2 border-b ${
                          appointment.status === "scheduled"
                            ? "bg-green-200"
                            : appointment.status === "pending"
                            ? "bg-yellow-200"
                            : "bg-red-200"
                        }`}
                      >
                        {appointment.status}
                      </td>
                      <td className="px-4 py-2 border-b">{appointment.patient_id}</td>
                      <td className="px-4 py-2 border-b">
                        <div>
                          <div>
                            <strong>Date: </strong>
                            {new Date(appointment.appointment_date).toLocaleDateString()}
                          </div>
                          <div>
                            <strong>Time: </strong>
                            {appointment.appointment_time}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 border-b">{appointment.reason}</td>
                      <td className="px-4 py-2 border-b">{appointment.insurance_provider}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointments;
