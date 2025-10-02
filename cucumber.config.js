module.exports = {
  default: {
    require: ['tests/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'json:reports/cucumber-report.json'],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    paths: ['features/**/*.feature'],
    worldParameters: {
      headless: false
    }
  }
};
