from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class Hospital(Base):
    __tablename__ = "hospitals"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    contact_number = Column(String, nullable=False)
    doctors = relationship("Doctor", back_populates="hospital")
    appointments = relationship("Appointment", back_populates="hospital")

class Doctor(Base):
    __tablename__ = "doctors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    specialization = Column(String, nullable=False)
    hospital_id = Column(Integer, ForeignKey("hospitals.id"))
    hospital = relationship("Hospital", back_populates="doctors")

class Patient(Base):
    __tablename__ = "patients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String, nullable=False)
    insurance_id = Column(Integer, ForeignKey("medical_insurance.id"))
    insurance = relationship("MedicalInsurance", back_populates="patients")

class MedicalInsurance(Base):
    __tablename__ = "medical_insurance"
    id = Column(Integer, primary_key=True, index=True)
    provider_name = Column(String, nullable=False)
    policy_number = Column(String, unique=True, nullable=False)
    expiry_date = Column(DateTime, nullable=False)
    patients = relationship("Patient", back_populates="insurance")

class AppointmentType(Base):
    __tablename__ = "appointment_types"
    id = Column(Integer, primary_key=True, index=True)
    type_name = Column(String, nullable=False)  # e.g., Consultation, Surgery, Emergency, etc.
    description = Column(Text, nullable=True)
    appointments = relationship("Appointment", back_populates="appointment_type")

class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    patient_id = Column(Integer, ForeignKey("patients.id"))
    hospital_id = Column(Integer, ForeignKey("hospitals.id"))
    appointment_type_id = Column(Integer, ForeignKey("appointment_types.id"))
    appointment_date = Column(DateTime, nullable=False)
    reason = Column(Text, nullable=False)
    
    doctor = relationship("Doctor")
    patient = relationship("Patient")
    hospital = relationship("Hospital", back_populates="appointments")
    appointment_type = relationship("AppointmentType", back_populates="appointments")
