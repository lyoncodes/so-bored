<template lang="pug">
  b-row.justify-content-center
    b-col.col-12.p-0
        b-col.col-12.mt-2.p-0
          b-form.mb-2.mt-2(
            @submit.prevent="addComment(comment)"
            v-if="show")
            b-form-textarea(
              autofocus
              id="annotate-text"
              v-model="comment.text"
              @keyup="validateCharCount()"
              @keydown.enter.prevent="addComment(comment)"
            )
            b-row.p-0
              a.validation-char.mt-2.mb-0.ml-3(v-if="show") {{comment.text.length}} / {{ commentValidation.charLimit}}
            b-row.justify-content-end
              button#submit-annotation.neu-c-button.m-0.mr-3(
                type="submit"
                :disabled="!comment.text.length"
              ) Submit
            b-row(v-if="comment.text.length > commentValidation.charLimit")
              b-badge(variant="danger") {{ commentValidation.errorMsg }}
        b-row.justify-content-center
          b-col.col-8(v-if="!show && !rule.comments.length && !rule.links.length")
            b-row.justify-content-center
              span.caption click
              span
                img.card-icon-sm.pl-1.pr-1(src='../../assets/add-post.svg')
              span.caption to add the first comment to this post
            b-row.justify-content-center.pt-2
              span.caption ...or add links
              span
                img.card-icon-sm.pl-1.pr-1(src='../../assets/link.svg')
              span.caption
        b-col.col-12.mt-2(v-for="comment in rule.comments").comments-section
          b-row.comments-container
            b-col.col-10.col-lg-11.p-0
              p.caption.pl-2.pt-2.mb-1 {{ comment.author }} says:
              p.comment-text.pl-4.pt-1 {{ comment.text }}
            b-col.col-1.p-0.mb-1
              button.mb-1.link-button(
                @click="handleDelete(comment)"
                v-if="user.username === comment.author")
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
        commentSerial: null,
        commentType: null
      },
      commentValidation: {
        charLimit: 160,
        errorMsg: String
      },
      user: this.userProfile
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
      const commentSerial = this.serialMaker()
      const id = this.$props.rule.id
      const author = this.userProfile.username
      const { text, commentType } = this.comment
      const commentPayload = {
        text,
        author,
        id,
        commentSerial,
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
        commentSerial: null,
        commentType: false
      }
      this.$emit('toggleCommentFormEvent')
    },
    serialMaker () {
      const rando = Math.floor(Math.random() * 1000)
      return Math.floor(Math.random() * rando)
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
</style>
