require ('dotenv').config();
const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

// use .env containing sensitive account info
const r = new Snoowrap({
    userAgent: 'reddit-bot-example-node',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});

const client = new Snoostorm(r);

// Configure options for stream: subreddit & results per query
const streamOpts = {
    subreddit: 'testingground4bots',  
    results: 25
};

// Create a Snoostorm CommentStream with the specified options
const comments = client.CommentStream(streamOpts); 

const posts = [];  //array of link_ids of submissions already posted in to prevent spamming submission
var count =0;   //count of replies made since started

// On comment, perform whatever logic you want to do
comments.on('comment', (comment) => {
    //Check if comment contains text and that submission is not in array
    if (comment.body.indexOf("gaelic") !=-1 && posts.indexOf(comment.link_id) ==-1) {

        //Filter out comments already talking about the difference or comments about GAA
        if (comment.body.indexOf("goidelic") ==-1 || comment.body.indexOf("sport") ==-1 ) {          
            count++;
           //string literal for reddit comment formatting
           var s = String.raw`Dia dhuit  ${comment.author.name}!        
           The correct term to use is *Irish* when refering to the language spoken in Ireland. Gaelic / Goidelic refers to a group of languages including Scots Gaelic ,Manx and Irish.                   
           ^(^Im ^a ^bot, ^bleep, ^bloop  ^${count})`;
           
           //reply to comment
           comment.reply(s);
            //Add link_id to array after replying
           posts.push(comment.link_id);
           /*  Testing log
            console.log("Comment:" +s);
            console.log("Link ID:" +comment.link_id);
            console.log("Arr:" +posts);
            */
        }
    }
});



