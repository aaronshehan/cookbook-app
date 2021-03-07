Install guide for Windows:
  1. install node
  2. install yarn
  3. install python
  4. Create a folder in C:\
  5. Run these commands in powershell inside of the folder created above
      - npx create-react-app cookbook-app
      - cd cookbook-app
      - mkdir api
      - cd api
      - python -m venv venv (or py -m venv venv)
      - ./venv/Scripts/activate
      - pip install flask python-dotenv
      - pip install pymongo
      - pip install flask-cors
      - pip install dnspython
  
How to run on Windows:
  1. Open a terminal and cd into cookbook-app
      - run this command: yarn start-api
  2. Open a second terminal and cd into cookbook-app/api
      - run these commands: ./venv/Scripts/activate & yarn start
                             
                      
  
