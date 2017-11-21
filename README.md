# ember-junkdrawer
https://www.npr.org/sections/theprotojournalist/2014/08/15/337759135/what-your-junk-drawer-reveals-about-you

## Install
```bash
ember install ember-junkdrawer
```

# Quick & Dirty Component Examples
### Tables
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

### Forms

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

component.hbs
```handlebars
{{component/my-component organization=model}}
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

## Close Button
At long last, our national nightmare of copying and pasting a close button is over.

```hbs
  {{close-button (action "myCloseActionName")}}
```
