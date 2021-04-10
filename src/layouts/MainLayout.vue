<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-black glossy text-amber-6">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="text-amber-6">
          PyCloud
        </q-toolbar-title>
	      <q-btn :style="$q.screen.lt.sm ? '': 'display: none;' "
	             rounded
	             push
	             icon="menu">
		      <q-menu auto-close content-class="bg-white text-amber">
			      <q-list style="min-width: 70px">
				      <q-item clickable v-close-popup>
					      <q-item-section>
						      <router-link to="/">
							      <q-btn stretch flat label="Buscar" unelevated size="md"
							             style="margin: 0;"
							             padding="none"
							      />
						      </router-link>
					      </q-item-section>
				      </q-item>
				      <q-item clickable v-close-popup>
					      <q-item-section>
						      <router-link :to="{ name: 'servicios' }">
							      <q-btn stretch flat label="Servicios" unelevated size="md"
							             style="margin: 0;"
							             padding="none"
							      />
						      </router-link>
					      </q-item-section>
				      </q-item>
				      <q-item clickable v-close-popup>
					      <q-item-section>
						      <router-link :to="{ name: 'api' }">
							      <q-btn stretch flat label="API" unelevated size="md"
							             style="margin: 0;"
							             padding="none"
							             :ripple="{ color: 'white', center: true }"
							      />
						      </router-link>
					      </q-item-section>
				      </q-item>
			      </q-list>
		      </q-menu>
	      </q-btn>
	      <div :style="$q.screen.lt.sm ? 'display: none;' : ' '">
		      <router-link to="/">
			      <q-btn stretch flat label="Buscar" />
		      </router-link>
		
		      <router-link :to="{ name: 'servicios' }">
			      <q-btn stretch flat label="Servicios" />
		      </router-link>
		
		      <router-link  :to="{ name: 'api' }">
			      <q-btn stretch flat label="API" />
		      </router-link>
	      </div>
	      
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-amber-3"
    >
      <q-list>
        <q-item-label
          header
          class="text-black"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'The Cloud Group',
    caption: 'thecloud.group',
    icon: 'public',
    link: 'https://thecloud.group'
  },
  {
    title: 'Facebook',
    caption: '@TheCloudGroup',
    icon: 'facebook',
    link: 'https://www.facebook.com/thecloudgroupglobal/'
  },
];


export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
    }
  }
}
</script>

<style lang="sass">
a
	text-decoration: none
	color: #F2C037
</style>