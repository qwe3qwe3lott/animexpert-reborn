import {Service} from './Service';
import {axiosInstance} from './axiosInstance';
import {AnimeReview, Review, ReviewTypes} from '../types/Review';

export class ReviewsService extends Service {
	async sendReview(review: Review): Promise<void> {
		let answer: any = {};
		switch (review.type) {
		case ReviewTypes.Anime:
			answer = await this.sendAnimeReview(review);
			break;
		}
		console.log(answer);
	}
	async sendAnimeReview(review: AnimeReview): Promise<unknown> {
		const form = new FormData();
		form.append('review[anime_id]', `${review.targetId}`);
		form.append('review[body]', review.text);
		form.append('review[opinion]', review.opinion);
		return await this.axiosCall<unknown>({method: 'post', url: '/api/reviews', data: form, headers: {'Content-Type': 'multipart/form-data'}});
	}
}

export const reviewsService = new ReviewsService(axiosInstance);
