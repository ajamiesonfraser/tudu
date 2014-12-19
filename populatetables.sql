insert into users(username, password, email) values ('A.J.', 'jamieson', 'ajamiesonfraser@gmail.com');
insert into venues(venuename) values ('Governor''s Pub'), ('UIT'), ('Highland Arts Theatre');
insert into venue_admins(userid, venueid) values (1,1), (1,2), (1,3);
insert into events(creatorid, name, startdate, enddate, venueid) values (1, 'Flying Horse Cabaret', '2014-12-22 21:00', '2014-12-23 02:00', 1), (1, 'UIT Hackathon', '2015-01-15 08:00', '2015-01-16 18:00', 2), (1, 'Black and White Movie Night', '2014-12-15 18:00', '2014-12-15 21:00', 3);
