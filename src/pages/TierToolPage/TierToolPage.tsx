import React, {useEffect, useState} from 'react';
import {Anime} from '../../types/Anime';
import {infoService} from '../../api/InfoService';

const TierToolPage: React.FC = () => {
	const [animes, changeAnimes] = useState([] as Anime[]);
	const fetchData = async () => {
		const newAnimes = await infoService.getAnimes();
		console.log(newAnimes);
		changeAnimes(newAnimes);
	};
	useEffect(() => {
		fetchData();
	}, []);
	return (<div>
		{animes.map((anime, key) =>
			<div key={key}>
				{anime.name}
			</div>,
		)}
	</div>);
};

export default TierToolPage;
