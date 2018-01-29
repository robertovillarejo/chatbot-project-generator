'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  /*
  This.argument('app-name', {
    desc: 'Your project name',
    type: String,
    default: this.appname
  });

  this.argument('app-page', {
    desc: 'Your project page',
    type: String,
    default: ''
  });

  this.argument('description', {
    desc: 'Your project description',
    type: String,
    default: ''
  });

  this.argument('author', {
    desc: 'Your name or your company name',
    type: String,
    default: ''
  });

  this.argument('port', {
    desc: 'The port to expose the project',
    type: Number,
    default: 8090
  });

  this.argument('webhook', {
    desc: 'Enable webhook support for fulfillment',
    type: Boolean,
    default: true
  });

  this.argument('endpoint-webhook', {
    desc: 'Your endpoint webhook for fulfillment',
    type: String,
    default: 'http://localhost:8090/fulfillment'
  });

  this.argument('facebook', {
    desc: 'Enable Facebook Bot support',
    type: Boolean,
    default: true
  });

  this.argument('facebook-menu', {
    desc: 'Enable Facebook Bot menu',
    type: Boolean,
    default: true
  });

  this.argument('facebook-access-token', {
    desc: 'Your Facebook access token',
    type: String,
    default: ''
  });

  this.argument('facebook-verify-token', {
    desc: 'Your Facebook verify token',
    type: String,
    default: ''
  });

  this.argument('nlp-service', {
    desc: 'Your NLP service',
    type: String,
    default: 'DIALOGFLOW'
  });

  this.argument('dialogflow-client-token', {
    desc: 'Your DialogFlow client token',
    type: String,
    default: ''
  });

  this.argument('dialogflow-developer-token', {
    desc: 'Your DialogFlow developer token',
    type: String,
    default: ''
  });

  this.argument('git-repository', {
    desc: 'Your Git remote repository',
    type: String,
    default: ''
  });

  this.argument('license', {
    desc: 'Your project license',
    type: String,
    default: 'MIT'
  });
  */

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        'Welcome to the awe-inspiring ' +
          chalk.red('generator-chatbot-broker') +
          ' generator!'
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'app-name',
        message: 'Your project name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'The project description',
        default: 'Autogenerated chatbot broker'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Your name or company name',
        default: ''
      },
      {
        type: 'input',
        name: 'port',
        message: 'The port to expose the project',
        validate: function(value) {
          return !isNaN(parseInt(value, 10));
        },
        default: 8090
      },
      {
        type: 'confirm',
        name: 'webhook',
        message: 'Do you want to create a webhook?',
        default: true
      },
      {
        type: 'input',
        name: 'endpoint-webhook',
        message: 'Your endpoint for fulfillment',
        default: '',
        when: function(answers) {
          return answers.webhook;
        }
      },
      {
        type: 'checkbox',
        name: 'messaging-platforms',
        message: 'Messaging platforms',
        choices: [
          {
            name: 'facebook',
            checked: true
          }
        ]
      },
      {
        type: 'confirm',
        name: 'facebook-menu',
        message: 'Do you want to generate a menu in Facebook chat?',
        default: true,
        when: function(answers) {
          return answers['messaging-platforms'].includes('facebook');
        }
      },
      {
        type: 'input',
        name: 'app-page',
        message: 'Your project page',
        default: '',
        when: function(answers) {
          return answers['facebook-menu'];
        }
      },
      {
        type: 'password',
        name: 'facebook-access-token',
        message: 'Your Facebook access token (leave empty to manual edit in .env file)',
        default: '',
        when: function(answers) {
          return answers['messaging-platforms'].includes('facebook');
        }
      },
      {
        type: 'password',
        name: 'facebook-verify-token',
        message: 'Your Facebook verify token (leave empty to manual edit in .env file)',
        default: '',
        when: function(answers) {
          return answers['messaging-platforms'].includes('facebook');
        }
      },
      {
        type: 'list',
        name: 'nlp-services',
        message: 'NLP services',
        choices: [
          {
            name: 'DIALOGFLOW',
            checked: true
          }
        ]
      },
      {
        type: 'password',
        name: 'dialogflow-client-token',
        message: 'Your DialogFlow client token (leave empty to manual edit in .env file)',
        default: '',
        when: function(answers) {
          return answers['nlp-services'].includes('DIALOGFLOW');
        }
      },
      {
        type: 'password',
        name: 'dialogflow-developer-token',
        message:
          'Your DialogFlow developer token (leave empty to manual edit in .env file)',
        default: '',
        when: function(answers) {
          return answers['nlp-services'].includes('DIALOGFLOW');
        }
      },
      {
        type: 'input',
        name: 'git-repository',
        message: 'Your git remote repository',
        default: ''
      },
      {
        type: 'list',
        name: 'license',
        message: 'The license',
        choices: [{ name: 'MIT' }]
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.options = props;
      this.props = props;
      if (props['messaging-platforms'].includes('facebook')) {
        this.options.facebook = true;
      }
      if (props['nlp-services'].includes('DIALOGFLOW')) {
        this.options.nlpService = 'DIALOGFLOW';
      }
    });
  }

  writing() {
    var options = {
      appName: this.options['app-name'],
      appPage: this.options['app-page'],
      description: this.options.description,
      author: this.options.author,
      webhook: this.options.webhook,
      webhookConfig: {
        endpoint: this.options['endpoint-webhook']
      },
      facebookBot: this.options.facebook && true,
      facebookBotConfig: {
        menu: this.options['facebook-menu'] && true,
        accessToken: this.options['facebook-access-token'],
        verifyToken: this.options['facebook-verify-token']
      },
      nlpService: 'DIALOGFLOW',
      dialogFlowConfig: {
        clientToken: this.options['dialogflow-client-token'],
        developerToken: this.options['dialogflow-developer-token']
      },
      gitRepository: this.options['git-repository'],
      license: this.options.license,
      port: this.options.port
    };

    /* If (options.facebook) {
      this.fs.copyTpl(
        this.templatePath('chatbot-archetype/facebook'),
        this.destinationPath(this.destinationRoot() + '/facebook'),
        options);
    } */

    this.fs.copyTpl(
      this.templatePath('chatbot-archetype'),
      this.destinationPath(this.destinationRoot()),
      options,
      undefined,
      { globOptions: { dot: true } }
    );
  }

  install() {
    this.npmInstall();
  }
};
