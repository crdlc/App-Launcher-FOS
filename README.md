App Launcher FOS
======

This library implements a splash mechanism for FOS apps. This example is for Wikipedia, the biggest multilingual free-content encyclopedia on the Internet.

Configuration
======

launcher/launcher.json:

```js
{
  "launch_path": "http://m.wikipedia.org",

  "resources" : {
    "splash_path": "launcher/splash.png",
    "spinner_path": "launcher/spinner.gif",
    "styles_path": "launcher/launcher.css"
  }
}

index.html: (touch this file if you want to change the path to launcher.json file)

```html
<script type="text/javascript">
  var launcherConfigurationFilePath = 'launcher/launcher.json';
</script>
```