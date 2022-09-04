function _(name, ...children) {
  const result = document.createElement(name)

  for (const child of children)
    result.appendChild(child)

  result._att = function(name, value) {
    this.setAttribute(name, value)
    return this
  }

  result._onclick = function(callback) {
    this.onclick = callback
    return this
  }

  return result
}

function _text(s) {
  return document.createTextNode(s)
}

function _h1(...children) {
  return _('h1', ...children)
}

function _h2(...children) {
  return _('h2', ...children)
}

function _h3(...children) {
  return _('h3', ...children)
}

function _p(...children) {
  return _('p', ...children)
}

function _a(...children) {
  return _('a', ...children)
}

function _div(...children) {
  return _('div', ...children)
}

function _img(src) {
  return _('img')._att("src", src)
}

function _nav(...children) {
  return _('nav', ...children);
}

function _ul(...children) {
  return _('ul', ...children);
}

function _li(...children) {
  return _('li', ...children);
}

function _tab_switcher(names, choose) {
  return _nav(
    _ul(
      ...names.map((name, index) => {
        return _li(
          _a(_text(name))
            ._att('href', '#')
            ._onclick(() => choose(index))
        )._att('class', 'tab')
      })
    )
  )
}

function _tabs(ts) {
  const names = Object.keys(ts)
  const tags = names.map(name => ts[name])

  console.assert(tags.length > 0)

  let currentTab = 0;
  const _tab_slot = _div(tags[currentTab])

  return _div(
    _tab_switcher(Object.keys(ts), index => {
      _tab_slot.removeChild(tags[currentTab])
      _tab_slot.appendChild(tags[index])
      currentTab = index
    })._att('class', 'tab-switcher'),
    _tab_slot
  )
}

window.onload = () => {
  entry.appendChild(
    _div(
      _h1(_text("Underscore.js")),
      _h2(_text("A functional javascript front-end framework")),
      _tabs({
        hello: _h3(_text("Hello!")),
        bye: _h3(_text("Bye!")),
      }),
    )._att('class', 'container'))
}