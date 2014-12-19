create table users(
userid serial primary key,
username text,
email text,
password text,
createdate timestamp default now());

create table venues(
venueid serial primary key,
venuename text,
createdate timestamp default now());

create table venue_admins(
userid int references users(userid),
venueid int references venues(venueid));

create table events(
eventid serial primary key,
creatorid int references users(userid),
name text,
startdate timestamp,
enddate timestamp,
venueid int references venues(venueid));

