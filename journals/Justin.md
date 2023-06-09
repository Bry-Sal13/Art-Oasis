## May 17th, 2023

Today, I worked on:

- Creating the database tables and setting up the docker compose file for the api-services and the database
  with assistance from my teammates

I wrote some SQL to create the tables and declare things like whether a field is unique or has a default value or can be null.

we tested it by setting up and using Beekeper Studio to check if all of the tables existed and we could access them.

We also bounced around different ideas on how we should set up the database, and troubleshooted the SQL and Docker Compose file
for a couple hours with no luck before getting help from the SEIR Martey who helped us troubleshoot and debug and gave us
the idea that finalized how we set up the database

Today, we found out we can store user info inside the token, allowing us to keep our services on two different databases without having a poller


## May 22nd, 2023

Today, I worked on:
- troubleshooting Auth with the whole group working together and refactoring my queries

## May 23rd, 2023

Today, I worked on:

- refactoring my queries and databases so they would actually work, and added debugging statements for our queries to return proper
  status codes


##  May 24th, 2023

Today, I worked on:

- troubleshooting Auth and get method for getting tokens from Auth, refactored and wrote the routes for creating and getting links for users
  and started working on refactoring users and getting a list of users and updating users and their respesctive routes

## May 30th, 2023

Today, I worked on:

- started work on the profile page getting a sense of the general layout
- cleaned up the back-end while i was adding an aditional field to the user model
- encountered a bug for the rest of the day that I couldn't solve


## June 5th, 2023

Today I worked on:

- added some useEffects() to check if you have a token on the front end and redirects you to login if not
- added some functionality to this frontend protection to check if you reloaded the page or not
  if you reload the timeout before it kicks you to login for not having a token is longer
- Added the edit profile page, that allows you to edit any existing fields,  and add images to your image
  carousel and links to your socials portion
- added the functionality of the edit profile pagee prepopulating with your current Info
  so you don't have to add your display name and about me all over again or overwrite it to be empty
  on accident



## June 6th, 2023

Today I worked on:

- stylizing the mainpage that shows a profile sidebar and posts and comments
- created breakpoints on the css that changes the width and positioning of the elements
- started on other people's profile component


## June 7th, 2023

Today I worked on:

- creating a like button on other people's profiles
- stylizing other people's profile view
- figured out I could use useParams() to make my SPA urls dynamic based on user's usernames



## June 8th, 2023

Today I worked on:

- A ton of unit tests and refactoring our back-end down to one database and service
- refactored our env variables to have our baseurl in it so our get method's on our frontend work in deployment
