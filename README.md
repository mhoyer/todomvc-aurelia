=== Todo MVC based on Aurelia

 * following the getting started tutorial: http://aurelia.io/get-started.html
 * target: create TodoMVC app for http://todomvc.com/

== Open questions

 * referencing jspm packages in ES6 only works easy through SystemJS (as with the mappings in `config.js`). But I didn't found a way to use those jspm-mappings without SystemJS. e.g. `import {Router} from 'aurelia-router';` won't work. :-(
