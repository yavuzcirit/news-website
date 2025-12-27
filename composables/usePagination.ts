export const usePagination = () => {
  const route = useRoute()

  const pageNumber = useState('pageNumber', () => {
    if (import.meta.client && sessionStorage.getItem('currentPageNumber')) {
      return parseInt(sessionStorage.getItem('currentPageNumber') || '1')
    }
    return 1
  })

  const currentPage = computed(() => {
    return route.query.page as string | undefined
  })

  const goToNextPage = async (nextPageToken: string | null) => {
    if (nextPageToken) {
      pageNumber.value++
      if (import.meta.client) {
        sessionStorage.setItem('currentPageNumber', pageNumber.value.toString())
      }
      await navigateTo({
        query: {
          page: nextPageToken
        }
      }, {
        external: true
      })
    }
  }

  const goToPreviousPage = async () => {
    if (pageNumber.value > 1) {
      pageNumber.value--
    }
    if (import.meta.client) {
      sessionStorage.setItem('currentPageNumber', pageNumber.value.toString())
    }
    await navigateTo({
      query: {}
    }, {
      external: true
    })
  }

  const hasPreviousPage = computed(() => {
    return !!currentPage.value
  })

  // Reset to page 1 if no query param
  if (!currentPage.value && pageNumber.value !== 1) {
    pageNumber.value = 1
    if (import.meta.client) {
      sessionStorage.setItem('currentPageNumber', '1')
    }
  }

  return {
    currentPage,
    goToNextPage,
    goToPreviousPage,
    hasPreviousPage,
    pageNumber
  }
}

