import {ApiService} from './ApiService';
import {axiosInstance} from './axiosInstance';
import {Review, ReviewAnswer, ReviewOpinions, ReviewTypes} from '../types/Review';

export class ReviewsService extends ApiService {
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
		return this.isAxiosError(answer) ? null : answer;
	}

	// Для тестирования
	async sendReviewFake(review: Review): Promise<ReviewAnswer | null> {
		console.log('sendReviewFake', review);
		return {
			anime_id: 1,
			body: '',
			cached_votes_down: 0,
			cached_votes_up: 0,
			comments_count: 0,
			created_at: '',
			id: 0,
			is_written_before_release: false,
			manga_id: 1,
			opinion: ReviewOpinions.neutral,
			updated_at: '',
			user_id: 0
		};
	}
}

export const reviewsService = new ReviewsService(axiosInstance);
