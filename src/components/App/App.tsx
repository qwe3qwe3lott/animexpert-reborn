import React from 'react';
import {Routes, Route} from 'react-router-dom';

import HomePage from '../../pages/HomePage';
import TierToolPage from '../../pages/TierToolPage';
import ReviewToolPage from '../../pages/ReviewToolPage';
import MainLayout from '../MainLayout';

class App extends React.Component {
	render() {
		return (<>
			<Routes>
				<Route path="/" element={<MainLayout/>}>
					<Route index element={<HomePage/>}/>
					<Route path="review" element={<ReviewToolPage/>}/>
					<Route path="tier" element={<TierToolPage/>}/>
					<Route path="*" element={<div>404</div>}/>
				</Route>
			</Routes>
		</>);
	}
}

export default App;
