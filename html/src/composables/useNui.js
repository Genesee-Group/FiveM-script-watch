import { reactive, onMounted, onUnmounted } from 'vue';

// Global state for the Watch
export const watchState = reactive({
	isVisible: true,
	apiNumber: 0,
	time: {
		hour: '00',
		minute: '00',
	},
	status: {
		life: 100,
		hunger: 100,
		thirst: 100,
	},
	player: {
		name: 'Desconhecido',
		firstname: '',
		userId: 0,
		registration: 'AAA000',
		job: 'Desempregado',
		cnh: 'Não Habilitado',
		phone: '000-000',
	},
	music: {
		totalTime: 0,
		playedTime: 0,
	},
});

// Utility to send POST requests back to FiveM Lua client
export async function sendNui(event, data = {}) {
	try {
		const parentCbUrl = `https://GENESEEWatch/${event}`;
		await fetch(parentCbUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify(data),
		});
	} catch (err) {
		// Standard error when testing outside FiveM (browser)
		// console.log(`Callback ${event} executed in browser.`, data)
	}
}

// Composable to automatically listen to NUI messages
export function useNuiListener() {
	const handleMessage = (event) => {
		const data = event.data;

		if (data.watch !== undefined) {
			watchState.isVisible = data.watch;
			watchState.apiNumber = data.ApiNumber || 0;
		}

		if (data.hour !== undefined && data.minute !== undefined) {
			watchState.time.hour = data.hour;
			watchState.time.minute = data.minute;
		}

		if (data.life !== undefined) {
			watchState.status.life = data.life;
			watchState.status.hunger = data.hunger;
			watchState.status.thirst = data.thirst;
		}

		if (data.name !== undefined) {
			watchState.player.name = data.name;
			watchState.player.firstname = data.firsname || ''; // Firsname is exact key in original JS
			watchState.player.userId = data.user_id;
			watchState.player.registration = data.registration;
			watchState.player.job = data.job;
			watchState.player.cnh = data.cnh;
			watchState.player.phone = data.phone;
		}

		if (data.total !== undefined) {
			watchState.music.totalTime = data.total;
			watchState.music.playedTime = data.played;
		}
	};

	onMounted(() => {
		window.addEventListener('message', handleMessage);

		// Add escape key listener to close NUI
		window.addEventListener('keyup', (e) => {
			if (e.key === 'Escape' && watchState.isVisible) {
				sendNui('action', { action: 'CloseNUI' });
			}
		});
	});

	onUnmounted(() => {
		window.removeEventListener('message', handleMessage);
	});

	return { watchState, sendNui };
}
