# ember-junkdrawer

https://www.npr.org/sections/theprotojournalist/2014/08/15/337759135/what-your-junk-drawer-reveals-about-you

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
