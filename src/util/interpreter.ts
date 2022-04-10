import {ReviewOpinions} from '../types/Review';
import {RequestTypes} from '../types/Request';

class Interpreter {
	interpretReviewOpinions(reviewOpinion: ReviewOpinions): string {
		switch (reviewOpinion) {
		case ReviewOpinions.negative:
			return 'негативный';
		case ReviewOpinions.neutral:
			return 'нейтральный';
		case ReviewOpinions.positive:
			return 'позитивный';
		}
	}
	interpretRequestType(requestType: RequestTypes): string {
		switch (requestType) {
		case RequestTypes.Anime:
			return 'Аниме';
		case RequestTypes.Manga:
			return 'Манга';
		case RequestTypes.Ranobe:
			return 'Ранобэ';
		case RequestTypes.Person:
			return 'Чел (не робит)';
		}
	}
}

export const interpreter = new Interpreter();
