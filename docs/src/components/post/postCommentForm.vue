<template lang="pug">
b-col.col-12.p-0
  .post-form-error-badge(v-if="isError" variant="danger") This comment is too long!
  b-form.mb-2(
    @submit.prevent="addComment(comment)"
    v-bind:class="errorObject")
    b-form-textarea(
      autofocus
      id="comment-text-field"
      v-model="comment.text"
      @keyup="validateCharCount()"
      @keydown.enter.prevent="addComment(comment)"
      placeholder="add a comment..."
    )
    b-row.p-0.justify-content-between
      a.validation-char.mt-2.mb-0.ml-3(v-bind:class="errorObject") {{comment.text.length}} / {{ validation.commentLimit}}
      button#submit-comment-button.m-0.mr-3(
        type="submit"
        :disabled="!comment.text.length")
        img#add-comment-icon.inline-card-icon(v-bind:src="imgFolder[5]" width="640" height="360")
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'postCommentForm',
  props: ['post', 'show', 'validation', 'formCounter'],
  data () {
    return {
      comment: {
        text: '',
        serialId: String
      },
      isError: null
    }
  },
  computed: {
    ...mapState([
      'posts',
      'userProfile',
      'imgFolder'
    ]),
    errorObject: function () {
      return {
        error: this.comment.text.length > this.validation.commentLimit ? true : null
      }
    }
  },
  watch: {
    isError: () => {
    }
  },
  methods: {
    ...mapActions([
      'createComment'
    ]),
    addComment (comment) {
      const text = this.comment.text
      const userName = this.userProfile.username
      const reference = this.$props.post.id
      const serialId = this.serialMaker()
      const commentPayload = {
        text,
        userName,
        reference,
        serialId
      }
      if (!this.isError) {
        this.createComment(commentPayload)
        this.clearComment()
      }
    },

    clearComment () {
      this.comment = {
        text: '',
        userName: '',
        serialId: String
      }
      this.isError = false
    },
    serialMaker () {
      const rando = Math.floor(Math.random() * 100000)
      return Math.floor(Math.random() * rando)
    },
    validateCharCount () {
      this.formCounter.charCount = this.comment.text.length
      this.isError = this.formCounter.charCount > this.validation.commentLimit ? true : null
    }
  },
  mounted () {
    const ruleData = this.comment
    this.ruleData = ruleData
    const user = this.user
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
.error .validation-char {
  color: $candy-red!important;
}
@media only screen and (min-width: 1045px) {
  .link-button {
    left: 0;
  }
}
</style>
