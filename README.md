# A Fancy SilverStripe dev/build Tool
Simple SilverStripe module to trigger a dev/build via ajax in the CMS.
This will allow you to close that extra tab that we all keep open just for dev/build.

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/mediabeastnz/silverstripe-fancy-devbuild/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/mediabeastnz/silverstripe-fancy-devbuild/?branch=master)

## Installation
Composer is the recommended way of installing SilverStripe modules.
```
composer require mediabeast/fancy-devbuild 1.*
```
Run dev/build the "Normal way".

### Customisation
#### Links
You can define additional links in your config.yml
```
DevTasks:
  tasks:
    newdevtaskid:
      title: Dev/NewTask
      link: dev/task
      reset_time: 5000 # Optional
      error_handler: newtab # Optional
      success_handler: ignore # Optional
```

#### Theming
Incase your using a custom admin theme you can quickly customise the colors of the icon and text.
For example I have added this to the *Flat Admin* CSS. Other classes are .error and .success
```css
.devbuild-trigger.loading {
  color: rgb(249, 191, 59);
  .icon {
    color: rgb(249, 191, 59);
  }
}
```

### Screenshots
These screenshots are of the very first version of this module and are likely to change.
They give you a quick idea of what the module does.

#### Default button status
<img width="300px" src="http://i.imgur.com/zYmHiQ4.png" alt="Default button status">
#### After a click the site will build the database and flush in the background
<img width="300px" src="http://i.imgur.com/Aik95L7.png" alt="After a click the site will build the database and flush in the background">

### Contributing
If you have any ideas please submit an issue and label it as Enhancement.
Pull requests are welcome!

### Todo List
All ideas, issues and questions will be found under Issues.
