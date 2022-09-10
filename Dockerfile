FROM node:16.17.0

ENV NODE_ENV "production"

ARG DB_STORAGE
ENV DB_STORAGE $DB_STORAGE

ARG UPLOAD_DIR
ENV UPLOAD_DIR $UPLOAD_DIR

ARG FEEDBACK_EMAIL_FROM
ENV FEEDBACK_EMAIL_FROM $FEEDBACK_EMAIL_FROM

ARG FEEDBACK_EMAIL_TO
ENV FEEDBACK_EMAIL_TO $FEEDBACK_EMAIL_TO

ENV FEEDBACK_EMAIL_SUBJECT: "Butcher Contact",

ARG RECAPTCHA_KEY
ENV RECAPTCHA_KEY $RECAPTCHA_KEY

ARG TOKEN_USERNAME
ENV TOKEN_USERNAME $TOKEN_USERNAME

ARG TOKEN_PASSWORD
ENV TOKEN_PASSWORD $TOKEN_PASSWORD

ARG TOKEN_SECRET
ENV TOKEN_SECRET $TOKEN_SECRET

# install system packages
RUN apt-get update
RUN apt-get install patch
RUN apt-get install -y sqlite3

# create app directory
WORKDIR /app

####
#### build server assets
####

# copy app source
COPY . /app

# install dependencies
COPY package.json package-lock.json /app/
RUN npm ci --only=production

# db stuff
RUN npm run db:migrate
# RUN npm run db:seed

####
#### serve with node
####

# set environmental variables
#ENV NODE_ENV production
ENV PORT 3000

# expose ports
EXPOSE $PORT

# execute the container
CMD ["npm", "start"]
