import {Notify} from 'quasar'

export function notify_p(message) {
  Notify.create({
    message: `${message}`,
    type: 'positive',
  })
}

export function notify_n(message) {
	Notify.create({
	    message: `${message} `,
	    type: 'negative',
	})
}

export function notify_searching() {
	Notify.create({
		message: 'Buscando más resultados',
		spinner: true,
		timeout: 20000,
		color: 'amber',
		position: "top",
		classes: 'glossy'
	})
}

export function notify_loading(len) {
	const notif = Notify.create({
		message: 'Cargando Resultados',
		group: false,
		timeout: 0,
		spinner: true,
		caption: '0%',
		position: 'bottom'
	})
	
	let percentage = 0;
	const interval = setInterval(() => {
		percentage = Math.min(100, percentage + Math.floor(100 / 15))
		
		notif({
			caption: `${percentage}%`
		})
		
		if (percentage === 100) {
			notif({
				icon: 'done',
				spinner: false,
				message: `Cargados ${len} Resultados`,
				timeout: 2000,
			})
			clearInterval(interval)
		}
	}, 1100)
}