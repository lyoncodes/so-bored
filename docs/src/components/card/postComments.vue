<template lang="pug">
  b-container
    b-row.justify-content-center
      b-col.col-12.p-0
        b-form.mb-2.mt-4(
          @submit.prevent="addComment(comment)"
          v-if="show")
          b-form-textarea(
            id="annotate-text"
            v-model="comment.text"
            @keyup="validateCharCount()"
          )
          b-row.p-0
            a.validation-char.ml-3(v-if="show") {{comment.text.length}} / {{ commentValidation.charLimit}}
          b-row.justify-content-end
            button#submit-annotation.neu-c-button.p-3.m-0.mr-3(type="submit" v-if="!commentValidation.errorMsg" :disabled="!comment.text.length") Reply
          b-row(v-if="comment.text.length > commentValidation.charLimit")
            b-badge(variant="danger") {{ commentValidation.errorMsg }}
        b-row.mb-3.ml-2.pl-2.pr-2
          b-col.col-12.mt-2(v-for="comment in rule.comments").comments-section
            b-row.comments-container
              b-col.col-11.p-0
                p.caption.pl-2.pt-2.mb-1 {{ user.username }} says:
                p.comment-text.pl-2 {{ comment.text }}
              b-col.col-1.p-0
                b-button.icon-trigger.p-0.pt-2.pr-1(@click="handleDelete(comment)")
                  img.card-icon-sm(src="../../assets/delete.svg")
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'annotation',
  props: ['rule', 'show', 'validation'],
  data () {
    return {
      comment: {
        text: '',
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
      'rules',
      'userProfile'
    ])
  },
  methods: {
    ...mapActions([
      'mother'
    ]),
    validateCharCount () {
      this.commentValidation.errorMsg = this.comment.text.length > this.commentValidation.charLimit ? 'Too Many' : null
    },
    addComment (comment) {
      this.comment.commentType = true
      const id = this.$props.rule.id
      const author = this.userProfile.username
      const { text, commentType } = this.comment
      const commentPayload = {
        text,
        author,
        id,
        commentType
      }
      if (this.comment.text.length) {
        this.mother(commentPayload)
      }
      this.clearComment()
    },
    handleDelete (comment) {
      comment.commentType = false
      this.mother(comment)
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
    const user = this.userProfile
    this.user = user
  }
}
</script>
<style scoped lang="scss">
form {
  textarea {
    border: 1px solid $cotton-candy;
    outline: none;
    &:focus {
      border: 1px solid $metallic-blue;
    }
  }
}
.comments-section {
  margin: 1.5em 0 .25em 0;
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
