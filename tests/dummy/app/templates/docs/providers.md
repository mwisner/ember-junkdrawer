# Form Providers

Forms are hard. There are many times where app developers want to have repeatable business logic, but different 
ui patterns. The form providers, stolen from [Ember Map](https://embermap.com/video/using-form-providers), is a great way to remove form logic from 
controllers in a repeatable pattern.

## Quick Example

The easiest way to use a provider is using the `ds-model-provider` component. 
{{docs-snippet name='ds-model-example.hbs' title='my-route.hbs'}}

## Handling Form Results

The payload returned from the server, will be returned to `onSubmitSuccess` or `onServerError` when the form 
is submitted.

## Changeset Provider
If you use [Ember Changeset](https://github.com/poteto/ember-changeset) and JSON-API `changeset-provider` will take a 
a vanilla model and automatically convert it to a changeset (you can also provide a changeset directly.) Additionally, 
you can pass [Changeset Validations](https://github.com/poteto/ember-changeset-validations) to do client side 
validations.

If your backend conforms to JSON-API, the component will apply those errors to the changeset to allow all 
of the changeset error handling and validations propagate down the component tree. 

{{docs-snippet name='changeset-provider.hbs' title='mychangeset-route.hbs'}}