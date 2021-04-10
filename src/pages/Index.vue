<template>
	<div>
		<q-btn class="fixed-bottom-right z-max"
		       @click="scrollToTop"
		       color="amber-6"
		       glossy
		       push
		       rounded
		       style="right: 40px; bottom: 40px;"
		>
			<q-icon name="keyboard_arrow_up"/>
		</q-btn>
		<div class="row justify-around q-ma-md q-gutter-md"
		     id="search"
		>
			<div class="col-sm-3 col-10 col-lg-3">
				<q-input
					v-model="type_service"
					label="Servicio"
					color="amber"
				/>
			</div>
			<div class="col-sm-3 col-10 col-lg-3">
				<q-input v-model="city" label="Dirección / Ciudad" color="amber" />
			</div>
			<div class="col-sm-3 col-10 col-lg-3">
				<q-input v-model="country" label="País" color="amber"/>
			</div>
			
			<q-btn
				@click="get_data"
				class="text-black"
				color="amber"
				glossy
				label="Buscar"
			/>
			
		</div>
		<div class="flex flex-center q-pa-md"
		     v-show="!show_length"
		>
			<q-timeline color="amber">
				<q-timeline-entry title="Introduce tu búsqueda"
				                  subtitle="Rellena los campos"
				>
					<p>
						Rellena los campos de Servicio, Dirección/Ciudad y País con <br>
						el tipo de servicio, la dirección o ciudad (si quieres una búsqueda mas genérica <br>
						introduce ciudad) y el país respectivamente.
					</p>
				</q-timeline-entry>
				<q-timeline-entry title="Realiza la búsqueda"
				                  subtitle="Buscar"
				>
					<p>
						Haz click en el botón <strong>Buscar</strong> para empezar la búsqueda.
					</p>
				</q-timeline-entry>
				<q-timeline-entry title="Filtra los resultados"
				                  subtitle="Filtrar"
				>
					<p>
						Una vez terminada la búsqueda puedes añadir resultados (los cúales se te notificarán) <br>
						 puedes filtrar los resultados por rating, reviews y si tienen o no página web.
					</p>
				</q-timeline-entry>
				<q-timeline-entry title="Exporta a CSV"
				                  subtitle="Exportar"
				>
					<p>Exporta y descarga a formato CSV haciendo click en el botón
					<strong>Exportar a CSV</strong></p>
				</q-timeline-entry>
			</q-timeline>
		</div>
		<div class="row justify-around">
			
			<q-card
				v-show="show_length"
				class="my-card text-black glossy col-auto"
				style="background: #F2C037; align-self: center"
			>
				<q-item>
					<div class="text-subtitle1">
						Resultados encontrados: {{ lista.length }}
					</div>
				</q-item>
			</q-card>
			
			<q-btn
				class="text-black q-ma-md"
				color="amber"
				glossy
				push
				icon-right="archive"
				label="Exportar csv"
				no-caps
				@click="exportData()"
				v-show="show_length"
			/>
			
		</div>
		<div class="row justify-around q-gutter-md">
			<q-select rounded
			          outlined
			          v-model="stars"
			          :options="list_stars"
			          label="Rating"
			          color="amber"
			          style="width: 150px"
			          v-show="show_length"
			          emit-value
			          :dense=true
			/>
			
			<q-select rounded
			          outlined
			          v-model="revs"
			          :options="list_revs"
			          label="Reviews"
			          color="amber"
			          style="width: 150px"
			          v-show="show_length"
			          emit-value
			          :dense=true
			/>
			
			<q-select rounded
			          outlined
			          v-model="webs"
			          :options="list_webs"
			          label="Página web"
			          color="amber"
			          style="width: 150px"
			          v-show="show_length"
			          emit-value
			          :dense=true
			/>
		</div>
		<div class="row justify-around content-center">
			
			<q-card
				class="my-card q-ma-md col-sm-5 col-10 col-lg-3"
				v-for="(item, index) in filterList"
				:key="index"
				style="min-height: 350px; overflow: hidden"
			>

				<q-card-section style="background-image: radial-gradient( circle farthest-corner at 10% 20%, rgba(255,247,94,1)   0%, rgba(255,252,200,1) 90% );">
					<q-badge color="green-8"
					         label="New"
					         v-show="item.created"
					         class="absolute"
					         style="top: 25px; right: 12px; transform: translateY(-50%);"
					/>
					
					<div class="row">
						<div class="col-8 text-h6 text-capitalize">
							{{ item.name }}
						</div>
					</div>
					<q-item-label caption>{{ item.type_service }}</q-item-label>
				</q-card-section>
				<q-card-section>
					<q-item class="row wrap">
						<q-item-section>
							<span class="info-text">
								<strong>Rating:</strong>
							</span>
							<span id="r-info">
								<strong>Rat:</strong>
							</span>
						</q-item-section>
						<q-item-section class="col-auto col-sm-6">
							<q-rating
								v-model="item.rating === undefined ? 0.0 : item.rating"
								:max="5"
								size="24px"
								color="yellow"
								icon-half="star_half"
								readonly
							/>
						</q-item-section>
						<q-item-section>
							({{ item.rating }})
						</q-item-section>
					</q-item>
					<q-item class="row">
						<q-item-section>
							<q-icon name="preview" color="amber" size="24px"/>
						</q-item-section>
						<q-item-section>
							<span>
								<strong>Reviews:</strong>
							</span>
						</q-item-section>
						<q-item-section>
							{{ item.reviews }}
						</q-item-section>
					</q-item>
				</q-card-section>
				<q-separator/>
				<q-card-section>
					<q-list>
						<q-item v-show="item.address !== ''">
							<q-item-section avatar>
								<q-icon name="home" size="24px" color="amber" />
							</q-item-section>
							<q-item-section>
								<q-item-label>
									<span class="info-text">
										<strong>Dirección:</strong>
									</span>
									{{ item.address }}
								</q-item-label>
							</q-item-section>
						</q-item>
						
						<q-item clickable
						        tag="a"
						        target="_blank"
						        :href="item.website === '' ? null : item.href_web"
						        v-show="item.website !== ''"
						>
							<q-item-section avatar>
								<q-icon name="language" color="amber" size="24px"/>
							</q-item-section>
							
							<q-item-section>
								<q-item-label>
									<span class="info-text">
										<strong>Página web:</strong>
									</span>
									{{ item.website }}
								</q-item-label>
							</q-item-section>
							
						</q-item>
						
						<q-item  clickable
						         tag="a"
						         target="_blank"
						         :href="item.phone === '' ? null : item.href_phone"
						         v-show="item.phone !== ''"
						>
							<q-item-section avatar>
								<q-icon name="phone" color="amber" size="24px"/>
							</q-item-section>
							
							<q-item-section>
								<q-item-label>
									<span class="info-text">
										<strong>Teléfono:</strong>
									</span>
									<span class="text-green-6">
										{{ item.phone }}
									</span>
								</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
					
				</q-card-section>
			</q-card>
		</div>
		<div class="flex flex-center q-ma-xl">
			<q-btn @click="addToList()"
			       glossy
			       class="text-black q_ma_md"
			       no-caps
			       color="amber"
			       label="Añadir más resultados"
			       v-if="add_visible"
			/>
		</div>
		
	</div>
</template>

<script>
import {exportFile} from 'quasar'
import {scroll} from 'quasar'

const { getScrollTarget , setScrollPosition } = scroll

function wrapCsvValue (val, formatFn) {
	let formatted = formatFn !== void 0 ? formatFn(val) : val
	formatted = formatted === void 0 || formatted === null ? '' : String(formatted)
	formatted = formatted.split('"').join('""')
	/**
	 * Excel accepts \n and \r in strings, but some other CSV parsers do not
	 * Uncomment the next two lines to escape new lines
	 */
	// .split('\n').join('\\n')
	// .split('\r').join('\\r')
	return `"${formatted}"`
}


export default {
	name: "PageIndex",
	data() {
		return {
			lista: [
				// {name: 'manue bar', address: 'calle de oslo 45', rating: 2.4, reviews: 489, website: 'www.omega.es', phone: '+34 606332211', created: false},
				// {name: 'ojo bar', address: 'calle de oslo 45', rating: 0.0, reviews: 12, website: '', phone: '+34 606332211', created: true},
				// {name: 'manzana bar', address: 'calle de oslo 45', rating: 4.5, reviews: 63, website: 'www.omega.es', phone: '+34 606332211', created: false},
				// {name: 'bar pera', address: 'calle de oslo 45', rating: 5.0, reviews: 1987, website: 'www.omega.es', phone: '+34 606332211', created: true},
				// {name: 'mar bar', address: 'calle de oslo 45', rating: 1.6, reviews: 276, website: '', phone: '+34 606332211', created: false},
			],
			columns: [
				{name: 'name', align: 'center', label: 'Name', field: row => row.name },
				{name: 'type_service', label: 'Tipo de servicio', field: 'type_service' },
				{name: 'rating', label: 'Rating', field: row => row.rating },
				{name: 'reviews', label: 'Reviews', field: 'reviews' },
				{name: 'website', label: 'Website', field: 'website' },
				{name: 'href_web',label: 'Href Website', field: 'href_web'},
				{name: 'phone', label: 'Phone', field: 'phone' }
			],
			lista2: [],
			city: " ",
			country: " ",
			type_service: " ",
			show_length: false,
			visible: false,
			pages: [1, 2, 3, 4],
			add_visible: false,
			stars: null,
			list_stars: [
				{
					label: '5 Estrellas',
					value: 5
				},
				{
					label: '4 Estrellas o más',
					value: 4
				},
				{
					label: '3 Estrellas o más',
					value: 3
				},
				{
					label: '2 Estrellas o más',
					value: 2
				},
				{
					label: '1 Estrella o más',
					value: 1
				},
				{
					label: 'Todos',
					value: null,
				}
			],
			revs: null,
			list_revs: [
				{
					label: '1000 reviews o más',
					value: 1000
				},
				{
					label: '500 reviews o más',
					value: 500
				},
				{
					label: '100 reviews o más',
					value: 100
				},
				{
					label: '50 reviews o más',
					value: 50
				},
				{
					label: 'Todos',
					value: null
				},
			],
			webs: null,
			list_webs: [
				{
					label: 'Con página web',
					value: true
				},
				{
					label: 'Sin página web',
					value: false
				},
				{
					label: 'Todos',
					value: null,
				}
			],
		};
	},
	computed: {
		filterList() {
			 function checkWeb(web) {
			 	return web.length > 2;
			 }
			 if (this.webs === null) {
				 return this.lista
					 .filter(item => item.rating >= this.stars)
					 .filter(item => item.reviews >= this.revs)
			 } else {
				 return this.lista
					 .filter(item => item.rating >= this.stars)
					 .filter(item => item.reviews >= this.revs)
				     .filter(item => checkWeb(item.website) === this.webs)
			 }
			
		},
	},
	methods: {
		test() {
			console.log('Buscando');
		},
		scrollToTop () {
			window.scrollTo({ top: 0, behavior: 'smooth'});
		},
		addToList() {
			let l = this.lista2.length / 20;
			if ( l >= 1) {
				console.log(this.lista2.length);
				for ( let item of this.lista2.slice(0, 20)) {
					this.lista.push(item);
				}
				this.lista2.splice(0,20);
				console.log(this.lista2.length);
				if (l === 1) {
					this.add_visible = false;
				}
			}
		},
		get_data() {
			if (this.city === ' ' && this.type_service === ' ' && this.country === ' ') {
				return undefined
			}
			console.log("getData ejecutandose");
			this.$notify.notify_loading('20');
			this.show_length = false;
			this.visible = true;
			let obj = new FormData();
			obj.append("city", this.city);
			obj.append("country", this.country);
			obj.append("type-service", this.type_service);
			this.$axios
				.post("/api", obj)
				.then((response) => {
					console.log(response.data.data);
					this.lista = response.data.data;
					this.show_length = true;
					this.visible = false;
					this.get_data_rest();
				})
				.catch((error) => {
					console.log("fail", error);
				});
		},
		get_data_rest() {
			this.$notify.notify_searching();
			for (let page of this.pages) {
				let obj = new FormData()
				obj.append("city", this.city);
				obj.append("country", this.country);
				obj.append("type-service", this.type_service);
				obj.append('page', 1);
				this.$axios
					.post("/rest", obj)
					.then((response) => {
						for (let item of response.data.data) {
							this.lista2.push(item)
						}
						this.$notify.notify_p(`Agregados ${response.data.data.length} resultados a tu búsqueda`);
						this.add_visible = true;
						console.log(this.lista2, this.lista2.length);
					})
					.catch((error) => {
						console.log("fail", error);
					});
			}
		},
		exportData() {
			for (let item of this.lista2) {
				this.lista.push(item)
			}
			const content = [ this.columns.map(col => wrapCsvValue(col.label)) ].concat(
				this.lista.map(row => this.columns.map(col => wrapCsvValue(
					typeof col.field === 'function'
						? col.field(row)
						: row[col.field === void 0 ? col.name : col.field],
					col.format
				)).join(','))
			).join('\r\n')
			
			const status = exportFile(
				'datos-servicios.csv',
				content,
				'text/csv'
			)
			
			if (status !== true) {
				this.$q.notify({
					message: 'Browser denied file download...',
					color: 'negative',
					icon: 'warning'
				});
			}
		},
	},
};
</script>

<style >
body{
	font-family: 'Comfortaa', cursive;
}
@media only screen and (min-width: 0px) and (max-width: 320px){
	.info-text {
		display: none;
	}
}
#r-info {
	display: none;
}
@media only screen and (max-width: 320px) {
	#r-info {
		display: flex;
	}
}

</style>
