export default async function getData(request, response) {
	let apiUrl = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard";
	let games = [];
	let teams = [];

	console.log(request);
	console.log("************START**********");
	const reply = await fetch(apiUrl);
	let data = await reply.json();
	// console.log(data);
	let events = data.events;
	let teamsOnBye = data.week.teamsOnBye;
	// console.log(teamsOnBye);

	// map data
	events.forEach(function (event) {
		let competition = event.competitions;
		let competitors = competition[0].competitors;

		// get games:
		let game = {
			id: event.id,
			week: event.week,
			homeTeam: competitors[0].team.displayName,
			homeId: competitors[0].id,
			awayTeam: competitors[1].team.displayName,
			awayId: competitors[1].id,
		};
		games.push(game);

		//get teams:
		let team1 = {
			id: competitors[0].team.id,
			intId: parseInt(competitors[0].team.id),
			displayName: competitors[0].team.displayName,
			color: competitors[0].team.color,
			alternateColor: competitors[0].team.alternateColor,
			logo: competitors[0].team.logo,
			name: competitors[0].team.name,
			abbreviation: competitors[0].team.abbreviation,
		};
		teams.push(team1);
		let team2 = {
			id: competitors[1].team.id,
			intId: parseInt(competitors[1].team.id),
			displayName: competitors[1].team.displayName,
			color: competitors[1].team.color,
			alternateColor: competitors[1].team.alternateColor,
			logo: competitors[1].team.logo,
			name: competitors[1].team.name,
			abbreviation: competitors[1].team.abbreviation,
		};
		teams.push(team2);
	});

	// get any teams on bye
	teamsOnBye.forEach(function (team) {
		let newTeam = {
			id: team.id,
			intId: parseInt(team.id),
			displayName: team.displayName,
			color: team.color,
			alternateColor: team.alternateColor,
			logo: team.logo,
			name: team.name,
			abbreviation: team.abbreviation,
		};
		teams.push(newTeam);
	});

	teams.sort((a, b) => a.intId - b.intId);

	return response.status(200).send({ games: games, teams: teams });
}
