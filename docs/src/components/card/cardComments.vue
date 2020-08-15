<template lang="pug">
  b-container.mt-3
    b-row.justify-content-center
      b-col.col-8
        a.validation-char {{comment.text.length}} / {{ commentValidation.charLimit}}
      b-col.col-12
        b-form.mb-2.mt-4(
          @submit.prevent="addComment(comment)"
          v-if="show")
          b-form-textarea(
            id="annotate-text"
            v-model="comment.text"
            @keyup="validateCharCount()"
          )
          b-row(v-if="comment.text.length > commentValidation.charLimit")
            b-badge(variant="danger") {{ commentValidation.errorMsg }}
          b-button#submit-annotation(type="submit" variant="primary" v-if="!commentValidation.errorMsg" :disabled="!comment.text.length")
            img.annotate-icon(src="../../assets/add.svg")
        p.comments-section(v-for="comment in rule.comments") {{ comment.text }}
          b-button(@click="handleDelete(comment)") Delete
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'annotation',
  props: ['rule', 'show'],
  data () {
    return {
      comment: {
        text: '',
        author: '',
        commentType: null
      },
      commentValidation: {
        charLimit: 160,
        errorMsg: String
      }
    }
  },
  computed: {
    ...mapState([
      'rules'
    ])
  },
  methods: {
    ...mapActions([
      'actionThis'
    ]),
    validateCharCount () {
      this.commentValidation.errorMsg = this.comment.text.length > this.commentValidation.charLimit ? 'Too Many' : null
    },
    addComment (comment) {
      this.comment.commentType = true
      const id = this.$props.rule.id
      const { text, author, commentType } = this.comment
      const commentPayload = {
        text,
        author,
        id,
        commentType
      }
      if (this.comment.text.length) {
        this.actionThis(commentPayload)
      }
      this.clearComment()
    },
    handleDelete (comment) {
      comment.commentType = false
      this.actionThis(comment)
    },
    clearComment () {
      this.comment = {
        text: '',
        author: '',
        commentType: false
      }
    }
  },
  mounted () {
    const ruleData = this.comment
    this.ruleData = ruleData
  }
}
</script>
<style scoped lang="scss">
form {
  textarea {
    border: 1px solid $neon;
    outline: none;
    &:focus {
      border: 1px solid $indigo;
    }
  }
}
.comments-section {
  margin: 1.25em;
}
.annotate-icon {
  height: 2em;
}
#submit-annotation{
  border: 0em;
  box-shadow: none;
  margin: 1em;
  padding: .25em;
}
#edit-button {
  border: 0em;
  padding: 0;
  &:active, :focus {
    background: none!important;
  }
}
</style>
