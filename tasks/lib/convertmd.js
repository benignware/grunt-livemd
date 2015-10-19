var
  path = require("path"),
  fs = require("fs"),
  deepmerge = require("deepmerge"),
  marked = require("marked"),
  _ = require("lodash"),
  pygmentize = require('pygmentize-bundled'),
  entities = new require('html-entities').XmlEntities,
  Q = require("q");
  
module.exports = function convertmd(string, options, callback) {
  
  var defer = Q.defer();
  
  options = deepmerge({
    // Defaults
    title: "",
    layout: 'github'
  }, options);
  
  // Setup options
  var template = typeof options.layout === 'object' ? options.layout.template : options.layout;
  template = template || 'github';
  var templateData = deepmerge(options, typeof options.layout === 'object' ? options.layout.data : {});
  var predefinedTemplatePath = path.join(__dirname, 'layouts', template, "layout.html");
  // TODO: fs.exists is deprecated
  var templatePath = fs.existsSync(predefinedTemplatePath) ? predefinedTemplatePath : template;
  var layout = fs.existsSync(templatePath) ? fs.readFileSync(templatePath).toString() : template;
  
  var compiled = _.template(layout);

  var renderer = new marked.Renderer();
  renderer.code = function (code, lang) {
    return code;
  };
  
  // Fix entities contained in inline scripts or styles
  renderer.html = function(html) {
    var
      trimmed = html.trim(),
      uppercase = html.toUpperCase();
    if (uppercase.indexOf('<STYLE') === 0 || uppercase.indexOf('<SCRIPT')) {
      return entities.decode(html);
    }
    return html;
  };
  
  // Fix marked is also parsing links in html comments
  var renderLink = renderer.link;
  renderer.link = function (href, title, text) {
    var text = entities.decode(text);
    if (text.indexOf('!--') === 0) {
      return "<" + text + ">";
    }
    return renderLink.call(this, href, title, text);
  };
  
  var markedOptions = {
    highlight: function (code, lang, callback) {
      lang = lang === 'less' || lang === 'sass' ? 'css' : lang;
      lang = lang === 'shell' ? 'cli' : lang;
      try {
        pygmentize({ lang: lang, format: 'html' }, code, function (err, result) {
          callback(null, result);
        });
      } catch (e) {
        console.warn("E: ", e);
      }
      
    },
    renderer: renderer
  };
  
  marked.setOptions(markedOptions);
  
  // Pre render tasks
  marked(string, function (err, content) {
    if (err) throw err;
    var result = compiled(deepmerge(templateData, {
      content: content
    }));
    // Post render tasks
    // TODO: Fix ids added to headings?
    
    // Resolve
    if (typeof callback === 'function') {
      callback(result);
    }
    defer.resolve(result);
    
  });
  
  return defer.promise;
};