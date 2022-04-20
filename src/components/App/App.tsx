import React, {useEffect} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import HomePage from '../../pages/HomePage';
import TierToolPage from '../../pages/TierToolPage';
import ReviewToolPage from '../../pages/ReviewToolPage';
import MainLayout from '../MainLayout';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import AuthPage from '../../pages/AuthPage';
import {authService} from '../../api/AuthService';
import RequestsPage from '../../pages/RequestsPage';
import {requestsService} from '../../api/RequestsService';
import ListsPage from '../../pages/ListsPage';

const App: React.FC = () => {
	const auth = useTypedSelector((state) => state.auth.auth);

	useEffect(() => {
		authService.checkAuthOnLaunch();
		requestsService.loadRequestsOnLaunch();
	}, []);

	return (<Routes>
		<Route path="/" element={<MainLayout/>}>
			<Route index element={<HomePage/>}/>
			{auth && (<>
				<Route path="review" element={<ReviewToolPage/>}/>
				<Route path="lists" element={<ListsPage/>}/>
				<Route path="tier" element={<TierToolPage/>}/>
				<Route path="requests" element={<RequestsPage/>}/>
			</>)}
			{!auth && (<>
				<Route path="review" element={<AuthPage/>}/>
				<Route path="tier" element={<AuthPage/>}/>
				<Route path="requests" element={<AuthPage/>}/>
				<Route path="lists" element={<AuthPage/>}/>
			</>)}
			<Route path="*" element={<Navigate to="/" replace/>}/>
		</Route>
	</Routes>);
};

export default App;
