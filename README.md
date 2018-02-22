# GaelicRedditBot
Reddit Bot using NodeJS wrapper for Reddit API

ENV file has been excluded, please add your own to replicate Bot yourself.

Reddit bot that utilizes the Node.JS Module Snoowrap as a wrapper for the 
Reddit API. Bot searches a stream of comments for a substring 'gaelic', and
posts a reply to the user that made the comment. 

Basic filtering to exclude comments about GAA/ Goedelic language. -- To Be improved on later --

Bot records link_ids of posts commented on to prevent spamming a post multiple times, and will 
only post a reply if the link_id is not in the array. 

Bot replies are in the form of a string literal to allow Reddit formatting.
