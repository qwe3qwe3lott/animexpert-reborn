import React, {useEffect} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import HomePage from '../../pages/HomePage';
import TierToolPage from '../../pages/TierToolPage';
import ReviewToolPage from '../../pages/ReviewToolPage';
import MainLayout from '../MainLayout';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import AuthPage from '../../pages/AuthPage';
import {authService} from '../../api/AuthService';

const App: React.FC = () => {
	const {auth} = useTypedSelector((state) => state.auth);

	useEffect(() => {
		authService.checkAuthOnLaunch();
	}, []);

	return (<Routes>
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
			<Route path="*" element={<Navigate to="/" replace/>}/>
		</Route>
	</Routes>);
};

export default App;
