<template lang="pug">
b-col.col-12.p-0
  b-badge.post-form-error-badge(v-if="isError" variant="danger") This comment is too long!
  b-form.mb-2(
    @submit.prevent="addComment(comment)"
    v-bind:class="errorObject")
    b-form-textarea(
      autofocus
      id="annotate-text"
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
        img#add-comment-icon.inline-card-icon(src='../../assets/add-post-red.svg')
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'postCommentForm',
  props: ['post', 'show', 'validation', 'formChar'],
  data () {
    return {
      comment: {
        text: '',
        commentSerial: null,
        commentType: null
      },
      isError: null
    }
  },
  computed: {
    ...mapState([
      'posts',
      'userProfile'
    ]),
    errorObject: function () {
      return {
        error: this.comment.text.length > this.validation.commentLimit ? true : null
      }
    }
  },
  watch: {
    isError: () => {
      console.log('error! text length is too long in title or text')
    }
  },
  methods: {
    ...mapActions([
      'mother'
    ]),
    addComment (comment) {
      this.comment.commentType = true
      const commentSerial = this.serialMaker()
      const id = this.$props.post.id
      const author = this.userProfile.username
      const { text, commentType } = this.comment
      const commentPayload = {
        text,
        author,
        id,
        commentSerial,
        commentType
      }
      if (!this.isError) {
        this.mother(commentPayload)
        this.clearComment()
      }
    },
    clearComment () {
      this.comment = {
        text: '',
        author: '',
        commentSerial: null,
        commentType: false
      }
      this.isError = false
      this.$emit('toggleCommentForm', this.comment.commentType)
    },
    serialMaker () {
      const rando = Math.floor(Math.random() * 1000)
      return Math.floor(Math.random() * rando)
    },
    validateCharCount () {
      this.formChar.charCount = this.comment.text.length
      this.isError = this.formChar.charCount > this.validation.commentLimit ? true : null
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
