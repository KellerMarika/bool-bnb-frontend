<template>
  <nav v-if="pagination" aria-label="..." class="d-flex justify-content-end">
    <ul class="pagination">
      <!--     @click="api_GET(getPageNumber(link, pagination))" -->
      <li v-for="link in pagination.links"

          @click="api_GET('/search', query, getPageNumber(link, pagination))"

          class="page-item">

        <a class="page-link" :disabled="SetPageDisabled(link, pagination) ? 'disabled' : ''"
            :class="setPageActive(link)">{{
              getPageName(link) }}</a>
      </li>
    </ul>
  </nav>
</template>
<script>
import { store } from '../store';
export default {
  props: {
    /**
      *@param {int} current_page
       *@param {int} from
       *@param {int} last_page
       *@param {string} first_page_url
      *@param {string} last_page_url
      *@param {string||null} next_page_url
      *@param {string||null} prev_page_url
      *@param {int} per_page
      *@param {int} to
      *@param {int} total
      *@param {array} links
         */
    pagination: {
      required: true,
      type: Object
    },
    /**
    *@param {int} min_rooms
     *@param {int} min_beds
     *@param {int} radius
     *@param {array}  services
     *@param {string} lat
    *@param {string} lon
       */
    query: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      store,
      link_obj: {
        label: null,
        class: null,
      },

    }
  },
  methods: {

    /* EMIT */
    api_GET(thisRoutePath, payload, page) {
      this.$emit("api_GET", thisRoutePath, payload, page)
    },
    /* COMPUTED CHE NON VANNO COL THIS */

    getPageNumber(link, pagination) {

      if (isNaN(link.label)) {

        if (link.label.includes('Previous')) {
          if (pagination.current_page - 1 <= 1) {
            pagination.current_page = 1;

            return { "page": pagination.current_page }
          } else {
            /*   console.log("CURRENT", pagination.current_page) */
            pagination.current_page -= 1
            return { "page": pagination.current_page }
          }

        } else if (link.label.includes('Next')) {

          if (pagination.current_page + 1 < pagination.last_page) {
            pagination.current_page += 1
            return { "page": pagination.current_page }

          } else {
            pagination.current_page = pagination.last_page
            return { "page": pagination.current_page }
          }
        }
      } else {
        pagination.current_page = link.label
        return { "page": pagination.current_page }
      }
    },

    getPageName(link) {
      if (isNaN(link.label)) {
        if (link.label.includes('Previous')) {

          return 'previous'
        } else if (link.label.includes('Next')) {
          return 'next'
        }
      } else {
        return link.label
      }
    },

    SetPageDisabled(link, pagination) {

      if (isNaN(link.label)) {
        if (link.label.includes('Previous') && pagination.current_page <= 1) {
          return '1'
        } else if (link.label.includes('Next') && pagination.current_page >= pagination.last_page) {
          return '1'
        }
      }
    },
    setPageActive(link) {
      if (link.active === true)
        return "active"
    }
  },

  computed: {
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@use "../styles/generic.scss";
@use "../styles/partials/variables.scss";


/* ADMIN/PROJECTS */
.pagination {
  li a {
    color: variables.$dark_color;

    &.active {
      background-color: variables.$primary_color;
    }
  }



}
</style>