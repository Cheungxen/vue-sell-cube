const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  data () {
    return {
      selectRatingType: ALL,
      onlyContent: false
    }
  },
  computed: {
    positiveRatings: function () {
      return this.ratings.filter(item => {
        return item.rateType === POSITIVE
      })
    },
    negativeRatings: function () {
      return this.ratings.filter(item => {
        return item.rateType === NEGATIVE
      })
    },
    filteredRatings: function () {
      if (!this.onlyContent) {
        if (this.selectRatingType === ALL) {
          return this.ratings
        } else if (this.selectRatingType === POSITIVE) {
          return this.positiveRatings
        } else {
          return this.negativeRatings
        }
      } else {
        if (this.selectRatingType === ALL) {
          return this.ratings.filter(item => item.text !== '')
        } else if (this.selectRatingType === POSITIVE) {
          return this.positiveRatings.filter(item => item.text !== '')
        } else {
          return this.negativeRatings.filter(item => item.text !== '')
        }
      }
    }
  },
  methods: {
    onselectRatingType (val) {
      this.selectRatingType = val
    },
    ontoggleRatingContent () {
      this.onlyContent = !this.onlyContent
    }
  }
}
