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
	useEffect(() => {
		try {
			const auth: Auth = JSON.parse(localStorage.getItem('auth') ?? '');
			if (!auth) return;
			authDispatch({type: AuthActionTypes.SET_AUTH, payload: auth});
		} catch (e) {}
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
