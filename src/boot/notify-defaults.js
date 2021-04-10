import {Notify} from 'quasar'
import Vue from "vue";

Notify.setDefaults({
	position: 'top-right',
	color: 'amber',
	classes: 'glossy',
	timeout: 2500,
	textColor: 'black',
	actions: [{icon: 'close', color: 'black'}]
});


Vue.prototype.$notify = require("../utils/mynotify");

