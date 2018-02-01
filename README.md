# ember-junkdrawer
https://www.npr.org/sections/theprotojournalist/2014/08/15/337759135/what-your-junk-drawer-reveals-about-you

## Install
```bash
ember install ember-junkdrawer
```

# Quick & Dirty Component Examples
## Tables
Template driven tables with support for filtering.

```handlebars
{{#table/model-table
  dir=dir
  sort=sort
  columns=columns
  recordType=recordType as |t| }}

  {{#t.filter
    defaultRecordQuery=defaultRecordQuery
    preFilterAlter=(action "preFilterAlter")
  as |filter|}}
    {{filter.element label="Name" controlType="text" property="name__icontains"}}
    {{filter.element label="Date Range" controlType="baremetrics" presets=dateFilterPresets property="daterange"}}
  {{/t.filter}}

{{/table/model-table}}
```

## Forms

component.js:
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

component.hbs:
```handlebars
{{component/my-component organization=model}}
```

## UI Box
component.hbs:
```handlebars
{{#ui/ui-box as |b|}}

  {{#b.header}}
    Create New Organization
  {{/b.header}}

  {{#b.body classNames="no-padding"}}
    {{form.element label="Organization Name" controlType="text" property="name"}}
  {{/b.body}}

  {{#b.footer}}
    {{bs-button defaultText="Create Organization" pendingText="Saving..." buttonType="submit"}}
  {{/b.footer}}

{{/ui/ui-box}}
```
Set `classNames` to pass modifier classes to the component.
Set `tagName` to override the component's default element.

## Bootstrap Extras
The great [Ember Bootstrap](http://www.ember-bootstrap.com/) addon provides a lot of great functionality.
This addon provides some useful items outside the scope for the more general purpose addon.

### Close Button
At long last, our national nightmare of copying and pasting a close button is over.

```hbs
  {{close-button (action "myCloseActionName")}}
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
  {{#bs/list-group as |g|}}
    {{g.item text="inline text"}}
    {{#g.item tagName="div" active=isActive disabled=isDisabled type="danger"}}
      Blocks work too, with custom properties!
    {{/#g.item}}
    {{#g.action onClick=(action "myAction")}}
      Clickable as a button
    {{/g.action}}
    {{#g.link "route.detail" "id"}}Just like a regular link{{/g.link}}
  {{/bs/list-group}}
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
