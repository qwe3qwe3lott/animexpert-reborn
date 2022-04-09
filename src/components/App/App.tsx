import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';

import HomePage from '../../pages/HomePage';
import TierToolPage from '../../pages/TierToolPage';
import ReviewToolPage from '../../pages/ReviewToolPage';
import MainLayout from '../MainLayout';
import {useDispatch} from 'react-redux';
import {AuthAction, AuthActionTypes} from '../../store/reducers/auth/types';
import {Dispatch} from 'redux';
import {Auth} from '../../types/Auth';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import AuthPage from '../../pages/AuthPage';
import {authService} from '../../api/AuthService';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fakeAuth = (): Auth => ({
	created_at: 0,
	expires_in: 0,
	refresh_token: '',
	access_token: '',
	token_type: 'Bearer',
	scope: '',
});

const App: React.FC = () => {
	const authDispatch: Dispatch<AuthAction> = useDispatch();
	const {auth} = useTypedSelector((state) => state.auth);
	const checkAuth = async () => {
		try {
			let auth: Auth | null = JSON.parse(localStorage.getItem('auth') ?? '');
			if (!auth) return;
			// Если остальсь 20% времени от длительности токена, то рефрешим его
			const refreshTime = auth.expires_in * 0.2;
			const toRefresh = Date.now() - auth.created_at < refreshTime;
			if (toRefresh) auth = await authService.refreshTokens(auth.refresh_token);
			if (!auth) return;
			authDispatch({type: AuthActionTypes.SET_AUTH, payload: auth});
		} catch (e) {}
	};
	useEffect(() => {
		checkAuth();
	}, []);
	return (<>
		<Routes>
			<Route path="/" element={<MainLayout/>}>
				<Route index element={<HomePage/>}/>
				{auth && (<>
					<Route path="review" element={<ReviewToolPage/>}/>
					<Route path="tier" element={<TierToolPage/>}/>
				</>)}
				{!auth && (<>
					<Route path="review" element={<AuthPage/>}/>
					<Route path="tier" element={<AuthPage/>}/>
				</>)}
				<Route path="*" element={<div>404</div>}/>
			</Route>
		</Routes>
	</>);
};

export default App;
