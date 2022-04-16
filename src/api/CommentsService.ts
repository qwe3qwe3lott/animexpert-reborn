import {ApiService} from './ApiService';
import {axiosInstance} from './axiosInstance';
import {Comment, CommentAnswer} from '../types/Comment';

class CommentsService extends ApiService {
	async sendComment(comment: Comment): Promise<CommentAnswer | null> {
		const form = new FormData();
		form.append('comment[body]', comment.text);
		form.append('comment[commentable_type]', comment.type);
		form.append('comment[commentable_id]', `${comment.commentableId}`);
		const answer = await this.axiosCall<CommentAnswer>({method: 'post', url: '/api/comments', data: form, headers: {'Content-Type': 'multipart/form-data'}});
		console.log('CommentsService', answer);
		return this.isAxiosError(answer) ? null : answer;
	}
}

export const commentsService = new CommentsService(axiosInstance);
