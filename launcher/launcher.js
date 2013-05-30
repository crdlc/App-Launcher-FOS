
'use strict';

(function() {
  function parse(file) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    xhr.open('GET', file, true);
    xhr.send(null);

    xhr.onload = function _xhrOnLoad(evt) {
      try {
        build(JSON.parse(xhr.responseText));
      } catch (e) {
        console.error('Failed parsing launcher configuration file: ' + e);
      }
    };

    xhr.onerror = function _xhrOnError(evt) {
      console.error('File not found: ' + file);
    };
  }

  function build(conf) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = conf.resources.styles_path;

    link.addEventListener('load', function() {
      var splash = document.createElement('img');
      splash.id = 'launcher-splash';
      splash.src = conf.resources.splash_path;
      document.body.appendChild(splash);

      var loader = document.createElement('img');
      loader.id = 'launcher-loader';
      loader.src = conf.resources.spinner_path;
      document.body.appendChild(loader);

      var appFrame = document.createElement('iframe');
      appFrame.id = 'launcher-app';
      appFrame.src = conf.launch_path;
      document.body.appendChild(appFrame);

      appFrame.onload = function() {
        appFrame.style.opacity = 1;
        splash.style.opacity = 0;
        loader.parentNode.removeChild(loader);
        splash.addEventListener('transitionend', function() {
          // When the transition is done, remove the splash image completely
          splash.parentNode.removeChild(splash);
        });
      };
    });

    document.head.appendChild(link);
  }

  // Parsing configuration object
  parse(launcherConfigurationFilePath || 'launcher/launcher.json');

}());
