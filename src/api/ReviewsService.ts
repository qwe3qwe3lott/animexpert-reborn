import {Service} from './Service';
import {axiosInstance} from './axiosInstance';
import {Review, ReviewAnswer, ReviewTypes} from '../types/Review';

export class ReviewsService extends Service {
	async sendReview(review: Review): Promise<ReviewAnswer | null> {
		const form = new FormData();
		switch (review.type) {
		case ReviewTypes.Anime:
			form.append('review[anime_id]', `${review.targetId}`);
			break;
		case ReviewTypes.Manga:
		case ReviewTypes.Ranobe:
			form.append('review[manga_id]', `${review.targetId}`);
			break;
		}
		form.append('review[body]', review.text);
		form.append('review[opinion]', review.opinion);
		const answer = await this.axiosCall<ReviewAnswer>({method: 'post', url: '/api/reviews', data: form, headers: {'Content-Type': 'multipart/form-data'}});
		console.log('ReviewsService', answer);
		if (this.isAxiosError(answer)) return null;
		return answer;
	}
}

export const reviewsService = new ReviewsService(axiosInstance);
