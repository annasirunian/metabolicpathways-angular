# Visualization of metabolic pathways - Angular version

This app is intended to visualize the metabolic pathways maps with the help of [Escher library](https://escher.readthedocs.io/en/stable/).

The app allows to load pathway maps from the file system, visualizes it and displays basic statistics.

## Demo

To see the app in action, visit [the following link](https://metabolicpathwaysangular.z6.web.core.windows.net/).

It is deployed on Azure as a static website.

## Running locally

To get started, clone this repository:

```
git clone https://github.com/annasirunian/metabolicpathways-angular
```

Then start a web server in the project directory:

```
ng serve
```

Finally navigate to [localhost:4200](http://localhost:4200).

## Deployment

First build the project:

```
ng build --prod
```

Then upload the contents of `dist` folder to your hosting provider.
