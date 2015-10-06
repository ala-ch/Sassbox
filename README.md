# Sassbox

Sassbox is a collection of our favourite Sass snippets. 



## Installation

`bower install --save ala-ch/Sassbox` or download and import `/sassbox.scss` in your Sass files. 



## Contributors

This collection includes many gems we found somewhere on the internets. ❤︎ s. credits in code/comments



## Documentation

s. `/docs` 



## Development


### Build targets / Grunt

`$ grunt` to build dist (`/sassbox.scss`), docs (`/docs`) and examples (`/demo`)

`$ grunt dist` to build dist

`$ grunt docs` to build docs

`$ grunt demo` to build examples


### Versioning

[grunt-bump](https://github.com/vojtajina/grunt-bump) usage: 

`$ grunt bump` or `$ grunt bump:patch` v1.0.1 → v1.0.2

`$ grunt bump:minor` v1.0.2 → v1.1.0

`$ grunt bump:major` v1.1.0 → v2.0.0

`$ grunt bump --setversion=2.0.3` set version 

`$ grunt bump --dry-run` just try. No changes, stages, commits or pushes. 

Bump version, update dist and docs, commit: 

```
$ grunt bump-only:minor
$ grunt 
$ git commit
$ grunt bump-commit
```


