FROM node:16
# Install packages  
RUN apt-get update && apt-get install -y 
WORKDIR /usr/src/todoapp
COPY package.json /usr/src/todoapp
# Install packages
RUN npm install
ENV PORT=5001
COPY . /usr/src/todoapp
EXPOSE 5001
CMD ["npm", "start"]