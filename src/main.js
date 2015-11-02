export function configure(aurelia) {
  console.log(aurelia);
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  aurelia.start().then(a => a.setRoot());
}
