# THIS IS ALPHA WORK IN PROGRESS SOFTWARE

# FIRST Robotics Competition Scouting

This program runs a server and website to scout matches and teams in the FIRST Robotics Competition.

It features an easily customizable and adaptable scouting site, with the ability to remove button presses or interactions
that happened by mistake. The admin page allows for easy control of the timer and assignment of teams to scouters. The
stats page has a fluidly navigable menu to explore the statistics of the team over all their matches, or over just one match.

Visit the site directly for the scouter page, /admin for the admin page, or /stats for the stats page.

## Installation:

1. Install Node.js
2. Install MongoDB (probably with Compass so you can easily see the database with a GUI)
3. In this directory, run `npm install`
4. Run `npm run dev` to start the development server provided by SvelteKit, and run `npm run startserver` to start the backend.
5. When done developing, run `npm run build` to get the built files.

## Usage:

### Pre-Tournament:

1. Get one computer for the server. This can be any computer that can run node.js, but I recommend using a laptop, so
that the admin can just access their page from the same computer.
2. Get six computers for the scouters. This can be anything that can connect to a website over ethernet, so anything
from laptops to chromebooks to phones with ethernet adapters will work.
3. Get an ethernet switch with at least 7 ports, and enough ethernet cables (and adapters if needed) to connect
everything.
4. Create a power delivery system. While the computers can probably run off of their own battery, the switch needs power.
We made a box that carries a standard 12v FRC robot battery, which is connected to the normal robot breaker and VRM. We
 modified the barrel plug for the switch to run off of the VRM. We found that just one battery will usually last the
whole day of scouting. Your laptops might not though.
5. Go through the "At the tournament" section just to make sure everything works as expected.

### At the tournament:

1. Plug all 6 scouters + 1 server/admin into the network switch
2. Start the Scouting software. In this project, there will be 2 servers. The webserver which handles the website, and
the backend server which manages the database and communication with the scouters.
   1. To run the webserver, you can use `npm run dev`, but you should probably build the project and use that instead.
   Run `npm run build` and once it finishes, run `node build` This will start the node webserver.
   2. To run the backend, run `npm run startserver`.
3. Find the local ip address of the server. You can use `ipconfig` on Windows and look for the ethernet section, or run
`ip a` on linux systems and look for the ethernet section. Alternatively, on Windows, find the name of the computer
   (usually something like DESKTOP-S7X97ML), and you can use the name with .local on the end like this `http://DESKTOP-S7X97ML.local`
4. On the scouters, go to the ip address or .local address in the URL bar. Make sure to add http://, or the computer will be confused
   1. If you are having issues (especially on chromebooks), this may be because the chromebooks didn't get an ip address
   automatically assigned to them. You can run a DHCP server on the server/admin computer to resolve this.
5. Confirm that all the radio symbols have turned green, and you are good to scout!

**Below information is not needed to use the software, but it should greatly help in understanding and adapting the software for new games or teams.**

## Tech Stack

### Frontend

This uses SvelteKit as the frontend framework, and it uses the built-in router.

When the scouter presses buttons and interacts, it records those events in a list, called the timeline. After the match,
the scouter can review the timeline and remove any mistakes by clicking on them. When the scouter submits, a function
reads that timeline, and builds an object representing the entire match for that team (called a teamMatch). So if the
scouter presses the "High Goal" button 5 times, there are 5 CountEvent items in the timeline that have the name of
"High Goal". The converter function goes through the timeline one by one, and when it sees the CountEvent 5 times, it
increments the "High Goal" attribute/property of the teamMatch object 5 times. So after the function is done, you could
see that teamMatch.highGoal would return 5. This converter is automatic for basic events, but you may wish to add more
complex behavior, which you can do as well.

All frontend code is inside ./src

### Backend

This runs a standard node.js server, with a mongodb database to store persistent data.

The server relays information between the admins, scouters, and stats pages. When the admin queues a match, it creates
entries in the database for all the teams in that match, and a database entry for the match. When the scouters individually
submit their teamMatch objects, those are saved to the databse as well. Finally, when the stats page asks for information,
the server will find that info, run a function to convert the teamMatch objects into useful statistics like averages,
modes, etc.

All backend code is inside ./server

### Communication

This uses socket.io for most communication between the server, admin, and scouters.

## Updating the software (New Season/Customizing)

The `./src/components/scouter/InputBox.svelte` is the central component of the scouting front end. Use CSS to arrange
different input components to your liking. For example, the Counter.svelte is a button that will increase or decrase
a value by a fixed amount. For example, by increasing the "High Goals" by 1. DurationButton.svelte is a button that
measures time between when it was toggled on, until when it turned off. This could be used to keep track of how long and
often a robot acted defensively or neutrally.

Most importantly, make sure to update `./server/stats.js` to compile the statistics that your team wants to see. Since
this will depend very heavily on the game, this needs to be re-done every year. Should it calculate the average number
of goals made? Should it calculate accuracy as a percentage? Should it calculate which elevated platform the robot went
to most? It is up to you to decide and implement.

### How to implement new events/input types

Make the new Event class in `./src/components/classes` to represent new types of events. Perhaps a game where a dial could
be turned to different angles for points could be kept track of as a new event type.

Make the new input component. For this example, it'll be `./src/components/scouter/Dial.svelte`. Write the javascript,
html, and css to make it function like you want. Take advantage of useful features provided by svelte.

Add the new input component in the InputBox.svelte component.

In `./src/routes/index.html`, there is the convertTimelineToObj function. Define how the converter should handle your
new event type. If you need more advanced analysis for specific games, you can do that below the automatic conversion.

In `./server/stats.js`, you may wish to define how your specific event/input should be analyzed. Should it calculate the
average? Should it find the most commonly occurring option? Should it convert it to a percentage?

# Socket.io Messages

**Main network**

Client:

`requestScouterAssignment` - Scouter asks the server to be given a team to scout, like R1.

`matchSubmit` - Scouter sends collected data for one team in one match, the team number, and match number.

Server:

`scouterAssignment` - Informs scouter of their team, like R1 for Red 1.

`noAssignmentAvailable` - Informs scouter that there are no more open scouting teams. All 6 teams are already taken.

`teamAssignment` - Informs scouter of their team number, like 1747.

`timeUpdate` - Informs scouters of the current game time.

`matchOver` - Informs the scouters that the current match has ended. It doesn't specify whether it was a normal finish or a forced early finish.

**Admin Network**

Client:

`requestScouterStatus` - Admin asks the server which scouters are connected

`teamAssignment` - Admin tells the server the team assignments and match number. (The server will relay to the scouters.)
 The server then creates or updates any team or match database entries as needed.

`timeUpdate` - Admin tells the server the new current game time. (The server will relay to the scouters.)

`matchOver` - Admin tells the server that the current match has ended. (The server will relay to the scouters.)

Server:

`scouterStatusUpdate` - Sends the admin an updated list of which scouters are connected.

**Stats Network**

Client:

`requestTeams` - Scouter asks the server for a list of all teams.

`requestMatches` - Scouter asks the server for a list of matches played by a team, identified by their team number.

`requestMatchStats` - Scouter asks the server for the statistics for 1 match, identified by team number and match number.

`requestAverageStats` - Scouter asks the server for the statistics for all matches played by a team, identified by their team number.

Server:

`teamList` - Sends the stats client a list of all teams.

`matchList` - Sends the stats client a list of all matches played by a team.

`matchStats` - Sends the stats client the statistics for 1 match.

`averageStats` - Sends the stats client the average statistics for all matches played by a team.

## Other Notes:

The game time is the current remaining number of seconds in the game, so it counts down. A game time of 150 represents
150 seconds remaining, which is the start of the match. At the game time of 135, the autonomous period ends and
teleop begins.

For moving data between components in one "site", a couple of methods are used. Svelte "stores" store the current match
time on the admin side. Svelte custom events are fired to move information from a child to parent component, like when
the time controller emits the matchOver event to the parent admin.svelte, so it can send the socket.io messages.

EventComponents are buttons and things that directly add information (events) to the timeline. StateComponents change
the current state of the game, so that EventComponents can react accordingly. For example, There might be a EventComponent Goal Counter Button,
but it can register high or low goal depending on the toggleable gamestate set by a StateComponent button.

## License

This is open-source software shared under the MIT License. You may freely use, modify, and distribute it,
as long as you abide by the terms of the License. Although not required, please give credit.

John Kim (KimJammer), of FRC Team 1747