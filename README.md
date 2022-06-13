# THIS IS ALPHA WORK IN PROGRESS SOFTWARE

# FIRST Robotics Competition Scouting

This program runs a server and website to scout matches and teams in the FIRST Robotics Competition.

## Tech Stack

### Frontend

This uses SvelteKit as the frontend framework, and it uses the built-in router.

All frontend code is inside ./src

### Backend

This runs a standard node.js server, with a mongodb database to store persistent data.

All backend code is inside ./server

### Communication

This uses socket.io for most communication between the server, admin, and scouters.

These are the messages the server and client send:

**Main network**

Client:

`requestScouterAssignment` - Scouter asks the server to be given a team to scout, like R1.

Server:

`scouterAssignment` - Informs scouter of their team, like R1 for Red 1.

`noAssignmentAvailable` - Informs scouter that there are no more open scouting teams. All 6 teams are already taken.

=======
# FIRST Robotics Competition Scouting

This program runs a server and website to scout matches and teams in the FIRST Robotics Competition.

## Tech Stack

### Frontend

This uses SvelteKit as the frontend framework, and it uses the built-in router.

All frontend code is inside ./src

### Backend

This runs a standard node.js server, with a mongodb database to store persistent data.

All backend code is inside ./server

### Communication

This uses socket.io for most communication between the server, admin, and scouters.

These are the messages the server and client send:

**Main network**

Client:

`requestScouterAssignment` - Scouter asks the server to be given a team to scout, like R1.

Server:

`scouterAssignment` - Informs scouter of their team, like R1 for Red 1.

`noAssignmentAvailable` - Informs scouter that there are no more open scouting teams. All 6 teams are already taken.

>>>>>>> 845c490aaf55e829094a0cb8753ec38c9b4ebf81
`teamAssignment` - Informs scouter of their team number, like 1747.

`timeUpdate` - Informs scouters of the current game time.

`matchOver` - Informs the scouters that the current match has ended. It doesn't specify whether it was a normal finish or a forced early finish.

**Admin Network**

Client:

`requestScouterStatus` - Admin asks the server which scouters are connected

`teamAssignment` - Admin tells the server the team assignments to all the scouters. (The server will relay to the scouters.)

`timeUpdate` - Admin tells the server the new current game time. (The server will relay to the scouters.)

`matchOver` - Admin tells the server that the current match has ended. (The server will relay to the scouters.)

Server:

`scouterStatusUpdate` - Sends the admin an updated list of which scouters are connected.

## Other Notes:

The game time is the current remaining number of seconds in the game, so it counts down. A game time of 150 represents
150 seconds remaining, which is the start of the match. At the game time of 135, the autonomous period ends and
teleop begins.

For moving data between components in one "site", a couple of methods are used. Svelte "stores" store the current match
time on the admin side. Svelte custom events are fired to move information from a child to parent component, like when
the time controller emits the matchOver event to the parent admin.svelte, so it can send the socket.io messages.

## License

This is open-source software shared under the MIT License. You may freely use, modify, and distribute it,
as long as you abide by the terms of the License. Although not required, please give credit.

John Kim (KimJammer)