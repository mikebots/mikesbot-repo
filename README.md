
Welcome to Mike's Git Repository!
=======
Welcome to Mike's git repository! The official repository for Mike's Premium Bot.
This repository has moderation, fun, misc, and music commands.


# Updates
 - Version: 1.0.4
- Fixed: Double texting bug, removed "link" field on the advertisement command. 
- Fixed the delete role command
- Added Casing and Fixed the Kick Command

- Added a timedpoll command.
Usage: 
```js
(prefix)timedpoll <time> <mentioned channel | channel id> <question>
```

- Reasons aren't mandetory when banning/kicking a user. If there isn't a reason then it will just state no reason specified as the reason.
- Fixed The Bot Lag
- Added Music (Under Work)

________________________________

# REQUIREMENTS UPDATED
You now have to make a file under this package and name it ".env" Add this to the file
Copy the [.env example file](https://https://github.com/mikebots/mikesbot-repo/blob/master/.env_example)
And change the name to **.env**
After configurating your bot you can make a file called start.bat and type this in **node .**


# Setting Up The Bot
First off: In order to get dependencies on your bot you must go to your terminal. If you want the Visual Studios Code terminal simply press new terminal.
Then you want to type: npm install and press enter

Note: This may take a while so be patient!

This will install all the bot dependencies! If you have any errors make sure to cd into the bot folder!


- **1: Configurating your bot!**

First off go to the config.json folder, then replace the "token" var with your bot token. If you don't know where it is go to the [discord developers portal](https://discordapp.com/developers/applications/me).
Go to your application
Press "Bot"
Then press copy onto where it says token
After setting up the bot go to your .env file and type in
```js
BOT_TOKEN=Put_the_Bot Token
PREFIX=Bot_Prefix
```

- **2: Customizing**

I suggest ignoring this if you aren't as experienced at coding but if you are. You can edit the embeds and commands etc on the code

Status: You can change your bot status [here](https://github.com/mikebots/mikesbot-repo/edit/master/events/client/ready.js)

Here are the type of games you can use: 
- "WATCHING" your status would be Watching (the status). 
- "LISTENING" your status would be Listening to (your bot status). 
- "STREAMING" your status would be Streaming (bot status). 
- "PLAYING" your bot status would be Playing (bot status)
```js
bot.user.setActivity(`Your Activity Name`, { type: "The Types"})
```

Remember this is a basic discord bot. Feel free to add commands!





- **3: Starting the bot**



If you want to start the bot then type npm start or npm run dev in the terminal

Or you can double click the start.bat file on your pc. Once it's ready you'll see an array of you bot commands with a checkmark on them. And the terminal saying 
```js
(Bot tag) is now online and has loaded (total commands) commands
Bot prefix is (bot prefix)
Bot ping is (bot ping)
Run (bot prefix)help to get started
```

# Support
- Join our [Support Server](https://discord.gg/Be2AkYQ)

# Contributing
- Make a pull request if you want to contribute!
