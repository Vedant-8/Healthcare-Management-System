<<<<<<< HEAD
=======
from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime,
    Text,
    Enum,
    Date,
    Time,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
Base = declarative_base()

# FacilitiesHospital model
class FacilitiesHospital(Base):
    __tablename__ = "facilities_hospital"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    contact_number = Column(String, nullable=False)
    email = Column(String, nullable=False)
    
    # Relationship with practitioners
    practitioners = relationship("Practitioner", back_populates="hospital")

# Practitioner model
class Practitioner(Base):
    __tablename__ = "practitioners"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    specialization = Column(String, nullable=False)
    hospital_id = Column(Integer, ForeignKey("facilities_hospital.id"))
    
    # Relationship with FacilitiesHospital
    hospital = relationship("FacilitiesHospital", back_populates="practitioners")

# Patient model
class Patient(Base):
    __tablename__ = "patients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String, nullable=False)
    address = Column(String, nullable=False)
    
    # Foreign key to MedicalInsurance
    insurance_id = Column(Integer, ForeignKey("medical_insurance.id"))
    insurance = relationship("MedicalInsurance", back_populates="patients")

# MedicalInsurance model
class MedicalInsurance(Base):
    __tablename__ = "medical_insurance"
    id = Column(Integer, primary_key=True, index=True)
    provider_name = Column(String, nullable=False)
    policy_number = Column(String, unique=True, nullable=False)
    
    # Relationship with Patient
    patients = relationship("Patient", back_populates="insurance")

class Appointment(BaseModel):
    patient_id: Optional[str] = Field(None, description="ID of the patient")
    hospital_id: Optional[str] = Field(None, description="ID of the hospital")
    appointment_date: Optional[str] = Field(None, description="Appointment date in YYYY-MM-DD format")
    appointment_time: Optional[str] = Field(None, description="Appointment time in HH:MM format")
    reason: Optional[str] = Field(None, description="Reason for the appointment")
    status: Optional[str] = Field("scheduled", description="Status of the appointment")
    insurance_provider: Optional[str] = Field(None, description="Insurance provider, if any")
    insurance_id: Optional[str] = Field(None, description="Insurance ID, if any")
>>>>>>> main
