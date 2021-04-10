<template>
	<div class="row justify-center bg-grey-3 " :style="$q.screen.gt.sm ? 'padding-top: 8%': 'padding-top: 10%' ">
		<div class="col-11 bg-grey-3" :class="$q.screen.gt.sm ? ' q-px-lg': ''" >
			<div :class="$q.screen.gt.sm ? 'q-mx-lg': ''" class="q-mb-lg">
				<h6><strong>Busca en la Base de Datos los servicios anteriormente guardados</strong></h6>
			</div>
		</div>
		<div class="col-11" :class="$q.screen.gt.sm ? ' q-px-lg': ''">
			<div :class="$q.screen.gt.sm ? 'q-mx-lg': ''" class="q-mb-lg">
				
				<div class="row text-right">
					<div class="col-12 col-md offset-md-9">
						<q-input label="Buscar" v-model="filter" outlined @input="filterData"/>
					</div>
				</div>
				<div class="row q-pt-md">
					
					<div class="col-12">
						<q-table
							title="Servicios encontrados"
							:data="data"
							:columns="columns"
							row-key="id"
							:pagination="pagination"
						>
							<template v-slot:top-right>
								<q-btn
									color="amber"
									class="text-black"
									glossy
									icon-right="archive"
									label="Exportar a CSV"
									no-caps
									@click="exportTable"
									v-if="data.length > 0"
								/>
							</template>
						</q-table>
					
					
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {exportFile} from 'quasar'

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjM1ODU2MjM0LCJqdGkiOiI4ZDFhMWVmMzUwYTc0MWIyYTRmY2MxYjU3YmEzOGRjMCIsInVzZXJfaWQiOjF9.vOhGGWEjHeYSBfHaYiWajJSY7IY3Sw6-sDvLvqDfCLU'

export default {
	name: "Servicios",
	data () {
		return {
			pagination: {
				rowsPerPage: 10,
			},
			data: [],
			filter: '',
			columns: [
				{name: 'name', align: 'left', label: 'Nombre',sortable: true, field: row => row.name },
				{
					name: 'type_service',
					align:'left',
					label: 'Tipo de servicio',
					sortable: true,
					field: row => row.type_service.name
				},
				{name: 'rating',align: 'left', label: 'Rating', sortable:true, field: row => row.rating },
				{name: 'reviews', align: 'left', label: 'Reviews', sortable: true, field: 'reviews' },
				{name: 'website', align: 'left', label: 'Página web', sortable: true, field: 'website' },
				{name: 'phone', align: 'left', label: 'Teléfono', sortable: true, field: 'phone' },
				{name: 'city', align: 'left', label: 'Ciudad', sortable: true, field: row => row.city.city_name},
				{
					name: 'country',
					align: 'left',
					label: 'País',
					sortable: true,
					field: row => row.city.country.country_name
				}
			],
		}
	},
	mounted() {
		
		this.$axios.get('/api/service/', {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		}).then(response => {
			console.log(response.data);
			this.data = response.data
			this.original = response.data
		}).catch(error => {
				console.log('Error ', error);
			})
	},
	methods: {
		filterData() {
			let filter1 = item => item.name.toLowerCase().indexOf(this.filter.toLowerCase()) >=0;
			let filter2 = item => item.address.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
			let filter3 = item => item.city.city_name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
			let filter4 = item => item.type_service.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
			let filter5 = item => item.city.country.country_name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
			let data1 = this.original.filter(filter1)
			let data2 = this.original.filter(filter2)
			let data3 = this.original.filter(filter3)
			let data4 = this.original.filter(filter4)
			let data5 = this.original.filter(filter5)
			let results = [data1, data2, data3, data4, data5]
			let lengths = [data1.length, data2.length, data3.length, data4.length, data5.length]
			let max = Math.max(data1.length, data2.length, data3.length, data4.length, data5.length)
			if (max > 0) {
				this.data = results[lengths.indexOf(max)];
			} else {
				this.data = [];
			}
		},
		exportTable () {
			// naive encoding to csv format
			const content = [ this.columns.map(col => this.wrapCsvValue(col.label)) ].concat(
				this.data.map(row => this.columns.map(col => this.wrapCsvValue(
					typeof col.field === 'function'
						? col.field(row)
						: row[col.field === void 0 ? col.name : col.field],
					col.format
				)).join(','))
			).join('\r\n')
			
			const status = exportFile(
				'servicios.csv',
				content,
				'text/csv'
			)
			
			if (status !== true) {
				this.$q.notify({
					message: 'Browser denied file download...',
					color: 'negative',
					icon: 'warning'
				})
			}
		},
		wrapCsvValue (val, formatFn) {
			let formatted = formatFn !== void 0
				? formatFn(val)
				: val
			
			formatted = formatted === void 0 || formatted === null
				? ''
				: String(formatted)
			
			formatted = formatted.split('"').join('""')
			/**
			 * Excel accepts \n and \r in strings, but some other CSV parsers do not
			 * Uncomment the next two lines to escape new lines
			 */
			// .split('\n').join('\\n')
			// .split('\r').join('\\r')
			
			return `"${formatted}"`
		}
	},
}
</script>

<style>
td {
	max-width: 300px;
	overflow: hidden;
}
</style>