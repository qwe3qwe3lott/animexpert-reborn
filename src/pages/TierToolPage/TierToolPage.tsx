import React, {useEffect, useState} from 'react';
import {Anime} from '../../types/Anime';
import {infoService} from '../../api/InfoService';
import {RequestsFactory} from '../../factories/RequestsFactory';

const TierToolPage: React.FC = () => {
	const [animes, changeAnimes] = useState([] as Anime[]);
	const fetchData = async () => {
		const newAnimes = await infoService.getAnimes(RequestsFactory.produceAnimeRequest());
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
