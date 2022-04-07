import {ReviewOpinions} from '../types/Review';

class Interpreter {
	interpretReviewOpinions(reviewOpinion: ReviewOpinions): string {
		switch (reviewOpinion) {
		case ReviewOpinions.negative:
			return 'негативный';
		case ReviewOpinions.neutral:
			return 'нейтральный';
		case ReviewOpinions.positive:
			return 'позитивный';
		default:
			return '';
		}
	}
}

export const interpreter = new Interpreter();
