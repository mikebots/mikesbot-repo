<<<<<<< HEAD

Welcome to Mike's Git Repository!
=======
Welcome to Mike's git repository!
>>>>>>>

Updates: 
Version: 1.0.4
Fixed: Double texting bug, removed "link" field on the advertisement command. 
Fixed the delete role command
Added a poll command. Usage: 
```js
(prefix)poll <mentioned channel | channel id> <question>
```

If you use a channel id to initiate a poll the question needs to be longer than 3 characters and it removes the 3 characters from the question. Doesn't apply if you use a mentioned channel.*/




Reasons aren't mandetory when banning/kicking a user. If there isn't a reason then it will just state no reason specified as the reason.

________________________________

REQUIREMENTS UPDATED: You now have to make a file under this package and name it ".env" Add this to the file

BOT_TOKEN=REPLACEWITHBOTTOKEN


PREFIX=REPLACEWITHBOTPREFIX

_____________________________________________________________________________________________________

After configurating your bot you can make a file called start.bat and type this in 

___________________________________________________________

First off: In order to get dependencies on your bot you must go to your terminal or type ctrl + ` if you want the Visual Studios Code terminal
Then you want to type: npm install and press enter

Note: This may take a while so be patient!

This will install all the bot dependencies! If you have any errors make sure to cd into the bot folder!


1: Configurating your bot!

First off go to the config.json folder, then replace the "token" var with your bot token. If you don't know where it is go to the discord developers portal at: https://discordapp.com/developers/applications/me.
Go to your application
Press "Bot"
Then press copy onto where it says token
Paste it onto where it says "REPLACE WITH BOT TOKEN" on config.json


If you don't know how to create a bot. Go to the developer portal I sent and press "New Application". Then put your bot name onto where it says "Name". Ignore the team stuff that is for more advanced users. 
Next put a bot description("Not needed just a preference) and a bot icon(Your bot's profile picture)
Then under settings press "Bot".
Click Add Bot
Click Yes do it
Then under token press copy. 
Paste it onto where it says "REPLACE WITH BOT TOKEN" on the config.json file

NOTE: Do not reveal your bot token to anyone!! This is basically your bot's password. If anyone can get to it then they could messs with your bot! Keep it hidden in the config.json file.

After you've pasted the bot token you need to add you bot prefix.

A bot prefix is the character or command a person has to type before executing a command. For example my bot prefix is "." So for the ban command I have to type .ban (user id). If my prefix were to change to ? then i'd have to type ?ban (user id)

Paste the prefix onto where it says "REPLACE WITH BOT PREFIX" on the config.json file.

After that you have configurated your bot!



2: Customizing

I suggest ignoring this if you aren't as experienced at coding but if you are. You can edit the embeds and commands etc on the code

Status: You can change your bot status in index.js

Here are the type of games you can use: 
"WATCHING" your status would be Watching (the status). 
"LISTENING" your status would be Listening to (your bot status). 
"STREAMING" your status would be Streaming (bot status). 
"PLAYING" your bot status would be Playing (bot status)

Remember this is a basic discord bot. Feel free to add commands!





3: Starting the bot



If you want to start the bot then type npm start or npm run dev in the terminal

Or you can double click the start.bat file on your pc. Once it's ready you'll see an array of you bot commands witha checkamrk on them. And the terminal saying **(your bot name) is now online! Run (your bot prefix)help for any commands help**
<<<<<<< HEAD
*/
```
=======
>>>>>>> 9b6d282e4971b242524d845a8904044a24918fcd
