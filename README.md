# React Starter

This is a template for EmCasa's react projects. 

## Setup

To run this project you'll need:

- nodejs >= 12
- yarn

### 📦 Dependencies

Install nodejs dependencies:

```sh
yarn install
```

### ⚙️ Configuration

Configure your `.env` file according to [.env.example](./.env.example)

### 💻 Running

Run the `start` command to start the dev server.

```sh
yarn start
```

## CI Workflow

To configure your project's CircleCI workflow do the following:

In [.circleci/config.yml](.circleci/config.yml):
- Edit `configurations` on [L16](.circleci/config.yml#L16) according to your project
- Replace all instances of `react-starter-test`, `react-starter-staging` and
  `react-starter-production` with your project's respective contexts

To display Lighthouse results on PRs install the `Lighthouse app` on your github
project and copy your `LHCI_GITHUB_APP_TOKEN` to the `-test` context.

### Deploying

This project is set up to deploy on ECR and Elastic Beanstalk using CircleCI.
To enable this workflow do the following:

In [.elasticbeanstalk/config.yml](.elasticbeanstalk/config.yml#L2), configure your eb project's name.
For advanced customization you may use `.ebextensions/`
([See the docs](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html)).

Then, uncomment all jobs from [L136](.circleci/config.yml#L136) of `.circleci/config.yml`.

CircleCI needs these variables to deploy on AWS:

```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=***
AWS_SECRET_ACCESS_KEY=***
```

Both the server and client get bundled on CircleCI, copied to a docker
container and then deployed to ECR. This means that all application variables
should be defined on the CircleCI context, which is only overridden by `.env`
