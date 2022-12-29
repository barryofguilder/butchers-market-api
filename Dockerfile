FROM node:16.17.0


# ARG DB_HOST
# ENV DB_HOST $DB_HOST

# ARG DB_USER
# ENV DB_USER $DB_USER

# ARG DB_PASS
# ENV DB_PASS $DB_PASS

# ARG DB_NAME
# ENV DB_NAME $DB_NAME

# ARG UPLOAD_DIR
# ENV UPLOAD_DIR $UPLOAD_DIR

# ARG FEEDBACK_EMAIL_FROM
# ENV FEEDBACK_EMAIL_FROM $FEEDBACK_EMAIL_FROM

# ARG FEEDBACK_EMAIL_TO
# ENV FEEDBACK_EMAIL_TO $FEEDBACK_EMAIL_TO

# ENV FEEDBACK_EMAIL_SUBJECT: "Butcher Contact"

# ARG RECAPTCHA_KEY
# ENV RECAPTCHA_KEY $RECAPTCHA_KEY

# ARG TOKEN_USERNAME
# ENV TOKEN_USERNAME $TOKEN_USERNAME

# ARG TOKEN_PASSWORD
# ENV TOKEN_PASSWORD $TOKEN_PASSWORD

# ARG TOKEN_SECRET
# ENV TOKEN_SECRET $TOKEN_SECRET

# install system packages
RUN apt-get update
RUN apt-get install patch

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

####
#### serve with node
####

# set environmental variables
ENV PORT 3000

# expose ports
EXPOSE $PORT

# execute the container
CMD ["npm", "start"]
