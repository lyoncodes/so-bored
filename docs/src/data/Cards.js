export default [
  // Mock Data
  {
    locked: true,
    type: 'Styles',
    title: '<h1> & <h2>',
    text: 'Some <h1> and <h2> styles: font-size, padding, heirarchy.',
    id: 0,
    active: false,
    updating: false,
    annotations: []
  },
  {
    locked: false,
    type: 'Styles',
    title: 'body & <p>',
    text: 'some body and <p> styles: font-size, padding, and masts.',
    id: 1,
    active: false,
    updating: false,
    annotations: [],
    annotationValidation: {
      charLimit: 60,
      errorMsg: String
    }
  },
  {
    locked: false,
    type: 'Copy',
    title: 'Heading Colors',
    text: 'Use #fff against $bg-color-dark',
    id: 2,
    active: false,
    updating: false,
    annotations: [],
    annotationValidation: {
      charLimit: 60,
      errorMsg: String
    }
  },
  {
    locked: false,
    type: 'Copy',
    title: 'Text Colors',
    text: 'text-colors: black, white, teal',
    id: 3,
    active: false,
    updating: false,
    annotations: [],
    annotationValidation: {
      charLimit: 60,
      errorMsg: String
    }
  },
  {
    locked: false,
    type: 'Layout',
    title: 'Col-Grid',
    text: 'we have a robust custom grid system with the following syntax: grid-xs, grid-sm, grid-md...etc.',
    id: 4,
    active: false,
    updating: false,
    annotations: [],
    annotationValidation: {
      charLimit: 60,
      errorMsg: String
    }
  },
  {
    locked: false,
    type: 'Layout',
    title: 'Grid-Style',
    text: 'the default grid padding is 10px, creating 20px gutters between cols',
    id: 5,
    active: false,
    updating: false,
    annotations: [],
    annotationValidation: {
      charLimit: 60,
      errorMsg: String
    }
  }

]
