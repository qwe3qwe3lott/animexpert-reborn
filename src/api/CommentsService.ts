import {Service} from './Service';
import {axiosInstance} from './axiosInstance';

export class CommentsService extends Service {
	async sendReview(id: number, text: string, opinion: string): Promise<void> {
		const form = new FormData();
		form.append('review[anime_id]', `${id}`);
		form.append('review[body]', text);
		form.append('review[opinion]', opinion);
		const answer = await this.axiosCall<any>({method: 'post', url: '/api/reviews', data: form, headers: {'Content-Type': 'multipart/form-data'}});
		console.log(answer);
	}
}

export const commentsService = new CommentsService(axiosInstance);
