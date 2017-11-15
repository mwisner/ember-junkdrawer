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

component.hbs:
```handlebars
{{component/my-component organization=model}}
```

### UI Box
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
| Component  | helper:ui-page-property  |
| Component  | mixin:model-data-table-common  |
| Component  | service:current-user  |
| Component  | service:ui-global  |
