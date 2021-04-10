<template>
	<div style="text-align: justify; padding: 30px 15%">
		<h3 :style="$q.screen.lt.sm ? 'font-size: 24px;' : ' '">
			<strong>Documentación de la REST API</strong>
		</h3>
		<p>
			En esta sección veremos cómo usar la REST Api de nuestra aplicación, a qué datos podemos acceder, etc.
			Tipos de request posibles en la REST Api son get y post.
		</p>
		<p>
			Para acceder a la REST Api, debemos hacer un request a los siguientes url dependiendo de la información
			que queramos  obtener de nuestra BD. Son la siguientes:
		</p>
		<ul>
			<li><i>/api/country/ </i>-> para acceder a la lista de países.</li>
			<li><i>/api/city/</i> -> para acceder a la lista de ciudades.</li>
			<li><i>/api/type_service/</i> -> para acceder a la lista de tipos de servicios.</li>
			<li><i>/api/service/{id}/</i> -> url dinámica para acceder a un servicio.</li>
			<li>
				<p>
					<i>/api/service/</i> -> para acceder a la lista de servicios. En esta url se pueden realizar
					requests GET con query params para obtener la lista de servicios según la ciudad y/o tipo de
					servicio. Los siguientes query params están permitidos:				
				</p>
				<ul>
					<li><strong>city:</strong> el nombre de la ciudad a la que pertenece.</li>
					<li><strong>type_service:</strong> el tipo de servicio al que pertenece.</li>
				</ul>
				<br>
				<p>
					A continuación vemos una serie de ejemplos:
					<br><br>
					<div style="text-align: left">
						/api/service/?city=madrid <br>
						/api/service/?city=barcelona&type_service=abogado <br>
						/api/service/?type_service=ferretería <br>
						/api/service/?type_service=agencia de marketing&city=granada <br>
					</div>
				</p>
			</li>
		</ul>
		<p>
			<strong>
				<span style="color: red; font-weight: bold">Aviso!</span>
				para que el GET request devuelva la información deseada se deberán introducir
				tanto en el campo de ciudad como el de tipo de servicio un valor parecido al que
				se encuentra en la base de datos, el cual se puede ver en las otras url de la API.
			</strong>
		</p>
		
		<p>
			A continuación veremos un ejemplo de un GET request a  la API para obtener un servicio con query params.
			El request sería el siguiente:
		</p>
		
		<q-scroll-area
			dark
			class="bg-dark text-white rounded-borders"
			style="height: 75px; max-width: 400px; font-family: 'Cambria Math',serif; text-align: left"
		>
			<div class="q-py-sm q-px-md">
				<p>
					<i>GET   /api/service/?city=madrid&type_service=clínica dental</i>
				</p>
			</div>
		</q-scroll-area>
		<br>
		<p>
			Como respuesta recibiremos un JSON:
		</p>
		
		<q-scroll-area
			dark
			class="bg-dark text-white rounded-borders"
			style="height: 200px; max-width: 400px; font-family: 'Cambria Math', sans-serif; text-align: left"
		>
			<div class="q-py-sm q-px-md">
				[<br>
				<p  v-for="(key, value) in 5" :key="key">
					{<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"id": 5,<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"name": "Clínica Área Dental",<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"address": "Av. de Bruselas, 40",<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"website": "www.clinicaareadental.com",<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"href_web": "http://www.clinicaareadental.com/",<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"phone": "+34 913 56 52 25",<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"rating": 4.5,<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"reviews": 12,<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"date_creation": "2020-10-20T11:34:47.780001-04:00",<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"date_updated": "2020-10-20T11:34:47.780001-04:00",<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"type_service": {<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": 2,<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "clínica dental"<br>
					&nbsp;&nbsp;&nbsp;&nbsp;},<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"city": {<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": 1,<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"city_name": "madrid",<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"lat": 40.43915,<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"lng": -3.67693,<br>
					&nbsp;&nbsp;&nbsp;&nbsp;},<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"country": {<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": 1,<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"country_name": "españa",<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"country_code": "ESP"<br>
					&nbsp;&nbsp;&nbsp;&nbsp;}<br>
					}
				</p>
				]<br>
			</div>
		</q-scroll-area>
		<br>
		<p>
			La respuesta al request será una lista de todos los servicios que estén en la ciudad introducida en
			el parámetro city y/o el tipo de servicio introducido en el parámetro type_service.
			El resultado será una lista con los servicios que contengan esos parámetros.
		</p>
		<br>
		<p>
			Ahora vamos a ver un ejemplo de la respuesta que recibiremos si hacemos un request la url que nos
			devuelve un solo servicio. Aunque veremos un GET request los métodos disponibles para esta url
			son: GET, PUT, PATCH y DELETE.
		</p>
		<br>
		<q-scroll-area
			dark
			class="bg-dark text-white rounded-borders"
			style="height: 75px; max-width: 400px; font-family: 'Cambria Math',serif"
		>
			<div class="q-py-sm q-px-md">
				<p>
					<i>GET   /api/service/<span style="color: red">68</span>/</i>
				</p>
			</div>
		</q-scroll-area>
		<br>
		<p>
			El número en rojo corresponde al id del servicio y la respuesta que recibimos sería la siguiente:
		</p>
		<br>
		<q-scroll-area
			dark
			class="bg-dark text-white rounded-borders"
			style="height: 200px; max-width: 400px; font-family: 'Cambria Math', sans-serif"
		>
			<div class="q-py-sm q-px-md">
				<p style="text-align: start;">
					{<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"id": 68,<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"name": "Planet Fitness",<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"address": "25 Broadway",<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"website": "www.planetfitness.com",<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"href_web": "http://www.planetfitness.com/gyms/<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;manhattan-wall-st-ny-212",<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"phone": "+1 646-216-3131",<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"rating": 3.8,<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"reviews": 317,<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"date_creation": "2020-10-26T07:00:22.590267-04:00",<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"date_updated": "2020-10-26T07:00:22.590267-04:00",<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"type_service": {<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": 3,<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "gimnasio"<br>
					&nbsp;&nbsp;&nbsp;&nbsp;},<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"city": {<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": 4,<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"city_name": "nueva york",<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"lat": 40.71455,<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"lng": -74.00714,<br>
					&nbsp;&nbsp;&nbsp;&nbsp;},<br>
					&nbsp;&nbsp;&nbsp;&nbsp;"country": {<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": 3,<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"country_name": "estados unidos",<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"country_code": "USA"<br>
					&nbsp;&nbsp;&nbsp;&nbsp;}<br>
					}
				</p>
			</div>
		</q-scroll-area>
		
	
	
	</div>
</template>

<script>
export default {
	name: "api",
	data () {
		return {
		
		}
	},
	methods: {
	
	},
}
</script>

<style>

</style>