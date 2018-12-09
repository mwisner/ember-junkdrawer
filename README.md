# ember-junkdrawer
https://www.npr.org/sections/theprotojournalist/2014/08/15/337759135/what-your-junk-drawer-reveals-about-you

## Install
```bash
ember install ember-junkdrawer
```

# Examples
For full docs, visit [the docs site](https://mwisner.github.io/ember-junkdrawer/master/)

## Bootstrap Extras
The great [Ember Bootstrap](http://www.ember-bootstrap.com/) addon provides a lot of great functionality.
This addon provides some useful items outside the scope for the more general purpose addon.

### UI-Card Component
A ergonomic contextual component for bootstrap's `.card` components. 

```hbs
    <BsCard as |c|>
        <c.image position="top" src="htts://my-static-img.png">
        <c.header>Card Header</c.header>
        <c.body as |bod|>
            <bod.title>Title</bod.title>
            <bod.subtitle>Subtitle</bod.subtitle>
            <bod.text>Card text here........</bod.text>
        </c.body>
        <c.footer>Card Footer</c.footer>
    </BsCard>
```

### Close Button
At long last, our national nightmare of copying and pasting a close button is over.

```hbs
  <CloseButton (action "myCloseActionName")/>
```

### Link-Button
Typing `btn btn-default` over and over again? SAD! It's the same arguments as `{{link-to}}`
with an additional optional `type` param (defaults to `primary`). [See Ember Bootstrap {{#bs-button}}](http://www.ember-bootstrap.com/#/components/button)

```hbs
  {{#bs/link-button "posts.post" post.id type="primary"}}Read Post{{/bs/link-button}}
```


### List Groups
Bootstrap list groups require too much boilerplate html. We provide a configurable set
of components to create groups.

```hbs
  <ListGroup as |g|>
    <g.item @text="inline-text">
    <g.item @active="isActive" @tagName="div" @disabled=true @type="danger">
      Blocks work too!
    </g.item>
    <g.action onClick={{action "myAction"}}>Send action as a button</g.action>
    <g.link "route.detail" "id"> Links come free</g.link>
  </ListGroup>
```

### Confirm Button
A little more delicious syntax sugar :honey_pot: for when you want to have a button with
modal confirmation.

```hbs
    {{#confirm-button
      type="danger"
      buttonText="Dangerous Action"
      modalTitle="Trigger Missile Alert?"
      onSubmit=(action "realMissileAlert")
      onCancel=(action "fakeMissileAlert")
    }}
      This is the text that goes into the body of the modal.
    
    {{/confirm-button}}
```

### Form Controls
This addon provides two custom form controls: Baremetrics Calendar and Avatar.
Avatar is a custom upload type with configurable in-browser image cropping.

```handlebars
{{#bs-form model=changeset onSubmit=(action "submit") as |form|}}
  {{#ui/ui-box as |b|}}
    {{#b.body}}
      {{form.element controlType="avatar" property="logoPropertyName"}}
      {{form.element controlType="baremetrics" property="dateRange" options=(hash presets=presets)}}
      {{form.element controlType="x-toggle" property="active" options=(hash theme="light")}}
    {{/b.body}}
  {{/ui/ui-box}}
{{/bs-form}}
```

The baremetrics calendar element takes a hash of `options` that is the same hash available to pass
to [Baremetrics Calendar](https://github.com/davewasmer/ember-baremetrics-calendar/pull/12)


## Tables
Template driven tables with support for filtering.

```handlebars
{{#table/model-table
  dir=dir
  sort=sort
  columns=columns
  recordQuery=myQueryFilterOptions
  recordType=recordType as |t|}}

  {{#t.filter
    defaultRecordQuery=defaultRecordQuery
    preFilterAlter=(action "preFilterAlter")
  as |filter|}}
    {{filter.element label="Name" controlType="text" property="name__icontains"}}
    {{filter.element label="Date Range" controlType="baremetrics" presets=dateFilterPresets property="daterange"}}
  {{/t.filter}}
  
  {{#t.loader}}
    Loading...
  {{/t.loader}}
  
  {{#t.noResults}}
    No Results Found
  {{/t.noResults}}

{{/table/model-table}}
```

## Forms


## Form Providers
Form providers are a way to provide some isolated business logic in a reusable manner in your UI without duplicating
code between components/controllers when needing to reuse form business logic across different UIs. 

### DS-Model Provider
Takes a model as an argument and does no validation: 

```handlebars
{{#ds-form-provider
   model=model
   onSubmitSuccess=(action submitSuccess)
   onServerError=(action (mut hasErrored) true)
 as |provider|}}
    {{#if hasErrored}}
     <p class="alert-danger">An Error Has Occurred</p>
    {{/if}}
    {{#bs-form model=provider.model onSubmit=(action provider.submit) as |form|}}
     {{form.element controlType="text" value="title" label="title"}}
     {{#bs-button type="submit" disabled=provider.isLoading id="save"}}Save{{/bs-button}}
    {{/bs-form}}
{{/ds-form-provider}}
```

### Changeset Providers
For users of ember-changeset, takes a model and optional validators, and provides a changeset. If your server returns
JSON:API compliant errors, also applies those errors to the changset after a form submittal.

```handlebars
{{#changeset-provider model=model validations=ModelValidator as |provider|}}
{{#bs-form model=provider.model onSubmit=(action provider.submit) as |form|}}
  {{form.element controlType="text" value="title" label="title"}}
  {{#bs-button type="submit" disabled=provider.isLoading}}Save{{/bs-button}}
{{/bs-form}}
{{/changeset-provider}}
```

## Encapsulated Form (Old Way)
my-form-component.js:
```js
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';

import FormComponent from 'ember-junkdrawer/components/form/changeset-form';
import OrganizationValidations from '../../validators/organization';

export default FormComponent.extend({
  flashMessages: service(),

  validator: OrganizationValidations,
  model: computed(function() {
    return get(this, 'organization');
  }),

  /**
   * Success
   */
  onSubmitSuccess() {
    get(this, 'flashMessages').success('Organization Updated');
  },

});
```


component.hbs:
```handlebars
{{component/my-form-component organization=model}}
```


# Tree Shaking
Use either blacklist or whitelist, not both.
In your ember-cli-build.js:

```js
    'ember-junkdrawer': {
      'blacklist': [
        'service:current-user'
      ]
    },
```

## List of things that can be added/removed:
| Type          |       Label |
| ------------- | ------------- |
| Form Control  | form-control:avatar  |
| Component  | component:changeset-form  |
| Component  | component:simple-form-group  |
| Component  | component:table-loader  |
| Component  | component:thing-list-item  |
| Component  | component:thing-list  |
| Component  | component:ui-box  |
| Component  | compoennt:close-button |
| Helper  | helper:ui-page-property  |
| Mixin  | mixin:model-data-table-common  |
| Service  | service:current-user  |
| Service  | service:ui-global  |


# Random Stuff

## Custom Blueprint
`ember g changeset-form <name>`: Generates the default `.hbs` and `.js` files for
the changeset form.

## Current User Service
The `ember-junkdrawer` current user service provides lots of helpful functionality
for getting the current user via ember-concurrency tasks.

Requirements:
**You must** have an endpoint to fetch the current user at `/users/?current=true`.
That endpoint should serialize with your store's user object.

By default, the CurrentUser service will push data to `ember-intercom`. Don't wan't that? You can opt out at anytime:

### Configuration

```js
//environment.js
ENV['ember-junkdrawer'] = {
  enableFeatures: false,
  enableIntercom: false,
  enableFlashMessages: false
}
```

If your app doesn't include those, it won't inject them.

### Hooks
This addon exposes three hooks you can use to implement in your own. You can use the default
generator to extend the provided service `ember generate current-user <your service>`.

```js
didSetupUser(user) {},
didSetupOrganization(organization) {},
didUserLoadError(){}
```

## Default Ember Data Time Stamped Model
Tired of using the same stupid model every time?

The time stamped model comes pre-loaded with: `created`, `modified`, `metadata` properties
predefined.

```js
  // myapp/app/models/mymodel.js
  import TimeStampModel from 'ember-junkdrawer/models/time-stamped-model';
  export default TimeStampModel.extend({
    custom: DS.attr('string')
  })
```
