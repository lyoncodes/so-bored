# docs
```
so-bored is a single threaded message board powered by Vue.js, VueX, and Firebase, made to show off a neumorphic front-end design with real-life CRUD operations.

Make an account with a valid email address and start posting! Posts are like paired down tweets, with a title and text field. 1 layer of commenting is supported on each post. 

In v1, anyone can edit anything, but this will likely change as the site is shared.

Our next features will be:

robust svg animations
local file updloading
profile creation
post collection threading

```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Notes from Michael
```
The store holds the posts array, which is hydrated on auth state changes. Each post is a list. The post list's iterator functionality is handled by vueX's built-in functions, which can be seen in the template of the postsHome component (v-for, in).

The rest of the lists functions (append, remove, moveTo, find, etc.) are sprinkled throughout the component tree where they are most immediately applicable.

The list has some boolean switches to handle toggleability within an instantiated post. Things like form display and error messages are handled by these values.
```