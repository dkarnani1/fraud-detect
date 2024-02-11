from langchain.chains import create_sql_query_chain
from langchain_openai import ChatOpenAI
from langchain_community.utilities import SQLDatabase
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY = os.getenv("SECRET_KEY")
#OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY



def chat(query):
    
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
    db = SQLDatabase.from_uri("sqlite:///insurance_fraud.db")

    chain = create_sql_query_chain(llm, db)
    chain.get_prompts()
    response = chain.invoke({"question": query})


    
    return db.run(response)


if __name__ == "__main__":
    while True:
        query = input("You:")
        chat(query)
        if(query in ['Thank you']):
            break
