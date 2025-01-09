from sqlalchemy import create_engine, MetaData, Table
from models.appointments import Base
import os

db_url=os.environ["postgres_url"]

engine=create_engine(db_url, future=True) 
metadata = MetaData()
appointments_table = Table("appointments", metadata, autoload_with=engine)

# # Base.metadata.create_all(bind=engine)
# def get_db_connection():
#     try:
#         conn = psycopg2.connect(db_url, cursor_factory=RealDictCursor)
#         return conn
#     except Exception as e:
#         raise RuntimeError(f"Error connecting to the database: {str(e)}")



