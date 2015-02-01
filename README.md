# Aurelia • [TodoMVC](http://todomvc.com)

> *Aurelia* is a next generation JavaScript client framework that leverages simple conventions to empower your creativity.

## Resources

- [Website](http://aurelia.io/)
- [Documentation](http://aurelia.io/docs.html)
- [Blog](http://blog.durandal.io/)

### Support

- [Twitter](http://twitter.com/pixelplastic)

*Let us [know](https://github.com/tastejs/todomvc/issues) if you discover anything worth sharing.*

## Implementation

- following the getting started tutorial: http://aurelia.io/get-started.html
- attempt to go TDD where possible

### Open questions while developing

- <s>referencing jspm packages in ES6 only works easy through SystemJS (as with the mappings in `config.js`). But I didn't found a way to use those jspm-mappings without SystemJS. e.g. `import {Router} from 'aurelia-router';` won't work. :-(</s>
  - simply `require` the `config.js` after referencing the `jspm_packages/system.js`
- `Todos.filteredItems` getter is called infitely - why?

### Todos (I know...)

- merging in the original styles from TodoMVC
- missing local storage support


## Credit

Created by [Marcel Hoyer](http://marcelhoyer.de)
