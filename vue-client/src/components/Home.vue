<template>

	<v-data-table
	    :headers="headers"
	    :items="displayItems"
	    class="elevation-1"
	  >

    <template slot="headers" slot-scope="props">
      <th class="text-md-center">{{ props.headers[0].value }}</th>
    </template>

		<template slot="items" slot-scope="props">
			<td class="text-md-center">{{ props.item.message }}</td>
		</template>
		      
	  <template slot="no-data">
	    <v-btn color="primary" @click="loadData">Reload</v-btn>
	  </template>
	  
	</v-data-table>
	  
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore'

export default {
  data () {
    return {
      data: [],
      headers: [
        { text: 'message', value: 'message', sortable: false }
      ]
    }
  },
  computed: {
    dataId () {
      return this.$route.params.id
    },
    displayItems () {
      return this.data
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    /* Sync databasesu */
    loadData () {
      const ref = firebase.firestore().collection('items')
        .orderBy('timestamp')
      ref.onSnapshot(querySnapshot => {
        this.data = []
        querySnapshot.forEach(doc => {
          const message = {
            id: doc.id,
            message: doc.data().message
          }
          this.data.push(message)
        })
      })
    }
  }
}
</script>


