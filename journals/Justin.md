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
