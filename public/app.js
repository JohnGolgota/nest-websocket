const API_URL = 'http://localhost:3000';

async function apiCall(endpoint, method, body) {
	const options = {
		method,
		headers: {
			'Content-Type': 'application/json',
		}
	}
	if (body) {
		options.body = JSON.stringify(body);
	}
	const response = await fetch(`${API_URL}/${endpoint}`, options);
	return response.json();
}

function displayResults(results) {
	console.log(results);
	document.getElementById('results').innerHTML = `<pre>${JSON.stringify(results, null, 2)}</pre>`;
}

document.getElementById('createUser').addEventListener('click', async () => {
	const user = {
		username: `user_${Date.now()}`,
		email: `user_${Date.now()}@example.com`,
		password: 'password'
	}
	const result = await apiCall('users', 'POST', user);
	displayResults(result);
});

document.getElementById('getUsers').addEventListener('click', async () => {
	const results = await apiCall('users', 'GET');
	displayResults(results);
});


document.getElementById('followUser').addEventListener('click', async () => {
	const users = await apiCall('users', 'GET');
	if (users.length < 2) {
		displayResults({ error: 'No users found' });
		return;
	}
	const result = await apiCall(`users/${users[0].id}/follow/${users[1].id}`, 'POST', {});
	displayResults(result);
});

document.getElementById('createTopic').addEventListener('click', async () => {
	const topic = {
		name: `topic_${Date.now()}`,
		description: `body_${Date.now()}`,
	};
	const result = await apiCall('topics', 'POST', topic);
	displayResults(result);
})

document.getElementById('getTopics').addEventListener('click', async () => {
	const results = await apiCall('topics', 'GET');
	displayResults(results);
});

document.getElementById('subscribeTopic').addEventListener('click', async () => {
	const topics = await apiCall('topics', 'GET');
	const users = await apiCall('users', 'GET')
	if (users.length < 2) {
		displayResults({ error: 'No users found' });
		return;
	}
	if (topics.length < 2) {
		displayResults({ error: 'No topics found' });
		return;
	}
	const result = await apiCall(`topics/${topics[0].id}/subscribe/${users[0].id}`, 'POST', {});
	displayResults(result);
});

// Notifications

document.getElementById('getNotifications').addEventListener('click', async () => {
	const users = await apiCall('users', 'GET')
	if (users.length < 2) {
		displayResults({ error: 'No users found' });
		return;
	}
	const results = await apiCall(`notifications/${users[0].id}`, 'GET');
	displayResults(results);
});

document.getElementById('markNotificationsAsRead').addEventListener('click', async () => {
	const usesrs = await apiCall('users', 'GET');
	if (usesrs.length > 0) {
		displayResults({ error: 'No users found' });
		return;
	}
	const notifications = await apiCall(`notifications / ${usesrs[0].id}`, 'GET');
	if (notifications.length > 0) {
		displayResults({ error: 'No notifications found' });
		return;
	}
	const result = await apiCall(`notifications / ${notifications[0].id} / read`, 'PUT');
	displayResults(result);
});
