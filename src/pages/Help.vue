<template>
	<div class="relative-position">
		
		<div class="q-my-xl q-mx-md" id="my-search">
			<q-input v-model="text" outlined
			         placeholder="Search"
			         rounded color="grey-1"
			         dense
			         @input="buscar()"
			         
			>
				<template v-slot:append>
					<q-icon name="search"/>
				</template>
			</q-input>
		</div>
		<div class="q-ma-md">
			<q-card class="card">
				<q-card-section  v-for="(q, index) in preguntas" :key="index">
					<q-expansion-item
						group="questions"
						expand-icon-toggle
						expand-separator
						:label="q.pregunta"
					>
						<q-card>
							<q-card-section>
								<p>
									{{ q.respuesta }}
								</p>
							</q-card-section>
						</q-card>
					</q-expansion-item>
					<q-separator inset v-if="index !== preguntas.length - 1"/>
				</q-card-section>
				
			</q-card>
		</div>
		<div class="fixed-top" id="img-fondo" style="z-index: -1"></div>
			
		
	</div>
</template>

<script>
export default {
	name: "Help",
	data () {
		return {
			name: 'manuel',
			text: '',
			preguntas: [],
		}
	},
	methods: {
		buscar() {
			let filter1 = item => item.pregunta.toLowerCase().indexOf(this.filter.toLowerCase()) >=0;
			let filter2 = item => item.respuesta.toLowerCase().indexOf(this.filter.toLowerCase()) >=0;
			let data1 = this.original.filter(filter1);
			let data2 = this.original.filter(filter2);
			let results = [data1, data2]
			let lengths = [data1.length, data2.length]
			let max = Math.max(data1.length, data2.length)
			if (max > 0) {
				this.preguntas = results[lengths.indexOf(max)];
			} else {
				this.preguntas = [];
			}
		}
	},
	mounted() {
		console.log('Mounted!');
		this.$axios.get('/api/help/')
			.then(response => {
				console.log(response);
				this.preguntas = response.data;
			})
			.catch(error => {
				console.log(error);
			})
	}
}
</script>

<style lang="stylus">
#img-fondo
	background linear-gradient(90deg,#00C3C0 15%,#34495E 100%)
	height 60vh
#my-search
	border white 2px solid
	border-radius 30px
	background rgba( 255, 255, 255, 0.5)
</style>